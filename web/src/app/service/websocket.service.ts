import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SocketData } from "./bean/response/response";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private connected = false;

  constructor() {
    this.connect();
  }

  /**
   * 连接WebSocket服务器
   */
  connect(): void {
    if (this.connected) {
      return;
    }

    // 构建WebSocket URL
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    let host = environment.apiHost;

    if (environment.production) {
      host = window.location.host;
    }

    let port = "";
    if (environment.production) {
      port = "";
    } else {
      port = environment.apiPort ? `:${environment.apiPort}` : "";
    }

    const wsUrl = `${protocol}//${host}${port}/ws`;

    // 创建WebSocket连接
    this.socket = new WebSocket(wsUrl);

    // 监听连接打开事件
    this.socket.onopen = () => {
      console.log("WebSocket连接已打开");
      this.connected = true;
    };

    // 监听消息事件
    this.socket.onmessage = (event) => {
      try {
        this.connected = true;
        let response: SocketData<any> = JSON.parse(event.data);
        console.log("收到WebSocket消息:", response);
      } catch (error) {
        console.error("解析WebSocket消息失败:", error);
      }
    };

    // 监听错误事件
    this.socket.onerror = (error) => {
      this.connected = false;
      console.error("WebSocket错误:", error);
    };

    // 监听关闭事件
    this.socket.onclose = () => {
      console.log("WebSocket连接已关闭，尝试重新连接...");
      this.connected = false;
      // 5秒后尝试重新连接
      setTimeout(() => this.connect(), 5000);
    };
  }
  
  /**
   * 关闭WebSocket连接
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  /**
   * 发送消息到WebSocket服务器
   * @param message 要发送的消息
   */
  sendMessage(message: SocketData<any>): void {
    if (this.socket && this.connected) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket未连接，无法发送消息");
    }
  }
}

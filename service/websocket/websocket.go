package websocket

import (
	"net/http"
	"sync"

	ws "github.com/gorilla/websocket"
	"github.com/ijkzen/gin-template/service/log"
)

// websocket 传输的结构体
type SocketData[T any] struct {
	EventCode string `json:"eventCode"`
	From      string `json:"from"`
	To        string `json:"to"`
	Data      T      `json:"data"`
}

type OnWebSocketListener interface {
	// 新链接注册时调用
	OnRegister(client *ws.Conn)
	// 连接注销时调用
	OnUnregister(client *ws.Conn)
	// 接收到消息时调用
	OnMessage(client *ws.Conn, message []byte)
}

var (
	Upgrader = ws.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true // 允许所有跨域请求
		},
	}

	Manager = NewWebSocketManager()
)

type WebSocketManager struct {
	// 所有活跃的连接
	clients map[*ws.Conn]bool
	// 广播消息的通道
	broadcast chan []byte
	// 注册连接的通道
	register chan *ws.Conn
	// 注销连接的通道
	unregister chan *ws.Conn
	// 注册监听器的通道
	registryListener chan OnWebSocketListener
	// 注销监听器的通道
	unregistryListener chan OnWebSocketListener
	// 互斥锁，保护clients map
	mutex sync.Mutex
	// 监听器列表
	listeners []OnWebSocketListener
}

func NewWebSocketManager() *WebSocketManager {
	manager := &WebSocketManager{
		clients:    make(map[*ws.Conn]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *ws.Conn),
		unregister: make(chan *ws.Conn),
		registryListener:  make(chan OnWebSocketListener),
		unregistryListener: make(chan OnWebSocketListener),
		listeners:  make([]OnWebSocketListener, 0),
	}

	// 启动管理器
	go manager.run()
	return manager
}

// RegisterClient 注册一个新的WebSocket连接
func (m *WebSocketManager) RegisterClient(client *ws.Conn) {
	m.register <- client
}

// UnregisterClient 注销一个WebSocket连接
func (m *WebSocketManager) UnregisterClient(client *ws.Conn) {
	m.unregister <- client
}

func (m *WebSocketManager) run() {
	for {
		select {
		case client := <-m.register:
			// 注册新连接
			m.mutex.Lock()
			m.clients[client] = true
			log.SugarLogger.Info("WebSocket client registered", " client ", client.RemoteAddr().String())
			for _, listener := range m.listeners {
				listener.OnRegister(client)
			}

			m.mutex.Unlock()
		case client := <-m.unregister:
			// 注销连接
			m.mutex.Lock()
			if _, ok := m.clients[client]; ok {
				delete(m.clients, client)
				client.Close()
			}
			log.SugarLogger.Info("WebSocket client unregistered", " client ", client.RemoteAddr().String())
			for _, listener := range m.listeners {
				listener.OnUnregister(client)
			}
			m.mutex.Unlock()
		case message := <-m.broadcast:
			// 广播消息给所有客户端
			m.mutex.Lock()
			for client := range m.clients {
				err := client.WriteMessage(ws.TextMessage, message)
				if err != nil {
					log.Logger.Error("fail to send message: " + err.Error())
					client.Close()
					delete(m.clients, client)
				}
			}
			m.mutex.Unlock()
		case listener := <-m.registryListener:
			// 注册监听器
			m.mutex.Lock()
			log.SugarLogger.Info("WebSocket listener registered", " listener")
			m.listeners = append(m.listeners, listener)
			m.mutex.Unlock()
		case listener := <-m.unregistryListener:
			// 注销监听器
			m.mutex.Lock()
			for i, l := range m.listeners {
				if l == listener {
					m.listeners = append(m.listeners[:i], m.listeners[i+1:]...)
					break
				}
			}
			log.SugarLogger.Info("WebSocket listener unregistered", " listener")
			m.mutex.Unlock()
		}
	}
}

// RegisterListener 注册WebSocket事件监听器
func (m *WebSocketManager) RegisterListener(listener OnWebSocketListener) {
	m.registryListener <- listener
}

// UnregisterListener 注销WebSocket事件监听器
func (m *WebSocketManager) UnregisterListener(listener OnWebSocketListener) {
	m.unregistryListener <- listener
}

// BroadcastMessage 广播消息给所有连接的客户端
func (m *WebSocketManager) BroadcastMessage(message []byte) {
	m.broadcast <- message
}

// Listeners 获取当前所有注册的监听器
func (m *WebSocketManager) Listeners() []OnWebSocketListener {
	m.mutex.Lock()
	defer m.mutex.Unlock()
	return m.listeners
}
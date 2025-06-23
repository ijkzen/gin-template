package router

import (
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	ws "github.com/ijkzen/gin-template/api/websocket"
	"github.com/ijkzen/gin-template/service/log"
	wss "github.com/ijkzen/gin-template/service/websocket"
)

var once sync.Once

func init() {
	once.Do(func() {
		wss.Manager.RegisterListener(&wsListener{})
	})
}

type wsListener struct{}

func (l *wsListener) OnRegister(client *websocket.Conn) {
	log.SugarLogger.Info("WebSocket client connected", "client", client.RemoteAddr().String())
	client.WriteMessage(websocket.TextMessage, []byte("Hello World!"))
}

func (l *wsListener) OnUnregister(client *websocket.Conn) {
	log.SugarLogger.Info("WebSocket client disconnected", "client", client.RemoteAddr().String())
}

func (l *wsListener) OnMessage(client *websocket.Conn, message []byte) {
	// 这里处理接收到的消息，可以处理后回复或者广播消息
	// 对消息反序列化后，根据消息类型进行处理
	log.SugarLogger.Info("WebSocket message received", "client", client.RemoteAddr().String(), "message", string(message))
}

func WebSocketRouter(engine *gin.Engine) {
	engine.GET("/ws", ws.UpgradeWebsocket)
}
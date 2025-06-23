package websocket

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/bean"
	"github.com/ijkzen/gin-template/service/log"
	ws "github.com/ijkzen/gin-template/service/websocket"
)

func UpgradeWebsocket(c *gin.Context) {
	conn, err := ws.Upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Logger.Error("fail to upgrade connection: " + err.Error())
		c.JSON(http.StatusOK, bean.Response[string]{
			ErrorCode:    101,
			ErrorMessage: err.Error(),
		})
		return
	}

	ws.Manager.RegisterClient(conn)

	go func() {
		defer conn.Close()
		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Logger.Error("fail to read message: " + err.Error())
				ws.Manager.UnregisterClient(conn)
				break
			}
			
			for _, listener := range ws.Manager.Listeners() {
				listener.OnMessage(conn, message)
			}
		}
	}()
}
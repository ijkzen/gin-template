package main

import (
	"github.com/gin-contrib/pprof"

	"github.com/gin-gonic/gin"

	_ "github.com/ijkzen/gin-template/cron"
	"github.com/ijkzen/gin-template/router"
	_ "github.com/ijkzen/gin-template/service/database"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	engine := gin.New()
	router.Middleware(engine)
	apiGroup := engine.Group("api")
	router.CronGroup(apiGroup)

	router.DebugGroup(engine)
	router.Front(engine)
	router.WebSocketRouter(engine)
	pprof.Register(engine)
	engine.Run(":4007")
}

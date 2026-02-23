package main

import (
	"github.com/gin-contrib/pprof"

	"github.com/gin-gonic/gin"

	_ "github.com/ijkzen/gin-template/cron"
	"github.com/ijkzen/gin-template/middleware"
	"github.com/ijkzen/gin-template/router"
	_ "github.com/ijkzen/gin-template/service/database"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	engine := gin.New()
	middleware.Middleware(engine)
	apiGroup := engine.Group("api")
	router.AuthRouter(apiGroup)
	router.CronGroup(apiGroup)
	router.Front(engine)
	router.DebugGroup(engine)
	router.WebSocketRouter(engine)
	pprof.Register(engine)
	engine.Run(":4007")
}

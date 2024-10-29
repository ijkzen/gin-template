package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/pprof"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/api"
	_ "github.com/ijkzen/gin-template/service/database"
	"github.com/ijkzen/gin-template/service/log"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(ginzap.Ginzap(log.Logger, time.RFC3339, true))
	r.Use(ginzap.RecoveryWithZap(log.Logger, true))
	r.Use(cors.Default())
	// apiGroup := r.Group("api")
	// {
		
	// }
	r.GET("/debug/statsviz/*filepath", api.StatsvizGraph)
	r.NoRoute(api.Front)
	pprof.Register(r)
	r.Run(":4007")
}

package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/pprof"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/api/cron"
	"github.com/ijkzen/gin-template/api/front"
	"github.com/ijkzen/gin-template/api/statsviz"
	_ "github.com/ijkzen/gin-template/cron"
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
	apiGroup := r.Group("api")

	cronGroup := apiGroup.Group("cron")
	{
		cronGroup.GET("exec/:jobName", cron.Exec)
	}

	r.GET("/debug/statsviz/*filepath", statsviz.StatsvizGraph)
	r.NoRoute(front.Front)
	pprof.Register(r)
	r.Run(":4007")
}

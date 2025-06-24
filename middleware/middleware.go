package middleware

import (
	"time"

	"github.com/gin-contrib/cors"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/service/log"
)

func Middleware(engine *gin.Engine) {
	engine.Use(gin.Recovery())
	engine.Use(ginzap.Ginzap(log.Logger, time.RFC3339, true))
	engine.Use(ginzap.RecoveryWithZap(log.Logger, true))
	engine.Use(cors.Default())
}

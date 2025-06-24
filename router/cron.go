package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/api/cron"
	"github.com/ijkzen/gin-template/middleware"
)

func CronGroup(apiGroup *gin.RouterGroup) {
	cronGroup := apiGroup.Group("cron")
	cronGroup.Use(middleware.AuthMiddleware.MiddlewareFunc())
	{
		cronGroup.GET("exec/:jobName", cron.Exec)
	}
}
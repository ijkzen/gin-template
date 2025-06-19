package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/api/cron"
)

func CronGroup(apiGroup *gin.RouterGroup) {
	cronGroup := apiGroup.Group("cron")
	{
		cronGroup.GET("exec/:jobName", cron.Exec)
	}
}
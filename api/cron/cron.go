package cron

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ijkzen/k8s-example/bean"
	gcron "github.com/ijkzen/k8s-example/cron"
)

func Exec(c *gin.Context) {
	jobName := c.Param("jobName")

	jobList := gcron.Pool.GetJobList()

	for _, job := range jobList {
		if job.Name == jobName {
			go job.Function()
		}
	}

	c.JSON(http.StatusOK, bean.Response[string]{
		Data: "ok",
	})
}

package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/bean"
)

func Hello(c *gin.Context) {
	c.JSON(http.StatusOK, bean.Response[string] {
		Data: "Hello world",
	})
}
package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/api/front"
)

func Front(engine *gin.Engine) {
	engine.NoRoute(front.Front)
}
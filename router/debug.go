package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/api/statsviz"
)

func DebugGroup(engine *gin.Engine) {
	engine.GET("/debug/statsviz/*filepath", statsviz.StatsvizGraph)
}
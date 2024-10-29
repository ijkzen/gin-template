package api

import (
	"net/http"

	"github.com/arl/statsviz"
	"github.com/gin-gonic/gin"
)

var srv *statsviz.Server
var ws http.HandlerFunc
var index http.HandlerFunc

func init() {
	srv, _ = statsviz.NewServer()
	ws = srv.Ws()
	index = srv.Index()
}

func StatsvizGraph(c *gin.Context) {
	if c.Param("filepath") == "/ws" {
		ws(c.Writer, c.Request)
		return
	}
	index(c.Writer, c.Request)
}

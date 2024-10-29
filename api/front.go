package api

import (
	"mime"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/bean"
	"github.com/ijkzen/gin-template/service/log"
	"github.com/ijkzen/gin-template/static"
)

func Front(c *gin.Context) {
	url := c.Request.URL.Path
	log.Logger.Info(url)
	prefix := "front"
	filename := prefix + url
	file, err := static.FrontFs.ReadFile(prefix + url)
	if err != nil {
		indexFile, err := static.FrontFs.ReadFile(prefix + "/index.html")
		if err != nil {
			c.JSON(http.StatusOK, bean.Response[string]{
				ErrorCode:    101,
				ErrorMessage: "cannot find index.html",
				Data:         "",
			})
		} else {
			c.Data(http.StatusOK, "text/html; charset=utf-8", indexFile)
		}
	} else {
		c.Data(http.StatusOK, mime.TypeByExtension(filepath.Ext(filename)), file)
	}
}

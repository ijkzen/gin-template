package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/api/user"
	"github.com/ijkzen/gin-template/middleware"
)

func AuthRouter(apiGroup *gin.RouterGroup) {
	apiGroup.POST("/login", middleware.AuthMiddleware.LoginHandler)

	auth := apiGroup.Group("/auth")
	auth.Use(middleware.AuthMiddleware.MiddlewareFunc())
	{
		auth.GET("/refresh_token", middleware.AuthMiddleware.RefreshHandler)
		auth.POST("/user/password", user.ChangePassword)
	}
}
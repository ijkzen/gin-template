package user

import (
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/bean"
	"github.com/ijkzen/gin-template/middleware"
	"github.com/ijkzen/gin-template/service/database/dao"
	"golang.org/x/crypto/bcrypt"
)

type ChangePasswordRequest struct {
	OldPassword string `json:"oldPassword" binding:"required"`
	NewPassword string `json:"newPassword" binding:"required"`
}

// ChangePassword 修改密码
func ChangePassword(c *gin.Context) {
	var req ChangePasswordRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, bean.Response[string]{
			ErrorCode:    400,
			ErrorMessage: "Invalid request parameters",
		})
		return
	}

	// 获取当前登录用户
	claims := middleware.GetCurrentUser(c)
	if claims == nil {
		c.JSON(401, bean.Response[string]{
			ErrorCode:    401,
			ErrorMessage: "Unauthorized",
		})
		return
	}

	userDao := &dao.UserDao{}
	user, err := userDao.GetUserByUsername(claims.UserName)
	if err != nil {
		c.JSON(500, bean.Response[string]{
			ErrorCode:    500,
			ErrorMessage: "Failed to get user information",
		})
		return
	}

	// 验证旧密码
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.OldPassword))
	if err != nil {
		c.JSON(400, bean.Response[string]{
			ErrorCode:    400,
			ErrorMessage: "Old password is incorrect",
		})
		return
	}

	// 生成新密码的哈希值
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, bean.Response[string]{
			ErrorCode:    500,
			ErrorMessage: "Failed to process new password",
		})
		return
	}

	// 更新密码
	user.Password = string(hashedPassword)
	err = userDao.UpdateUser(user)
	if err != nil {
		c.JSON(500, bean.Response[string]{
			ErrorCode:    500,
			ErrorMessage: "Failed to update password",
		})
		return
	}

	c.JSON(200, bean.Response[string]{
		ErrorCode: 0,
		Data:      "Password updated successfully",
	})
}
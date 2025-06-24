package middleware

import (
	"math/rand"
	"os"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
	"github.com/ijkzen/gin-template/bean"
	"github.com/ijkzen/gin-template/service/database/dao"
	"github.com/ijkzen/gin-template/service/database/model"
	"github.com/ijkzen/gin-template/service/log"
	"github.com/ijkzen/gin-template/service/version"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var identityKey = "id"

type login struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

// User demo
type User struct {
	UserName  string
	FirstName string
	LastName  string
}

var AuthMiddleware *jwt.GinJWTMiddleware

// 添加登录响应处理
func loginResponse(c *gin.Context, code int, token string, expire time.Time) {
	c.JSON(code, bean.Response[map[string]interface{}]{
		ErrorCode: 0,
		Data: map[string]interface{}{
			"token":  token,
			"expire": expire.Format(time.RFC3339),
		},
	})
}

// 添加登出响应处理
func logoutResponse(c *gin.Context, code int) {
	c.JSON(code, bean.Response[string]{
		ErrorCode: 0,
		Data:      "Successfully logged out",
	})
}

// 添加刷新token响应处理
func refreshResponse(c *gin.Context, code int, token string, expire time.Time) {
	c.JSON(code, bean.Response[map[string]interface{}]{
		ErrorCode: 0,
		Data: map[string]interface{}{
			"token":  token,
			"expire": expire.Format(time.RFC3339),
		},
	})
}

// 生成随机密码
func generateRandomPassword(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
	seededRand := rand.New(rand.NewSource(time.Now().UnixNano()))
	password := make([]byte, length)
	for i := range password {
		password[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(password)
}

func init() {
	// 检查并创建初始用户
	userDao := &dao.UserDao{}
	_, err := userDao.GetUserByUsername("admin")
	if err == gorm.ErrRecordNotFound {
		// 生成随机密码
		plainPassword := generateRandomPassword(12)

		// 生成密码哈希
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(plainPassword), bcrypt.DefaultCost)
		if err != nil {
			log.Logger.Fatal("Failed to hash password: " + err.Error())
		}

		// 创建管理员用户
		adminUser := &model.User{
			Username: "admin",
			Password: string(hashedPassword),
		}

		err = userDao.CreateUser(adminUser)
		if err != nil {
			log.Logger.Fatal("Failed to create admin user: " + err.Error())
		}

		// 打印用户信息
		log.Logger.Info("Created initial admin user:\n")
		log.Logger.Info("Username: admin\n")
		log.SugarLogger.Infof("Password: %s\n", plainPassword)
		log.Logger.Info("=====================================\n\n")
	} else if err != nil {
		log.Logger.Fatal("Failed to check admin user: " + err.Error())
	}

	// JWT 中间件配置
	realme := "cook-backend"
	secretKey := "9mNhx37i4W$!BV"
	if version.IsRelease() && os.Getenv("SECRET_KEY") != "" {
		secretKey = os.Getenv("SECRET_KEY")
	}

	AuthMiddleware, err = jwt.New(&jwt.GinJWTMiddleware{
		Realm: realme,
		Key:   []byte(secretKey),

		Timeout:     time.Hour * 24 * 30,
		MaxRefresh:  time.Hour * 24 * 30,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*User); ok {
				return jwt.MapClaims{
					identityKey: v.UserName,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &User{
				UserName: claims[identityKey].(string),
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVals login
			if err := c.BindJSON(&loginVals); err != nil {
				return "", jwt.ErrMissingLoginValues
			}

			// 从数据库获取用户
			user, err := userDao.GetUserByUsername(loginVals.Username)
			if err != nil {
				return nil, jwt.ErrFailedAuthentication
			}

			// 验证密码
			err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginVals.Password))
			if err != nil {
				return nil, jwt.ErrFailedAuthentication
			}

			return &User{
				UserName: user.Username,
			}, nil
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			// 所有验证通过的用户都允许访问
			if _, ok := data.(*User); ok {
				return true
			}
			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, bean.Response[string]{
				ErrorCode:    401,
				ErrorMessage: message,
			})
		},
		LoginResponse:   loginResponse,
		LogoutResponse:  logoutResponse,
		RefreshResponse: refreshResponse,
		TokenLookup:     "header: Authorization, query: token, cookie: jwt",
		TokenHeadName:   "Bearer",
		TimeFunc:        time.Now,
	})

	if err != nil {
		log.Logger.Fatal(err.Error())
	}
}

func GetCurrentUser(c *gin.Context) *User {
	claims := jwt.ExtractClaims(c)
	if claims == nil {
		return nil
	}

	if username, exists := claims[identityKey]; exists {
		return &User{
			UserName: username.(string),
		}
	}
	return nil
}
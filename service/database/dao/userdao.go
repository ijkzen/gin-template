package dao

import (
	"github.com/ijkzen/gin-template/service/database"
	"github.com/ijkzen/gin-template/service/database/model"
)


var UserDaoInstance = &UserDao{}

type UserDao struct {
}

func (u *UserDao) GetUserByUsername(username string) (*model.User, error) {
	user := model.User{}
	err := database.Database.Where("username = ?", username).First(&user).Error
	return &user, err
}

func (u *UserDao) CreateUser(user *model.User) error {
	database.DbMutex.Lock()
	defer database.DbMutex.Unlock()
	return database.Database.Create(user).Error
}

func (u *UserDao) UpdateUser(user *model.User) error {
	database.DbMutex.Lock()
	defer database.DbMutex.Unlock()
	return database.Database.Save(user).Error
}

func (u *UserDao) PickUser() (user *model.User, err error) {
	database.DbMutex.Lock()
	defer database.DbMutex.Unlock()
	err = database.Database.Order("RANDOM()").First(&user).Error
	return
}
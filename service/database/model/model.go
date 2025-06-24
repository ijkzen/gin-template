package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"index" json:"username"`
	Password string `json:"password"`
}
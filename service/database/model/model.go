package model

import "gorm.io/gorm"

type TemplateModel struct {
	gorm.Model
	Name string `gorm:"index"`
}
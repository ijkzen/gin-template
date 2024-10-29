package database

import (
	"os"
	"path/filepath"
	"sync"

	"github.com/ijkzen/gin-template/service/log"

	"github.com/glebarez/sqlite"
	"github.com/ijkzen/gin-template/service/database/model"
	"github.com/ijkzen/gin-template/service/version"
	"gorm.io/gorm"
)

const dbFile = "template.db"

var Database *gorm.DB

var DbMutex sync.Mutex

func init() {
	path := ""
	if version.IsRelease() {
		path = filepath.Join("/config", dbFile)
	} else {
		path = dbFile
	}
	var err error
	Database, err = gorm.Open(sqlite.Open(path), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
		Logger:                 &CustomDatabaseLogger{},
	})
	if err != nil {
		log.Logger.Error(err.Error())
		os.Exit(1)
	}
	db, err := Database.DB()
	if err == nil {
		db.SetMaxIdleConns(10)
		db.Exec(`PRAGMA synchronous = OFF`)
	}
	Database.AutoMigrate(&model.TemplateModel{})
}

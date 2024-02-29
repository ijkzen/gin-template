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
	Database, err = gorm.Open(sqlite.Open(path+"?cache=shared&_busy_timeout=9999999&_synchronous=off"), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})
	if err != nil {
		log.Logger.Error(err.Error())
		os.Exit(1)
	}
	db, err := Database.DB()
	if err == nil {
		db.SetMaxIdleConns(10)

	}
	Database.AutoMigrate(&model.TemplateModel{})
}

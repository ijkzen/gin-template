package database

import (
	"context"
	"time"

	"github.com/ijkzen/gin-template/service/log"
	"gorm.io/gorm/logger"
)

type CustomDatabaseLogger struct {
	LoggerLevel logger.LogLevel
}

func New() *CustomDatabaseLogger {
	return new(CustomDatabaseLogger)
}

func (l *CustomDatabaseLogger) LogMode(level logger.LogLevel) logger.Interface {
	l.LoggerLevel = level
	return l
}

func (l *CustomDatabaseLogger) Info(ctx context.Context, msg string, data ...interface{}) {
	if l.LoggerLevel < logger.Info {
		return
	}
	log.SugarLogger.Infof(msg, data)
}
func (l *CustomDatabaseLogger) Warn(ctx context.Context, msg string, data ...interface{}) {
	if l.LoggerLevel < logger.Warn {
		return
	}
	log.SugarLogger.Warnf(msg, data)
}

func (l *CustomDatabaseLogger) Error(ctx context.Context, msg string, data ...interface{}) {
	if l.LoggerLevel < logger.Error {
		return
	}
	log.SugarLogger.Errorf(msg, data)
}

func (l *CustomDatabaseLogger) Trace(ctx context.Context, begin time.Time, fc func() (sql string, rowsAffected int64), err error) {
	elapsed := time.Since(begin)
	if elapsed < 100 * time.Millisecond {
		return
	}
	sql, rows := fc()
	log.SugarLogger.Warnf("Trace sql: %v  row： %v  err: %v duration: %v", sql, rows, err, elapsed)
}

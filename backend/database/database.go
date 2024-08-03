package database

import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
	"fmt"

	"github.com/cyril-ui-developer/july7-task-manager/backend/models"
	"github.com/cyril-ui-developer/july7-task-manager/backend/config"
)


var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(mysql.Open(fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",  config.Config("DB_USERNAME"), config.Config("DB_PASSWORD"),config.Config("DB_HOST"), config.Config("DB_PORT"),  config.Config("DB_NAME"))), &gorm.Config{})
	if err != nil {
		panic("could not connect to database")
	}
}

func Automigrate() {

	DB.AutoMigrate(models.Task{})
}
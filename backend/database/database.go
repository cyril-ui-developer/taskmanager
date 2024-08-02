package database

import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"

	"github.com/cyril-ui-developer/july7-task-manager/backend/models"
)


var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/july7"), &gorm.Config{})
	if err != nil {
		panic("could not connect to database")
	}
}

func Automigrate() {

	DB.AutoMigrate(models.Task{})
}
package database

import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
	"fmt"
	"net/url"

	"github.com/cyril-ui-developer/july7-task-manager/backend/models"
	"github.com/cyril-ui-developer/july7-task-manager/backend/config"
)


var DB *gorm.DB

// Use gorm to connect to the mysql database and migrate the schema.The connections in the pool are automatically closed. 
func Connect() error{
	var err error
	dns := fmt.Sprintf("%s@tcp(%s:%s)/%s", url.UserPassword(config.Config("DB_USERNAME"), config.Config("DB_PASSWORD")), config.Config("DB_HOST"), config.Config("DB_PORT"), config.Config("DB_NAME"))
	DB, err = gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		panic("could not connect to database")
	}
	err =  DB.AutoMigrate(models.Task{})
	if err != nil {
		panic("could not connect to database")
	}
	return nil
}

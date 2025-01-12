package database

import (
	"fmt"
	"net/url"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/cyril-ui-developer/taskmanager/backend/config"
	"github.com/cyril-ui-developer/taskmanager/backend/models"
)

// DB is a global variable to hold the database connection
var DB *gorm.DB

// Use gorm ORM to connect to the mysql database and migrate the schema.The connections in the pool are automatically closed.
func Connect() error {
	var err error

    // Construct the DSN (Data Source Name) string for the database connection
    // ?parseTime=true is added to parse time.Time correctly from the database.
	dns := fmt.Sprintf("%s@tcp(%s:%s)/%s?parseTime=true", url.UserPassword(config.Config("DB_USERNAME"), config.Config("DB_PASSWORD")), config.Config("DB_HOST"), config.Config("DB_PORT"), config.Config("DB_NAME"))

	// Open a connection to the database using GORM and the MySQL driver
	DB, err = gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		panic("could not connect to database")
	}

	// Automatically migrate the schema for the Task model
	err = DB.AutoMigrate(models.Task{})
	if err != nil {
		panic("could not connect to database")
	}

	 // Return nil if everything succeeds
	return nil
}

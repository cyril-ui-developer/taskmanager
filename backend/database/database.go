// package database

// import (
// 	"github.com/cyril-ui-developer/july7-task-manager/backend/models"

// 	"gorm.io/driver/mysql"
// 	"gorm.io/gorm"
// 	_ "github.com/go-sql-driver/mysql"
// )

// var DB *gorm.DB

// func Connect() {
// 	var err error
// 	DB, err = gorm.Open(mysql.Open("root:july7@tcp(127.0.0.1:3306)/july7"), &gorm.Config{})
// 	if err != nil {
// 		panic("could not connect to db")
// 	}
// }

// func Automigrate() {

// 	DB.AutoMigrate(models.Task{})
// }
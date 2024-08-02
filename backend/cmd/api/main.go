package main

import (
	"log"
    "github.com/gofiber/fiber/v2"
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
)

func main() {
	app := fiber.New()
	type Task struct {
		ID          string
		Title       string
		Description string
		Completed   bool
		Active      bool
	}
	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:3306)/july7"), &gorm.Config{})
if err != nil {
    panic("failed to connect database")
}	
	db.AutoMigrate(&Task{})



	app.Get("/tasks", func(c *fiber.Ctx) error {
		var tasks []Task
		db.Find(&tasks)
		//log.Fatal("&tasks", tasks)
		return c.JSON(tasks)
	})

app.Post("/tasks", func(c *fiber.Ctx) error {
    task := new(Task)
    if err := c.BodyParser(task); err != nil {
        return err
    }
    db.Create(&task)
    return c.JSON(task)
})


    app.Get("/", func (c *fiber.Ctx) error {
        return c.SendString("Hello, World!")
    })

    log.Fatal(app.Listen(":3000"))
}
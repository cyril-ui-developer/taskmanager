package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/cyril-ui-developer/taskmanager/backend/database"
	"github.com/cyril-ui-developer/taskmanager/backend/routes"
)

func main() {

	database.Connect()
	app := fiber.New()
	app.Use(cors.New())
	routes.Setup(app)
	log.Fatal(app.Listen(":4000"))
}

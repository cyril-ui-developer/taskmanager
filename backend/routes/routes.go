package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/cyril-ui-developer/july7-task-manager/backend/controllers"
)

func Setup(app *fiber.App) {
	api := app.Group("/api/v1")

	api.Get("/tasks", controllers.GetAllTasks)
	api.Post("/tasks", controllers.CreateTask)

}
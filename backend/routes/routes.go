package routes

import (
	"github.com/cyril-ui-developer/taskmanager/backend/handlers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("/api/v1")

	api.Get("/tasks", handlers.GetAllTasks)
	api.Post("/tasks", handlers.CreateTask)
	api.Patch("/tasks/:id/completed", handlers.UpdateTaskCompleted)
	api.Delete("/tasks/:id", handlers.DeleteTask)

}

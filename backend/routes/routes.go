package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/cyril-ui-developer/july7-task-manager/backend/handlers"
)

func Setup(app *fiber.App) {
	api := app.Group("/api/v1")

	api.Get("/tasks", handlers.GetAllTasks)
	api.Post("/tasks", handlers.CreateTask)
	api.Patch("/tasks/:id/completed", handlers.UpdateTaskCompleted)
	api.Delete("/tasks/:id", handlers.DeleteTask)

}
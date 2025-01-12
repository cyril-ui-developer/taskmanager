package routes

import (
	"github.com/cyril-ui-developer/taskmanager/backend/handlers"
	"github.com/gofiber/fiber/v2"
)

// Setup initializes the routes for the application
func Setup(app *fiber.App) {
	// Create a group for API versioning
	api := app.Group("/api/v1")

	// Define the route for getting all tasks
	api.Get("/tasks", handlers.GetAllTasks)

	// Define the route for creating a new task
	api.Post("/tasks", handlers.CreateTask)
	
	 // Define the route for updating the completion status of a task
	api.Patch("/tasks/:id/completed", handlers.UpdateTaskCompleted)
	
	    // Define the route for deleting a task
	api.Delete("/tasks/:id", handlers.DeleteTask)

}

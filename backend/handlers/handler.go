package handlers

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"github.com/cyril-ui-developer/july7-task-manager/backend/database"
	"github.com/cyril-ui-developer/july7-task-manager/backend/models"
)

// GetAllTasks retrieves all tasks from the database and returns them as a JSON response.
func GetAllTasks(c *fiber.Ctx) error {
	var tasks []models.Task
	err := database.DB.Debug().Find(&tasks)
	if err.Error != nil {
		// To mimic this error, you can start the server and then stop the database.
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			// Bad practice: Do not expose the actual error to the client in production but okay for development.
			"error": "Cannot fetch tasks: " + err.Error.Error(),
		})
	}
	return c.JSON(tasks)
}

// CreateTask creates a new task based on the JSON data provided in the request body.
// It parses the JSON data into a models.Task object and saves it to the database.
// If there is an error parsing the JSON or creating the task, it returns an appropriate error response.
func CreateTask(c *fiber.Ctx) error {
	task := new(models.Task)
	if err := c.BodyParser(task); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			// Bad practice: Do not expose the actual error to the client in production but okay for development.
			"error": "Cannot parse JSON: " + err.Error(),
		})
	}
	// Generate a new UUID and assign it to the task's ID
	task.ID = uuid.NewString()
	err := database.DB.Debug().Create(&task)
	if err.Error != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Cannot create task: " + err.Error.Error(),
		})
	}
	return c.JSON(task)
}

// UpdateTaskCompleted updates the 'completed' field of a task based on the JSON data provided in the request body.
func UpdateTaskCompleted(c *fiber.Ctx) error {
	existingTask, err := getTaskByID(c)
	if err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{
			"error": "Task not found",
		})
	}
	// Parse the 'completed' field from the request body
	completed := new(struct {
		Completed bool `json:"completed"`
	})
	if err := c.BodyParser(completed); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON: " + err.Error(),
		})
	}

	// Update the 'completed' field
	existingTask.Completed = completed.Completed

	// Save the changes to the database
	result := database.DB.Debug().Save(existingTask)
	if result.Error != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Cannot update task: " + result.Error.Error(),
		})
	}

	return c.JSON(existingTask)
}

// DeleteTask deletes a task based on the task ID provided in the URL parameters.
func DeleteTask(c *fiber.Ctx) error {
	// Get the task ID from the URL parameters and reurn the task
	existingTask, err := getTaskByID(c)
	if err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{
			"error": "Task not found",
		})
	}
	// Delete the task
	result := database.DB.Debug().Delete(existingTask)
	if result.Error != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Cannot delete task: " + result.Error.Error(),
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"success": "Task deleted successfully",
	})
}

// getTaskByID retrieves a task from the database based on the task ID provided in the URL parameters.
func getTaskByID(c *fiber.Ctx) (*models.Task, error) {
	// Get the task ID from the URL parameters
	id := c.Params("id")

	// Find the task
	existingTask := new(models.Task)
	// Pass in the ID as a parameter to the query
	err := database.DB.Debug().First(existingTask, "id = ?", id)
	if err.Error != nil {
		c.Status(http.StatusNotFound).JSON(fiber.Map{
			"error": "Task not found",
		})
	}

	return existingTask, nil
}

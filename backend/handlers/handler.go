package handlers

import (
	"github.com/gofiber/fiber/v2"
"net/http"

	"github.com/cyril-ui-developer/july7-task-manager/backend/models"
	"github.com/cyril-ui-developer/july7-task-manager/backend/database"
)

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

func CreateTask(c *fiber.Ctx) error {
    task := new(models.Task)
    if err := c.BodyParser(task); err != nil {
        return c.Status(http.StatusBadRequest).JSON(fiber.Map{
            // Bad practice: Do not expose the actual error to the client in production but okay for development.
            "error": "Cannot parse JSON: " + err.Error(),
        })
    }
	err := database.DB.Debug().Create(&task)
    if err.Error != nil {
        return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
            "error": "Cannot create task: " + err.Error.Error(),
        })
    }
    return c.JSON(task)
}

func UpdateTaskCompleted(c *fiber.Ctx) error {
    // Get the task ID from the URL parameters
    id := c.Params("id")

    // Find the existing task
    existingTask := new(models.Task)
    result := database.DB.Debug().First(existingTask, id)
    if result.Error != nil {
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

    // Save the changes
    result = database.DB.Debug().Save(existingTask)
    if result.Error != nil {
        return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
            "error": "Cannot update task: " + result.Error.Error(),
        })
    }

    return c.JSON(existingTask)
}
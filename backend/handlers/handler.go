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
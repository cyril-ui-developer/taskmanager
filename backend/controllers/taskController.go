package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/cyril-ui-developer/july7-task-manager/backend/models"
	"github.com/cyril-ui-developer/july7-task-manager/backend/database"
)


func GetAllTasks(c *fiber.Ctx) error {
	var tasks []models.Task
	database.DB.Debug().Find(&tasks)
	return c.JSON(tasks)
}


func CreateTask(c *fiber.Ctx) error {
    task := new(models.Task)
    if err := c.BodyParser(task); err != nil {
        return err
    }
    database.DB.Debug().Create(&task)
    return c.JSON(task)
    }

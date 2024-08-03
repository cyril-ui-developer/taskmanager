package handlers

import (
	"github.com/gofiber/fiber/v2"
"fmt"

	"github.com/cyril-ui-developer/july7-task-manager/backend/models"
	"github.com/cyril-ui-developer/july7-task-manager/backend/database"
)

func GetAllTasks(c *fiber.Ctx) error {
    var tasks []models.Task
    result := database.DB.Debug().Find(&tasks)
	fmt.Print(*result)
    if result.Error != nil {
        // To mimic this error, you can start the server and then stop the database.
        return c.Status(500).JSON(fiber.Map{
			"error": "Internal Server Error: Cannot fetch task",
        })
    }
    return c.JSON(tasks)
}

// func GetAllTasks(c *fiber.Ctx) error {
// 	var tasks []models.Task
// 	err := database.DB.Debug().Find(&tasks)
// 	if err != nil {
// 	 c.Status(500).JSON(&fiber.Map{
//             "message": err,
//             "status": "failed to fetch tasks",
//           })
    
//     }
// 	return c.JSON(tasks)
// }

func CreateTask(c *fiber.Ctx) error {
    task := new(models.Task)
    if err := c.BodyParser(task); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "error": "Bad request: Cannot parse JSON",
        })
    }
	result := database.DB.Debug().Create(&task)
    if result.Error != nil {
        return c.Status(500).JSON(fiber.Map{
            "error": "Internal server error: Cannot create task",
        })
    }
    return c.JSON(task)
}

// func CreateTask(c *fiber.Ctx) error {
//     task := new(models.Task)
//     if err := c.BodyParser(task); err != nil {
// 		log.Println("one", err)
// 		return c.Status(400).JSON(&fiber.Map{
//             "status": "failed",
//             "message": err,
//           })
        
//     }
//    err := database.DB.Debug().Create(&task)
//    log.Println("rwo", err)
// 	if err != nil {
		
// 		return c.Status(500).JSON(&fiber.Map{
//             "status": "failed",
//             "message": err,
//           })
        
//     }
//     //return c.JSON(task)
// 	return c.JSON(&fiber.Map{
//         "status": "success",
//         "message": "Task successfully created",
//         "product": task,
//       });
// 	//    err != nil {
// 	// 	log.Println("three", err)
// 	// 	return c.Status(500).JSON(&fiber.Map{
//     //         "status": "failed",
//     //         "message":  "Error creating task",
//     //       })
        
//     // }
// 	// return nil
//     }

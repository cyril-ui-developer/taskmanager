package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
   )   

type Task struct {
	ID          uuid.UUID `json:"id" gorm:"primary_key, type:uuid;"`
	Title       string `json:"title" gorm:"default:title not provided"`
	Description string `json:"description" gorm:"default:description not provided"`
	Completed   bool `json:"completed" gorm:"default:false"`
	Active      bool `json:"active" gorm:"default:false"`
}

func (user *Task) GenerateID(tx *gorm.DB) (err error) {
	// Generate a new UUID and assign it to the task's ID
	user.ID = uuid.New()
	return
   }
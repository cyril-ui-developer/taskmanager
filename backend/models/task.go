package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
   )   

type Task struct {
	ID           uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4()"`
	Title       string `json:"title" gorm:"default:title not provided"`
	Description string `json:"description" gorm:"default:description not provided"`
	Completed   bool `json:"completed" gorm:"default:false"`
	Active      bool `json:"active" gorm:"default:false"`
}

// BeforeCreate will set a UUID rather than numeric ID.
func (task *Task) BeforeCreate(tx *gorm.DB) (err error) {
    task.ID = uuid.New()
    return
}
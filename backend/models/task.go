package models

import (
	"time"
)

type Task struct {
	ID            uint      `json:"id"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
	DueDateTime time.Time   `json:"dueDateTime"`
	Title         string    `json:"title" gorm:"default:title not provided"`
	Description   string    `json:"description" gorm:"default:description not provided"`
	Priority	  string    `json:"priority" gorm:"default:low"`
	Completed     bool      `json:"completed" gorm:"default:false"`
	Active        bool      `json:"active" gorm:"default:false"`
}

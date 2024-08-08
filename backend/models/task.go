package models

import (
	"gorm.io/gorm"
   )   

   type Task struct {
	gorm.Model // Add fields `ID`, `CreatedAt`, `UpdatedAt`, `DeletedAt`
    Title       string    `json:"title" gorm:"default:title not provided"`
    Description string    `json:"description" gorm:"default:description not provided"`
    Completed   bool      `json:"completed" gorm:"default:false"`
    Active      bool      `json:"active" gorm:"default:false"`
}
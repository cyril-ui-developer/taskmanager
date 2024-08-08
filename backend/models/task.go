package models

import (
	"gorm.io/gorm"
	"time"
	"encoding/json"
   )   

   type Task struct {
	gorm.Model // Add fields `ID`, `CreatedAt`, `UpdatedAt`, `DeletedAt`
    Title       string    `json:"title" gorm:"default:title not provided"`
    Description string    `json:"description" gorm:"default:description not provided"`
    Completed   bool      `json:"completed" gorm:"default:false"`
    Active      bool      `json:"active" gorm:"default:false"`
}

// Override the default JSON serialization for gorm.Model fields
func (t Task) MarshalJSON() ([]byte, error) {
    type Alias Task
    return json.Marshal(&struct {
        ID        uint      `json:"id"`
        CreatedAt time.Time `json:"createdAt"`
        UpdatedAt time.Time `json:"updatedAt"`
        Alias   // Embed the original struct
    }{
        ID:        t.ID,
        CreatedAt: t.CreatedAt,
        UpdatedAt: t.UpdatedAt,
        Alias:     (Alias)(t),
    })
}
package models


type Task struct {
	ID          string `json:"id" gorm:"primary_key"`
	Title       string `json:"title" gorm:"default:title not provided"`
	Description string `json:"description" gorm:"default:description not provided"`
	Completed   bool `json:"completed" gorm:"default:false"`
	Active      bool `json:"active" gorm:"default:true"`
}
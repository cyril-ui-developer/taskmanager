package models


type Task struct {
	ID          string `json:"id" gorm:"primary_key"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Completed   bool `json:"completed" gorm:"default:false"`
	Active      bool `json:"active" gorm:"default:true"`
}
package models


type Task struct {
	Id        uint `json:"-"`
	Title 	  string
	Description  string
	Completed     bool
	Active   bool
}
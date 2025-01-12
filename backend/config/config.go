package config

import (
    "github.com/joho/godotenv"
    "os"
    "fmt"
)

// Config loads the .env file and retrieves the value for the given key
func Config(key string) string{
   
    // Load the .env file
    err := godotenv.Load(".env")
    if err != nil {
    
    // Print an error message if the .env file cannot be loaded
        fmt.Print("Error loading .env file")
    }

    // Retrieve the value of the specified key from the environment variables
    return os.Getenv(key)
}
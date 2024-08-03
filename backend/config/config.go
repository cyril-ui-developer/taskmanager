package config

import (
    "github.com/joho/godotenv"
    "os"
    "fmt"
)

func Config(key string) string{
    err := godotenv.Load(".env")
    if err != nil {
        fmt.Print("Error loading .env file")
    }
    return os.Getenv(key)

}
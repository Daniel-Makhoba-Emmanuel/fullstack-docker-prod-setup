package routes

import (
	"simple-go-api-container/handlers"

	"github.com/gin-gonic/gin"
)

func HelloRoute(r *gin.Engine) {
	r.GET("/", handlers.HelloHandler)
}

// This function sets up a simple "Hello, World!" route using the Gin framework.

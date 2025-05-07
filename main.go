package main

import (
	"fmt"
	"log"
	"os"
	databases "simple-go-api-container/Databases"
	"simple-go-api-container/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	databases.ConnectDB() // Connect to the database

	//create a new router
	router := gin.Default()

	routes.HelloRoute(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	listenAddr := ":" + port

	fmt.Printf("Starting server on port %s", listenAddr) // Print the port number to the console
	// Start the server
	err := router.Run(listenAddr)
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

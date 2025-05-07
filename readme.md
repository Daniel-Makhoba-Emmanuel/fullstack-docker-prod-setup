# Current Go API Container

This repository contains a Go-based API container designed for deployment in a DevOps environment. The project demonstrates containerization, API development, and deployment best practices.

## Features

- RESTful API built with Go.
- Dockerized for easy deployment.
- Scalable and production-ready architecture.
- Secure handling of secrets using github secrets.

## Prerequisites

- [Go](https://golang.org/) installed on your system.
- [Docker](https://www.docker.com/) installed and running.
- Basic understanding of containerization and API development.

## Getting Started

1. Clone the repository


2. Build the Docker image:
    ```bash
    docker build -t api_container .
    ```

3. Run the container:
    ```bash
    docker run -p 8080:8080 go-api-container
    ```

4. Access the API:
    Open your browser or API client and navigate to `http://localhost:8080`.





# Full Stack Docker Production Setup (Local)

Welcome to my Docker project! This repository demonstrates a production-grade full-stack application setup using Docker. The project integrates a React frontend, a Go-based backend, PostgreSQL for the database, and Redis for caching. 

## Table of Contents
- [Full Stack Docker Production Setup (Local)](#full-stack-docker-production-setup-local)
  - [Table of Contents](#table-of-contents)
  - [Navigating the Repository](#navigating-the-repository)
  - [FRONTEND](#frontend)
  - [BACKEND](#backend)
  - [DOCKER](#docker)
    - [Compose.yaml](#composeyaml)
    - [Dockerfile.frontend](#dockerfilefrontend)
    - [Dockerfile.prod](#dockerfileprod)
  - [Continious Integration(CI)](#continious-integrationci)
  - [Security](#security)
  - [Improvements](#improvements)

## Navigating the Repository
The project repository is pretty large,so to help you know what's where, and how to implement it, here's a breakdown. The project is broken down into several catgories

- Frontend
- Backend
- Docker 
- Continious Integration (CI)
- Security 
- Improvements

## FRONTEND
I'm a Kubernetes engineer not a Frontend engineer, so developing a frontend from scratch is a bit out of my domain. To solve this I used an AI, lovable AI(lovable.dev) to generate the frontend code. The frontend is designed to show that this project uses docker, with features such as buttons that communicate with the containerized backend(API) and get a response.

![alt text](image.png)

**The stack used for the frontend include:**

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

You can run the frontend code seperately without a docker container. For more information on the frontend setup, navigate to the `react-hello-world-start` folder. It has it's own dedicated readme to guide you through.

## BACKEND
Lets talk about the backend. Again i'm a kubernetes engineer, so my knowlege on backned services isn't the vastest but I'd say my skills in GO are pretty solid, hence the backend written purely in GO. The backend is broken into several folders/files:

**The stack used for the backend include:**

- GO (tempted to troll python guys but nah:) )
  - Http framework : GIN
  - Database interaction: GORM
  - Redis interaction: go-redis

- `Databases` folder
 The setup uses a postgresql container as it's database(like why not?), and a redis conatiner for caching. The logic on how the backend(aka API container) interacts with these containers is housed here. I designed it so you can add other databases and caching technologies by simply creating a go file in the database package.

- `handlers` Folder
The handlers for the different routes are put in this folder, to make things organized and easier to track. Right now the file names in this folder are pretty self-descriptive, so you should definitely follow something similar when setting up your own handlers.

- `middelware` Folder
All your middleware are kept in this folder

- `models` folder
This folder handles your custom datatypes(structs) for your code. For example for database interaction GORM is being used, you may want to define the structs GORM would map to your database tables. This is done here.

- `routes` folder
Your routes are here and point to their corresponding handler in the handlers package.

- `templates` folder
Honestly I'm not sure what to do with this folder, If you see it in the repo, I guess I found something to use it for but otherwise ;)

and finally everything is called by the `main.go`

## DOCKER
The different services used in this setup are contianerized, and configured to interact with one another. This can be summed up in three files

- `compose.yaml`
- `Dockerfile.frontend`
- `Dockerfile.prod`

### Compose.yaml
The different services/networks/volumes are configured here. Looking at the configurations, each service is configured with a health check to confirm the container is running and not dead. You'll want to create a .env file for this and configure your variables. You don't have to worry about the .env or any other unnecessary file being built into the images/containers, the  `.gitignore` and .`dockerignore` are taking care of these

If you take a closer look at the `Api` service, you can see the that the docker image for the backend is built here , so you dont have to worry about pulling it from a dockerhub, quay.io, or whichever service you use, but in a prod environment (totally my opinion), it should definitely be pulled from one, with more dynamic tagging and versioning used.

### Dockerfile.frontend
This is used to build the react appplication image. In the file image uses a multi-satage build , with a lightweight nginx as the final image. It's also removed from root user, following the principle of least privilege (PoLP), which simply means the user created only accesses what it needs to run (so root directory access is out of the question). 

You could also implement the healthcheck for this in the image itself i suppose and remove it from the `compose.yaml`

### Dockerfile.prod
Poor naming convention here guys, definitely establish a naming convention before you start your projects. This actually builds the image for the backend(API) container. It uses a similar configuration to the react image in the sense PoLP is followed, a lightwieght image(alpine) is used as the final image. 

However, unlike the frontend image debugginf information specifically `DWARF` and `symbols table` is removed to reduce the size and prevent reverse enfineering using debugger/profile tools. This dropped the image by 6-8 mb if i'm not mistaken, you can easily compare this using `docker history` on the image to examine the image layers


## Continious Integration(CI)
For automation Github Actions was used. The workflow performs several functions from building images to vulnerability scanning to uploading them to remote repositories. You can check out the workflow in `docker-build-prod.yaml` for more details.


## Security 
The security coverage of this setup includes vulnerability scanning. Trivy is used to perform vulnerability scanning on the built images before they're pushed to the remote repository.

If a vulnerability is identified, with a severity of "HIGH" or "CRITICAL" the pipeline fails. In this event you'll have to look at the logs and fix whatever vulnerability is identified. 

The images are already secured and should pass without any issues as of the time of writing this. The only vulnerabilities that were found(fixed) were in the application libraries and the alpine libraries

## Improvements
This setup isn't perfect by a longshot, but it achieves its purpose. However if i were truly deploying this in production i would implement the following

1. Unit tests
2. Integration tests
3. Code quality analysis
4. Linting
5. Tagging (Semantic versioning using vX.Y.Z and Git SHA)
6. Seperate job for deployment
7. Integrating notfications with slack, email teams etc.
8. Application dependency scanning

These are the some of the improvements I'd definitely include. And most likely these would be implemented in the other versions of this project(full blown k8s:) clusters(dev,staging, prod).


**Note**: Feel free to contribute to the project, it was an excellent learning experience for me and I feel it could be for you too. See you at the top!!








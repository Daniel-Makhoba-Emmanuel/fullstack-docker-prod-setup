# Welcome to my full stack docker prodcution setup(Local)

Hey everyone, welcome to docker project!. The whole point of this project is to implement docker on a production scale for a fullstack application(Frontend + Backend + Database + Cache ) Everything from ports, to networks all the way down to the images is secured and implements best practices.

## Navigating the repo
The project repo is pretty large(it will be by the time i'm done:)), to help you know what's where, and how to implement it, here's a breakdown. The project can be broken down into three broad catgories

- Frontend
- Backend
- Docker 

### FRONTEND
I'm a kubernetes engineer not a frontend engineer, so developing a frontend from scratch was out of the question. To solve this I used lovable AI(lovable.dev) to generate the frontend code which is in react and typescript. The frontend is designed to show that this project uses docker, with features such as buttons that communicate with the containerized backend(API) and get a response.

![alt text](image.png)

The stack used for the frontend include:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


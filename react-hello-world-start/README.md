# React Hello World Frontend
![alt text](../image.png)

This is the frontend for my **Full Stack Docker Production Setup (Local)**. The frontend was generated using **Lovable.dev**, an AI-powered platform that creates applications based on prompts. The theme for this project is a **Docker/Kubernetes-themed Single Page Application (SPA)**, designed to showcase containerized backend interactions.

The application demonstrates how a React-based frontend can seamlessly integrate with containerized backend services using **Nginx** as a reverse proxy.

---

## Deployment Instructions

To deploy this project, follow these steps:

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Install dependencies

`npm install`

## Run the Development Server
`npm run dev`

## Build for Production
`npm run build`

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Nginx Configuration for Container Integration

The nginx.conf file plays a critical role in connecting the frontend to the backend containers. It is configured to:

- Serve the React application as a static site.
- Proxy API requests from the frontend to the backend container.
  
Here’s the nginx.conf used in this project:

### This configuration will be copied to /etc/nginx/conf.d/default.conf in the Nginx container

```bash
server {
    listen 80;
    server_name localhost; # You can change this if you have a domain

    # Serve React static files
    location / {
        root   /usr/share/nginx/html; # Nginx's default static file directory
        index  index.html index.htm;
        try_files $uri $uri/ /index.html; # Crucial for Single Page Applications (SPAs) like React
                                          # This ensures that navigating directly to a route like /about
                                          # still serves index.html, allowing React Router to handle it.
    }

    # Proxy API requests to the Go backend
    # Any request starting with /api/ will be forwarded
    location /api/ {
        # The 'api' here is the service name of your Go backend in docker-compose.yaml
        # Docker's internal DNS will resolve 'api' to the Go container's IP address.
        # The port 8080 is the port your Go API listens on INSIDE its container.
        proxy_pass http://api:8080/;

        # Standard proxy headers to pass along to the backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Optional: If you encounter issues with buffering or timeouts, you might adjust these
        # proxy_buffering off;
        # proxy_request_buffering off; # Useful for streaming or long-polling
        # proxy_http_version 1.1; # Recommended for keep-alive connections
        # proxy_read_timeout 300s;
        # proxy_connect_timeout 75s;
    }

    # Optional: Custom error pages
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html; # You can place custom error pages here
    }
}
```
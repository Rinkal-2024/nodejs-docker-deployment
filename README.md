# Node.js Dockerized Application

This project demonstrates how to containerize a Node.js application using Docker. The project consists of the following files and folders:

- `index.js`: The entry point for your Node.js application.
- `package.json` and `package-lock.json`: Files for managing dependencies.
- `public/index.html`: The frontend file served by the Node.js application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (Optional, for running locally without Docker)

## Project Structure

```
├── Dockerfile
├── index.js
├── package.json
├── package-lock.json
└── public
    └── index.html
```

## Step-by-Step Guide

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

### 2. Create the Dockerfile

This is the `Dockerfile` used to build the Docker image for this Node.js app:

```Dockerfile
# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to start the app
CMD ["node", "index.js"]
```

### 3. Build the Docker Image

To build the Docker image, run the following command:

```bash
docker build -t my-node-app .
```

This will build the Docker image from the `Dockerfile` and tag it as `my-node-app`.

### 4. Run the Docker Container

Once the image is built, you can run it as a container:

```bash
docker run -p 3000:3000 my-node-app
```

This will start the container and map port 3000 on the container to port 3000 on your local machine. You can now access the application by navigating to:

```
http://localhost:3000
```

### 5. Verify the Application

Open your browser and go to `http://localhost:3000`. You should see the application running with the content of the `public/index.html` file.

### 6. Stopping the Container

To stop the running container, press `CTRL+C` in the terminal where the container is running, or use the following command to stop it gracefully:

```bash
docker ps   # To get the container ID
docker stop <container-id>
```

## Additional Commands

- **List Docker Images:**

  ```bash
  docker images
  ```

- **Remove Docker Images:**

  ```bash
  docker rmi my-node-app
  ```

- **List Running Containers:**

  ```bash
  docker ps
  ```

- **Remove Stopped Containers:**

  ```bash
  docker rm <container-id>
  ```

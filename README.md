# TodayTM
## About the project
TodayTM is a minimal and simple task management application designed to help you efficiently manage all your daily tasks. The motivation behind this project is to demonstrate how to build and deploy a minimal and simple full-stack cloud-native application using a modern and trending technology stack such as React, Golang, and Kubernetes. 

### Setup the project
#### Running the application using `docker compose up`
- Clone the repository
- Run `docker compose up` to start the three services namely db, backend and frontend. The Docker Compose is use to orchestrate the Frontend, Go Backend API and MySQL services.
- The backend API is avaialable at "http://localost:4000" and frontend is at "http://localhost:300"

#### Running each services in the application separating
- Stop and remove the docker containers for the services if you ran `docker compose up` earlier
- Change to the project directory "/taskmanager/backend" and run `docker compose up` to start the MySQL server
```
cd /taskmanager/backend
docker compose up
```
- Change to the backend directory "/taskmanager/backend"
- Run `go get` to fetch and install backend dependencies
- Run `go run .` to start the Go backend API server on locahost port 4000
- Open another terminal, and change to "/taskmanager/frontend"
- Run `yarn && yarn start` to launch the React frontend application on locahost port 3000.

### Some screenshots of the TodayTM application
#### List Tasks screens
![Screenshot](screenshots/screenshot_1.png)

![Screenshot](screenshots/screenshot_2.png)

![Screenshot](screenshots/screenshot_3.png)

![Screenshot](screenshots/screenshot_4.png)

#### Add Task screens
![Screenshot](screenshots/screenshot_5.png)

![Screenshot](screenshots/screenshot_6.png)


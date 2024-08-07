# Use the official Golang image as the base image
FROM golang:1.22.3 

# # Set the Current Working Directory inside the container
WORKDIR /app

# # Copy go.mod and go.sum files to the workspace
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Installs the Air tool into the Go workspace's bin directory within the Docker container
RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

# RUN go buil
CMD ["air"]
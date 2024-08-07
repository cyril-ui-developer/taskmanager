# Use the official Golang image as the base image
FROM golang:1.22.3 

# # Set the Current Working Directory inside the container
# WORKDIR /app

# # Copy go.mod and go.sum files to the workspace
# COPY go.mod go.sum ./

# # Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
# RUN go mod download

# # Copy the source from the current directory to the Working Directory inside the container
# COPY . .

# # Build the Go app
# RUN go build -o main .

# # Start a new stage from scratch
# FROM alpine:latest  

# RUN apk --no-cache add ca-certificates

# WORKDIR /root/

# # Copy the Pre-built binary file from the previous stage
# COPY --from=build /app/main .

# # Expose port 8080 to the outside world
# EXPOSE 4000



WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

# Set environment variables
# ENV DBHOST=db
# ENV DBUSER=root
# ENV DBPASSWORD=password
# ENV DBPORT=3306
# ENV DBNAME=july7

RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

CMD ["air"]
# Command to run the executable
# CMD ["./main"]
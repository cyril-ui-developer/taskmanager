# Stage 1: Build React app
FROM node:18-alpine as build-stage

WORKDIR /app

# Copy package.json, package-lock.json, and yarn.lock separately to leverage Docker cache
COPY package*.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Verify that the build output exists
RUN if [ ! -d "build" ]; then echo "Build failed: build directory not found"; exit 1; fi

# Stage 2: Serve React app with Nginx
FROM nginx:1.25.1 as prod-stage

# Copy the built files from the build stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
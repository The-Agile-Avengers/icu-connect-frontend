# Use an official Node.js runtime as a parent image
FROM node:14-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the React app build from the previous stage to the Nginx web root
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

# Expose the Nginx HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
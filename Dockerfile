# Use the official Node.js 18 image from the Docker Hub
FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]

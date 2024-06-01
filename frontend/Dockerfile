# Use the latest Node.js 18 image as the build environment
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a standard Node.js 18 image for the production environment
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist /app/dist

# Copy the custom server script
COPY server.js ./

# Expose port 5173 to the outside world
EXPOSE 5173

# Command to run the custom server
CMD ["node", "server.js"]

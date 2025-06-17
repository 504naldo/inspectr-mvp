# Use an official Node.js runtime
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package manifests and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the source
COPY . .

# Build the TypeScript
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

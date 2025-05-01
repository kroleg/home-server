# Use official Node.js LTS image as a base
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install TypeScript globally
RUN npm install -g typescript

# Copy package.json and package-lock.json (if any) to install dependencies first
COPY package*.json ./

# Install dependencies (including typescript-related dependencies)
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Build TypeScript to JavaScript (assuming a tsconfig.json is present)
RUN tsc

# Expose any ports if needed (not needed for file watching directly)
EXPOSE 3000

# Run the watcher script (change `watcher.js` to whatever file runs your watcher)
CMD ["node", "dist/watcher.js"]

# Use the official Node.js as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /bimm

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# If there is no package.json, you can skip the above step

# Copy app.js to the working directory
COPY app.js .

# Install any dependencies
# If your application has no dependencies, you can skip this step
RUN npm install

# Expose port, make sure it matches your app's port
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]

FROM mcr.microsoft.com/playwright:v1.51.1-focal

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Set and expose port
ENV PORT=10000
EXPOSE 10000

# Start the application
CMD ["npm", "start"]

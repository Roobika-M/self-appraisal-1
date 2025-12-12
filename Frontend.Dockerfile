FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Expose Vite dev server port
EXPOSE 8080

# Run development server with host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

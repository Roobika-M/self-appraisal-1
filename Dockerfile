# ----------------------------------------
# STAGE 1: Frontend Build (Builds React app using Vite)
# ----------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build the React application (output goes to /app/dist)
COPY . .
RUN npm run build

# ----------------------------------------
# STAGE 2: Backend/Final Image (Serves Flask app with docx2pdf support)
# ----------------------------------------
# Use a base image that already contains LibreOffice/Unoconv.
# This avoids system installation errors on resource-constrained environments.
FROM gotenberg/libreoffice:latest

# Install Python and pip inside this image, as it's not a Python-native base.
# This ensures we can run the Flask app and install Python dependencies.
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Environment variables for Flask
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP app.py

WORKDIR /usr/src/app

# Copy Python requirements and install them using pip3
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the Flask application
COPY app.py ./

# CRITICAL STEP: Copy the built React files from STAGE 1 (frontend-builder's /app/dist)
# into the Flask application's static folder (/usr/src/app/build).
COPY --from=frontend-builder /app/dist /usr/src/app/build

# Expose the Flask port
EXPOSE 5000

# Command to run the Python application
CMD ["python3", "app.py"]
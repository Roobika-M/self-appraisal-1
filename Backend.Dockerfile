FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app.py .

# Copy or create appraisal_history.json
COPY appraisal_history.json .

# Create necessary directories
RUN mkdir -p uploads templates

# Expose Flask port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]

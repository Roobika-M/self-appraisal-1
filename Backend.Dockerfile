FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies (LibreOffice and imagemagick added for DOCX->PDF conversion)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libreoffice \
    imagemagick \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m appuser

# Copy a Docker-friendly requirements file (omits Windows-only packages)
COPY requirements.docker.txt ./
RUN pip install --no-cache-dir -r requirements.docker.txt

# Copy application files
COPY . /app

# Ensure non-root owns the files and switch user
RUN chown -R appuser:appuser /app
USER appuser

# Create necessary runtime directories
RUN mkdir -p /app/uploads /app/templates || true

# Expose Flask port
EXPOSE 5000

# Use gunicorn for production-grade serving (app variable must be `app` in `app.py`)
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]

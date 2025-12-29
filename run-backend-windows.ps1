<#
Simple PowerShell helper to set up a venv, install Windows requirements, and run the Flask app.
Usage: Open PowerShell as Administrator (if installing pywin32 requires it) and run:
  .\run-backend-windows.ps1
#>
set-StrictMode -Version Latest
Write-Host "Setting up Python virtual environment and installing dependencies..."

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Error "Python not found in PATH. Please install Python 3.8+ and ensure 'python' is on PATH."
    exit 1
}

$venvPath = "venv"
if (-not (Test-Path $venvPath)) {
    python -m venv $venvPath
}

Write-Host "Activating virtual environment..."
& "$venvPath\Scripts\Activate.ps1"

Write-Host "Installing dependencies from requirements.txt (including Windows-only packages)..."
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

Write-Host "Starting backend (Flask) on http://localhost:5000"
python app.py

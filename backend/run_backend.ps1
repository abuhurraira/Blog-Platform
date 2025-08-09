# PowerShell script to run the backend with PostgreSQL
Write-Host "Setting up Blog Platform Backend..." -ForegroundColor Green

# Set environment variables for PostgreSQL
$env:DATABASE_URL = "postgresql://bloguser:blogpass@localhost:5432/blogdb"
$env:JWT_SECRET_KEY = "your-super-secret-jwt-key-change-this-in-production"
$env:FLASK_ENV = "development"
$env:FLASK_DEBUG = "true"

Write-Host "Environment variables set:" -ForegroundColor Yellow
Write-Host "DATABASE_URL: $env:DATABASE_URL"
Write-Host "FLASK_ENV: $env:FLASK_ENV"
Write-Host ""

# Check if virtual environment is activated
if (-not $env:VIRTUAL_ENV) {
    Write-Host "Activating virtual environment..." -ForegroundColor Yellow
    .\venv\Scripts\Activate.ps1
}

Write-Host "Starting Flask backend..." -ForegroundColor Green
python app.py


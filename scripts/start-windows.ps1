$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$pythonExe = Join-Path $projectRoot "backend\venv\Scripts\python.exe"
$mainPy = Join-Path $projectRoot "backend\main.py"

if (-not (Test-Path $pythonExe)) {
  Write-Error "Python virtual environment not found at $pythonExe"
  exit 1
}

if (-not (Test-Path $mainPy)) {
  Write-Error "Backend entrypoint not found at $mainPy"
  exit 1
}

Write-Output "Starting backend server..."
Write-Output "URL: http://127.0.0.1:8000/login"
Write-Output "Keep this terminal open while using the app."

& $pythonExe $mainPy

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$mainPy = Join-Path $projectRoot "backend\main.py"

$pythonCandidates = @(
  (Join-Path $projectRoot ".venv\Scripts\python.exe"),
  (Join-Path $projectRoot "venv\Scripts\python.exe"),
  (Join-Path $projectRoot "backend\venv\Scripts\python.exe")
)

$pythonExe = $null
foreach ($candidate in $pythonCandidates) {
  if (Test-Path $candidate) {
    $pythonExe = $candidate
    break
  }
}

if (-not $pythonExe) {
  $pythonCommand = Get-Command python -ErrorAction SilentlyContinue
  if ($pythonCommand) {
    $pythonExe = $pythonCommand.Source
  }
}

if (-not $pythonExe -or -not (Test-Path $pythonExe)) {
  Write-Error "Python interpreter not found. Create a virtual environment or install Python and ensure 'python' is on PATH."
  exit 1
}

if (-not (Test-Path $mainPy)) {
  Write-Error "Backend entrypoint not found at $mainPy"
  exit 1
}

Write-Output "Starting backend server..."
Write-Output "URL: http://127.0.0.1:8000/login"
Write-Output "Python: $pythonExe"
Write-Output "Keep this terminal open while using the app."

& $pythonExe $mainPy

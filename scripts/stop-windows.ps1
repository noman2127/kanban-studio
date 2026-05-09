$ErrorActionPreference = "SilentlyContinue"

$projectRoot = Split-Path -Parent $PSScriptRoot
$mainPy = (Join-Path $projectRoot "backend\main.py").ToLowerInvariant()

$stopped = 0
Get-CimInstance Win32_Process |
  Where-Object {
    $_.Name -eq "python.exe" -and $_.CommandLine -and $_.CommandLine.ToLowerInvariant().Contains($mainPy)
  } |
  ForEach-Object {
    Stop-Process -Id $_.ProcessId -Force
    $stopped++
  }

if ($stopped -gt 0) {
  Write-Output "Stopped $stopped backend process(es)."
} else {
  Write-Output "No running backend process found."
}

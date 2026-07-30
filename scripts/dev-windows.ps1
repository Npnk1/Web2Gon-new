[CmdletBinding()]
param(
  [int]$Port = 3000,
  [ValidateRange(1, 300)]
  [int]$VerifySeconds = 5,
  [switch]$Turbopack
)

$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$artifactDirectory = Join-Path $projectRoot "artifacts"
New-Item -ItemType Directory -Path $artifactDirectory -Force | Out-Null

$stdoutPath = Join-Path $artifactDirectory "dev-windows.stdout.log"
$stderrPath = Join-Path $artifactDirectory "dev-windows.stderr.log"
$summaryPath = Join-Path $artifactDirectory "dev-windows.summary.json"
$serverScript = Join-Path $PSScriptRoot "dev-windows-server.ps1"

function Get-HttpStatus {
  param([string]$Uri)

  try {
    return (Invoke-WebRequest -Uri $Uri -UseBasicParsing -TimeoutSec 5).StatusCode
  } catch {
    return $null
  }
}

function Get-ListeningProcess {
  param([int]$LocalPort)

  return Get-NetTCPConnection `
    -LocalPort $LocalPort `
    -State Listen `
    -ErrorAction SilentlyContinue |
    Select-Object -First 1
}

while ($true) {
  $listener = Get-ListeningProcess -LocalPort $Port
  if (-not $listener) {
    break
  }

  $existingProcess = Get-CimInstance `
    Win32_Process `
    -Filter "ProcessId = $($listener.OwningProcess)"
  $existingUrl = "http://127.0.0.1:$Port/"
  $existingStatus = Get-HttpStatus -Uri $existingUrl

  if (
    $existingStatus -eq 200 -and
    $existingProcess.CommandLine -like "*$projectRoot*"
  ) {
    Write-Host "Web2Go is already running."
    Write-Host "URL: $existingUrl"
    Write-Host "PID: $($listener.OwningProcess)"
    exit 0
  }

  $Port++
}

$nodeCommand = Get-Command node.exe -ErrorAction Stop
$nextCli = (Resolve-Path (
  Join-Path $projectRoot "node_modules\next\dist\bin\next"
)).Path
$modeArgument = if ($Turbopack) { "--turbopack" } else { "--webpack" }
$url = "http://127.0.0.1:$Port/"

$arguments = @(
  "-NoProfile",
  "-ExecutionPolicy",
  "Bypass",
  "-File",
  "`"$serverScript`"",
  "-NodePath",
  "`"$($nodeCommand.Source)`"",
  "-NextCli",
  "`"$nextCli`"",
  "-ModeArgument",
  $modeArgument,
  "-Port",
  "$Port",
  "-WorkingDirectory",
  "`"$projectRoot`"",
  "-StdoutPath",
  "`"$stdoutPath`"",
  "-StderrPath",
  "`"$stderrPath`""
)

$null = New-Item -ItemType File -Path $stdoutPath -Force
$null = New-Item -ItemType File -Path $stderrPath -Force

$startedAt = Get-Date
$serverProcess = Start-Process `
  -FilePath "powershell.exe" `
  -ArgumentList $arguments `
  -WorkingDirectory $projectRoot `
  -WindowStyle Hidden `
  -PassThru

$ready = $false
$readyDeadline = (Get-Date).AddSeconds(30)

while ((Get-Date) -lt $readyDeadline) {
  $serverProcess.Refresh()
  if ($serverProcess.HasExited) {
    break
  }

  if ((Get-HttpStatus -Uri $url) -eq 200) {
    $ready = $true
    break
  }

  Start-Sleep -Milliseconds 500
}

if (-not $ready) {
  $serverProcess.Refresh()
  $exitCode = if ($serverProcess.HasExited) {
    $serverProcess.ExitCode
  } else {
    $null
  }

  $failureSummary = [ordered]@{
    startedAt = $startedAt.ToString("o")
    projectRoot = $projectRoot
    node = (& node.exe --version)
    pnpm = (& pnpm.cmd --version)
    mode = $modeArgument
    url = $url
    processId = $serverProcess.Id
    processExited = $serverProcess.HasExited
    exitCode = $exitCode
    stdout = $stdoutPath
    stderr = $stderrPath
  }
  $failureSummary |
    ConvertTo-Json -Depth 4 |
    Set-Content -LiteralPath $summaryPath

  Write-Error "Next.js did not remain available. See $summaryPath"
}

$successfulChecks = 0
for ($second = 1; $second -le $VerifySeconds; $second++) {
  Start-Sleep -Seconds 1
  $serverProcess.Refresh()

  if ($serverProcess.HasExited) {
    $exitSummary = [ordered]@{
      startedAt = $startedAt.ToString("o")
      exitedAt = (Get-Date).ToString("o")
      projectRoot = $projectRoot
      node = (& node.exe --version)
      pnpm = (& pnpm.cmd --version)
      mode = $modeArgument
      url = $url
      processId = $serverProcess.Id
      processExited = $true
      exitCode = $serverProcess.ExitCode
      successfulHttpChecks = $successfulChecks
      stdout = $stdoutPath
      stderr = $stderrPath
    }
    $exitSummary |
      ConvertTo-Json -Depth 4 |
      Set-Content -LiteralPath $summaryPath

    Write-Error (
      "Next.js exited with code $($serverProcess.ExitCode). " +
      "See $summaryPath"
    )
  }

  if ((Get-HttpStatus -Uri $url) -eq 200) {
    $successfulChecks++
  } else {
    Write-Error "Next.js stopped responding at $url"
  }
}

$listener = Get-ListeningProcess -LocalPort $Port
$successSummary = [ordered]@{
  startedAt = $startedAt.ToString("o")
  verifiedAt = (Get-Date).ToString("o")
  projectRoot = $projectRoot
  node = (& node.exe --version)
  pnpm = (& pnpm.cmd --version)
  mode = $modeArgument
  url = $url
  launcherProcessId = $serverProcess.Id
  listenerProcessId = if ($listener) { $listener.OwningProcess } else { $null }
  processExited = $false
  exitCode = $null
  successfulHttpChecks = $successfulChecks
  verificationSeconds = $VerifySeconds
  stdout = $stdoutPath
  stderr = $stderrPath
}
$successSummary |
  ConvertTo-Json -Depth 4 |
  Set-Content -LiteralPath $summaryPath

Write-Host "Web2Go development server is ready."
Write-Host "URL: $url"
Write-Host "PID: $($listener.OwningProcess)"
Write-Host "Mode: $modeArgument"
Write-Host "Verified for $VerifySeconds seconds."
Write-Host "Logs: $stdoutPath"

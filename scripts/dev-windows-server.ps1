[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$NodePath,
  [Parameter(Mandatory = $true)]
  [string]$NextCli,
  [Parameter(Mandatory = $true)]
  [ValidateSet("--webpack", "--turbopack")]
  [string]$ModeArgument,
  [Parameter(Mandatory = $true)]
  [int]$Port,
  [Parameter(Mandatory = $true)]
  [string]$WorkingDirectory,
  [Parameter(Mandatory = $true)]
  [string]$StdoutPath,
  [Parameter(Mandatory = $true)]
  [string]$StderrPath
)

$ErrorActionPreference = "Stop"
$OutputEncoding = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = $OutputEncoding
[Console]::InputEncoding = $OutputEncoding

Set-Location -LiteralPath $WorkingDirectory

& $NodePath `
  $NextCli `
  dev `
  $ModeArgument `
  --hostname 127.0.0.1 `
  --port $Port `
  1>> $StdoutPath `
  2>> $StderrPath

exit $LASTEXITCODE

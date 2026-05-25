Write-Host "Starting Sentinel-Node Native OS Framework..." -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

Write-Host "1. Checking dependencies..."
# Check for docker, node, etc.

Write-Host "2. Starting Background Agents (Cron & Health)..."
# Add agent startup here later

Write-Host "3. Launching the Native Desktop OS..."
Set-Location -Path "dashboard"
npm run electron-dev

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Sentinel-Node OS is running natively. Close the window to terminate."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

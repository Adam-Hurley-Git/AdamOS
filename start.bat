@echo off
echo Starting Sentinel-Node Native OS Framework...
echo ====================================

echo 1. Checking dependencies...
:: Check for docker (mock for now)

echo 2. Starting Background Agents (Cron & Health)...
:: Add agent startup commands here in the future

echo 3. Launching the Native Desktop OS...
cd dashboard
call npm run electron-dev

echo ====================================
echo Sentinel-Node OS is running natively. Close the window to terminate.
pause

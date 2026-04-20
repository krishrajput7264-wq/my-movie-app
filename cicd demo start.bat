@echo off
echo.
echo ==============================================
echo      Starting CineMatch (CI/CD Demo)
echo ==============================================
echo.
echo Launching your premium movie website in the default browser...

:: This command launches the index.html file cleanly in the system's default browser
start "" "%~dp0index.html"

exit

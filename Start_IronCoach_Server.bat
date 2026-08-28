@echo off
title ASU-TP Iron Coach Sync Server
cd /d "%~dp0"
echo ========================================================
echo   ASU-TP IRON COACH - Local Cloud Sync Server
echo ========================================================
echo   Phone link: http://192.168.12.9:8080
echo   PC link:    http://localhost:8080
echo ========================================================
echo.
powershell -ExecutionPolicy Bypass -File server.ps1
pause

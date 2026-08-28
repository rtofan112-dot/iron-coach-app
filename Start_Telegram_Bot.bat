@echo off
title ASU-TP Iron Coach Telegram Bot
cd /d "%~dp0"
echo ========================================================
echo   ASU-TP IRON COACH - Telegram Bot Daemon
echo   Bot: @iron_coach2026API_bot
echo ========================================================
echo.
powershell -ExecutionPolicy Bypass -File telegram_bot.ps1
pause

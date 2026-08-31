@echo off
title JONANDA MAIL - Desktop Client
echo =======================================================
echo    Launching JONANDA MAIL Sovereign Desktop App...
echo =======================================================

:: Check if Edge exists for standalone window mode
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="http://localhost:5174/" --window-size=1380,880
    exit
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="http://localhost:5174/" --window-size=1380,880
    exit
)

:: Fallback to default browser
start "" "http://localhost:5174/"
exit

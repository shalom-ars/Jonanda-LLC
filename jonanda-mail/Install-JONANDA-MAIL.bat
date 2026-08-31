@echo off
setlocal enabledelayedexpansion
title JONANDA MAIL - Windows Application Setup Installer

echo ================================================================
echo           JONANDA MAIL - Windows Setup Wizard (v1.0.0)
echo ================================================================
echo.
echo Installing JONANDA MAIL to your Windows system...
echo.

set "INSTALL_DIR=%LOCALAPPDATA%\Programs\JonandaMail"
set "SHORTCUT_PATH=%USERPROFILE%\Desktop\JONANDA MAIL.lnk"
set "STARTMENU_PATH=%APPDATA%\Microsoft\Windows\Start Menu\Programs\JONANDA MAIL.lnk"

:: 1. Create Installation Directory
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"

:: 2. Copy Production Files
echo [1/4] Copying core application files to %INSTALL_DIR%...
xcopy /E /I /Y "%~dp0dist" "%INSTALL_DIR%\dist" >nul
xcopy /E /I /Y "%~dp0public" "%INSTALL_DIR%\public" >nul
copy /Y "%~dp0start-desktop-app.bat" "%INSTALL_DIR%\JonandaMail.bat" >nul

:: 3. Create Windows Desktop Shortcut via PowerShell
echo [2/4] Registering Windows Desktop Shortcut...
powershell -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = '%INSTALL_DIR%\JonandaMail.bat'; $s.WorkingDirectory = '%INSTALL_DIR%'; $s.WindowStyle = 7; $s.Description = 'JONANDA MAIL - Enterprise Email Platform'; $s.Save()"

:: 4. Create Windows Start Menu Shortcut
echo [3/4] Registering Windows Start Menu entry...
powershell -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%STARTMENU_PATH%'); $s.TargetPath = '%INSTALL_DIR%\JonandaMail.bat'; $s.WorkingDirectory = '%INSTALL_DIR%'; $s.WindowStyle = 7; $s.Description = 'JONANDA MAIL - Enterprise Email Platform'; $s.Save()"

:: 5. Create Uninstaller script
echo [4/4] Generating uninstaller...
(
echo @echo off
echo echo Uninstalling JONANDA MAIL...
echo del "%SHORTCUT_PATH%" 2^>nul
echo del "%STARTMENU_PATH%" 2^>nul
echo rd /s /q "%INSTALL_DIR%" 2^>nul
echo echo JONANDA MAIL has been completely removed from your system.
echo pause
) > "%INSTALL_DIR%\Uninstall.bat"

echo.
echo ================================================================
echo     SUCCESS: JONANDA MAIL Installation Completed!
echo ================================================================
echo.
echo - Installed to: %INSTALL_DIR%
echo - Desktop Shortcut created on your Desktop: "JONANDA MAIL"
echo - Start Menu Shortcut created in Windows Start Menu
echo.
echo Launching JONANDA MAIL now...
start "" "%INSTALL_DIR%\JonandaMail.bat"
exit

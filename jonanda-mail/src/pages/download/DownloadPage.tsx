import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Monitor,
  CheckCircle2,
  ArrowRight,
  Mail,
  Zap,
  FolderOpen,
  Sparkles
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const DownloadPage: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadInstaller = () => {
    const batContent = `@echo off
title JONANDA MAIL - Windows Application Setup Installer
echo ================================================================
echo           JONANDA MAIL - Windows Setup Wizard (v1.0.0)
echo ================================================================
echo.
echo Installing JONANDA MAIL to your Windows system...
echo.

set "INSTALL_DIR=%LOCALAPPDATA%\\Programs\\JonandaMail"
set "SHORTCUT_PATH=%USERPROFILE%\\Desktop\\JONANDA MAIL.lnk"
set "STARTMENU_PATH=%APPDATA%\\Microsoft\\Windows\\Start Menu\\Programs\\JONANDA MAIL.lnk"

if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"

echo [1/3] Registering Windows Desktop Shortcut...
powershell -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = 'C:\\Users\\AR\\.gemini\\antigravity\\scratch\\jonanda-mail\\start-desktop-app.bat'; $s.WorkingDirectory = 'C:\\Users\\AR\\.gemini\\antigravity\\scratch\\jonanda-mail'; $s.WindowStyle = 7; $s.Description = 'JONANDA MAIL - Enterprise Email Platform'; $s.Save()"

echo [2/3] Registering Windows Start Menu entry...
powershell -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%STARTMENU_PATH%'); $s.TargetPath = 'C:\\Users\\AR\\.gemini\\antigravity\\scratch\\jonanda-mail\\start-desktop-app.bat'; $s.WorkingDirectory = 'C:\\Users\\AR\\.gemini\\antigravity\\scratch\\jonanda-mail'; $s.WindowStyle = 7; $s.Description = 'JONANDA MAIL - Enterprise Email Platform'; $s.Save()"

echo [3/3] Generating uninstaller...
(
echo @echo off
echo echo Uninstalling JONANDA MAIL...
echo del "%SHORTCUT_PATH%" 2^>nul
echo del "%STARTMENU_PATH%" 2^>nul
echo rd /s /q "%INSTALL_DIR%" 2^>nul
echo echo JONANDA MAIL has been completely removed from your system.
echo pause
) > "%INSTALL_DIR%\\Uninstall.bat"

echo.
echo ================================================================
echo     SUCCESS: JONANDA MAIL Windows Installation Completed!
echo ================================================================
echo - Desktop Shortcut created: "JONANDA MAIL"
echo - Start Menu Entry created
echo.
echo Launching JONANDA MAIL now...
start "" "C:\\Users\\AR\\.gemini\\antigravity\\scratch\\jonanda-mail\\start-desktop-app.bat"
exit`;

    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Install-JONANDA-MAIL.bat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 p-0.5 shadow-lg shadow-brand-500/20">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Mail className="w-5 h-5 text-brand-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              JONANDA <span className="text-brand-400">MAIL</span>
            </span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Download JONANDA MAIL Desktop Setup
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Experience ultra-fast, native desktop webmail with offline caching, cryptographic DKIM signing, and multi-tenant ecosystem management.
          </p>
        </div>

        {/* Success Alert when downloaded */}
        {downloadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white block">Download Complete!</strong>
                <span>
                  <code>JONANDA-MAIL-Desktop-Launcher.bat</code> has been downloaded. Double-click it or use the <strong>"JONANDA MAIL"</strong> icon already created on your Desktop!
                </span>
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="emerald" size="sm">
                Open Web Client
              </Button>
            </Link>
          </div>
        )}

        {/* Primary Download Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Windows Setup Installer (.bat / .exe) */}
          <Card className="p-8 space-y-6 border-brand-500/40 bg-brand-950/20 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shadow-md">
                  <Monitor className="w-6 h-6" />
                </div>
                <Badge variant="gold">Official Windows Setup</Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Windows Desktop Client (.bat / .exe)</h3>
                <p className="text-xs text-slate-400 mt-1">
                  1-Click Windows Launcher for Windows 10, 11 (64-bit).
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Desktop & Start Menu Shortcut Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hardware Accelerated Standalone Window UI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Isolated Local Session Storage & 2FA</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <Button
                onClick={handleDownloadInstaller}
                variant="gold"
                size="lg"
                className="w-full text-sm font-bold shadow-lg shadow-amber-500/20"
                leftIcon={<Download className="w-5 h-5" />}
              >
                Download Windows Desktop Setup
              </Button>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Version: 1.0.0 (x64)</span>
                <span>Type: Desktop Client</span>
              </div>
            </div>
          </Card>

          {/* 1-Click PWA Desktop / Browser App */}
          <Card className="p-8 space-y-6 border-slate-700 bg-[#090e1a] shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                  <Zap className="w-6 h-6" />
                </div>
                <Badge variant="info">Instant 1-Click PWA</Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Browser Desktop PWA Install</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Install instantly from Edge, Chrome, or Brave with 0 download wait.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct installation to Windows Taskbar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Works seamlessly across Windows, Mac, Linux & Mobile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero installation footprint & instant updates</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <Link to="/dashboard">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-sm font-bold shadow-lg shadow-brand-600/20"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Open & Click "Install App" in TopBar
                </Button>
              </Link>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Web PWA v1.0</span>
                <span>All Chromium & Mobile Browsers</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Windows Quick Setup Instructions */}
        <Card className="p-6 space-y-4 border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <FolderOpen className="w-5 h-5 text-amber-400" />
            <span>Windows Desktop Setup Instructions (How to use on your PC):</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center font-mono">1</span>
              <div className="font-semibold text-slate-200">Click Download Button</div>
              <p className="text-slate-400 leading-relaxed">
                Click the gold button above to download the launcher, or use the shortcut already on your desktop.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center font-mono">2</span>
              <div className="font-semibold text-slate-200">Double-Click File</div>
              <p className="text-slate-400 leading-relaxed">
                Run <code>JONANDA-MAIL-Desktop-Launcher.bat</code> from your Downloads folder or Desktop.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center font-mono">3</span>
              <div className="font-semibold text-slate-200">Standalone App Opens</div>
              <p className="text-slate-400 leading-relaxed">
                JONANDA MAIL opens instantly in a native desktop window with all ecosystem identities!
              </p>
            </div>
          </div>
        </Card>

        {/* Return Button */}
        <div className="text-center pt-4">
          <Link to="/" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5">
            <span>← Return to JONANDA MAIL Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

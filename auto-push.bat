@echo off
echo ========================================
echo    AUTOMATICALLY PUSHING TO GITHUB
echo ========================================
echo.

echo Installing Git...
winget install Git.Git --accept-package-agreements --accept-source-agreements --silent

echo Waiting for installation...
timeout /t 15 /nobreak >nul

echo Refreshing PATH...
set PATH=%PATH%;C:\Program Files\Git\bin

echo Checking Git...
git --version
if errorlevel 1 (
    echo Git not found, trying alternative path...
    set PATH=%PATH%;C:\Program Files (x86)\Git\bin
    git --version
    if errorlevel 1 (
        echo Git installation failed. Please install manually.
        pause
        exit /b 1
    )
)

echo.
echo ✅ Git is working!
echo.

echo 📁 Initializing Git repository...
git init

echo 📝 Adding files to Git...
git add .

echo 💾 Committing files...
git commit -m "Initial commit - Professional IPTV website"

echo 🌿 Setting main branch...
git branch -M main

echo 🔗 Adding remote origin...
git remote add origin https://github.com/abeljunior4114-wq/trustnet.git

echo 🚀 Pushing to GitHub...
echo You will be prompted to login to GitHub...
git push -u origin main

echo.
echo 🎉 SUCCESS! Your code has been pushed to GitHub!
echo Your website will be live at: https://abeljunior4114-wq.github.io/trustnet
echo.
pause


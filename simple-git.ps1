# Simple Git Push Script
Write-Host "🚀 AUTOMATICALLY PUSHING YOUR CODE TO GITHUB..." -ForegroundColor Green

# Check if files exist
$files = @("index.html", "styles.css", "script.js", "README.md")
foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        Write-Host "❌ Missing file: $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ All files found!" -ForegroundColor Green

# Try to find Git
$gitExe = "git.exe"
if (-not (Get-Command $gitExe -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git not found. Installing Git..." -ForegroundColor Yellow
    winget install Git.Git --accept-package-agreements --accept-source-agreements --silent
    Start-Sleep -Seconds 15
    $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
}

# Check if Git is now available
if (-not (Get-Command $gitExe -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git still not found. Please install Git manually." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git found!" -ForegroundColor Green

# Git commands
Write-Host "📁 Initializing Git repository..." -ForegroundColor Cyan
git init

Write-Host "📝 Adding files to Git..." -ForegroundColor Cyan
git add .

Write-Host "💾 Committing files..." -ForegroundColor Cyan
git commit -m "Initial commit - Professional IPTV website"

Write-Host "🌿 Setting main branch..." -ForegroundColor Cyan
git branch -M main

Write-Host "🔗 Adding remote origin..." -ForegroundColor Cyan
git remote add origin https://github.com/abeljunior4114-wq/trustnet.git

Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "You will be prompted to login to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "🎉 SUCCESS! Your code has been pushed to GitHub!" -ForegroundColor Green

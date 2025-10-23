# Auto Git Push Script
Write-Host "🚀 AUTOMATICALLY PUSHING YOUR CODE TO GITHUB..." -ForegroundColor Green

# Check if files exist
$files = @("index.html", "styles.css", "script.js", "README.md")
$missingFiles = @()

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ Missing files: $($missingFiles -join ', ')" -ForegroundColor Red
    exit 1
}

Write-Host "✅ All files found!" -ForegroundColor Green

# Try to find Git
$gitPaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "git.exe"
)

$gitExe = $null
foreach ($path in $gitPaths) {
    if (Test-Path $path) {
        $gitExe = $path
        break
    }
}

if (-not $gitExe) {
    Write-Host "❌ Git not found. Installing Git..." -ForegroundColor Yellow
    
    # Try to install Git using winget
    try {
        winget install Git.Git --accept-package-agreements --accept-source-agreements --silent
        Start-Sleep -Seconds 10
        
        # Refresh PATH
        $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
        
        # Try to find Git again
        foreach ($path in $gitPaths) {
            if (Test-Path $path) {
                $gitExe = $path
                break
            }
        }
    }
    catch {
        Write-Host "❌ Could not install Git automatically" -ForegroundColor Red
        Write-Host "Please install Git manually from: https://git-scm.com/download/win" -ForegroundColor Yellow
        exit 1
    }
}

if (-not $gitExe) {
    Write-Host "❌ Git still not found. Please install Git manually." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git found at: $gitExe" -ForegroundColor Green

# Initialize Git repository
Write-Host "📁 Initializing Git repository..." -ForegroundColor Cyan
& $gitExe init

# Add all files
Write-Host "📝 Adding files to Git..." -ForegroundColor Cyan
& $gitExe add .

# Commit files
Write-Host "💾 Committing files..." -ForegroundColor Cyan
& $gitExe commit -m "Initial commit - Professional IPTV website"

# Set main branch
Write-Host "🌿 Setting main branch..." -ForegroundColor Cyan
& $gitExe branch -M main

# Add remote origin
Write-Host "🔗 Adding remote origin..." -ForegroundColor Cyan
& $gitExe remote add origin https://github.com/abeljunior4114-wq/trustnet.git

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "You will be prompted to login to GitHub..." -ForegroundColor Yellow
& $gitExe push -u origin main

Write-Host "🎉 SUCCESS! Your code has been pushed to GitHub!" -ForegroundColor Green
Write-Host "Your website will be live at: https://abeljunior4114-wq.github.io/trustnet" -ForegroundColor Cyan
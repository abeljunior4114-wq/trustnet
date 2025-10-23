# PowerShell script to push files to GitHub
param(
    [string]$RepoOwner = "abeljunior4114-wq",
    [string]$RepoName = "trustnet"
)

Write-Host "🚀 Pushing your IPTV website to GitHub..." -ForegroundColor Green
Write-Host "Repository: https://github.com/$RepoOwner/$RepoName" -ForegroundColor Cyan

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

# Create a simple batch file for manual upload
$batchContent = @"
@echo off
echo ========================================
echo    UPLOAD TO GITHUB - STEP BY STEP
echo ========================================
echo.
echo 1. Go to: https://github.com/$RepoOwner/$RepoName
echo 2. Click "Add file" ^> "Upload files"
echo 3. Drag these files into the upload area:
echo    - index.html
echo    - styles.css
echo    - script.js
echo    - README.md
echo 4. Scroll down and add commit message:
echo    "Initial commit - Professional IPTV website"
echo 5. Click "Commit changes"
echo.
echo Your website will be live at:
echo https://$RepoOwner.github.io/$RepoName
echo.
echo Press any key to open GitHub...
pause
start https://github.com/$RepoOwner/$RepoName
"@

$batchContent | Out-File -FilePath "upload-steps.bat" -Encoding ASCII

Write-Host "📝 Created upload-steps.bat for easy upload!" -ForegroundColor Yellow
Write-Host "🎯 Your website files are ready to upload!" -ForegroundColor Green
Write-Host ""
Write-Host "QUICK STEPS:" -ForegroundColor Cyan
Write-Host "1. Run: .\upload-steps.bat" -ForegroundColor White
Write-Host "2. Follow the instructions" -ForegroundColor White
Write-Host "3. Your site will be live!" -ForegroundColor White
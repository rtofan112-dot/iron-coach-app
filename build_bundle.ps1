$dir = $PSScriptRoot
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# 1. Automatic Pre-Build Integrity & Syntax Verification
$nodePath = "C:\Users\r.tofan\.gemini\antigravity\scratch\node\node-v20.11.1-win-x64\node.exe"
if (Test-Path $nodePath) {
    Write-Host "Running automated pre-build test suite..."
    & $nodePath "$dir\verify_build.js"
    if ($LASTEXITCODE -ne 0) {
        Write-Error "CRITICAL BUILD ERROR: Pre-build verification failed! Build aborted to prevent deploying broken code."
        exit 1
    }
}

$html = [System.IO.File]::ReadAllText("$dir\index.html", [System.Text.Encoding]::UTF8)
$css = [System.IO.File]::ReadAllText("$dir\styles.css", [System.Text.Encoding]::UTF8)
$js = [System.IO.File]::ReadAllText("$dir\app.js", [System.Text.Encoding]::UTF8)

$bundle = $html.Replace('<link rel="stylesheet" href="styles.css">', "<style>`n$css`n</style>")
$bundle = $bundle.Replace('<script src="app.js"></script>', "<script>`nif(window.Telegram&&window.Telegram.WebApp){window.Telegram.WebApp.ready();window.Telegram.WebApp.expand();}`n$js`n</script>")

[System.IO.File]::WriteAllText("$dir\bundle.html", $bundle, $utf8NoBom)

# Verify bundle.html itself
if (Test-Path $nodePath) {
    & $nodePath -e "
    const fs = require('fs');
    const vm = require('vm');
    const b = fs.readFileSync('$($dir.Replace('\', '\\'))\\bundle.html', 'utf8');
    const lastScriptStart = b.lastIndexOf('<script>');
    const lastScriptEnd = b.lastIndexOf('</script>');
    if (lastScriptStart !== -1 && lastScriptEnd > lastScriptStart) {
        const code = b.substring(lastScriptStart + 8, lastScriptEnd);
        new vm.Script(code);
        console.log('PASS: bundle.html main script verified cleanly!');
    } else {
        throw new Error('Main script block not found in bundle.html');
    }
    "
    if ($LASTEXITCODE -ne 0) {
        Write-Error "CRITICAL BUILD ERROR: bundle.html verification failed! Build aborted."
        exit 1
    }
}

$b64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($bundle))

$workerTemplate = [System.IO.File]::ReadAllText("$dir\worker.template.js", [System.Text.Encoding]::UTF8)
$workerCode = $workerTemplate.Replace('__B64_APP_PLACEHOLDER__', $b64)

[System.IO.File]::WriteAllText("$dir\worker.js", $workerCode, $utf8NoBom)
Write-Host "SUCCESS: Bundle & worker.js created with clean UTF-8! Worker size: " $workerCode.Length

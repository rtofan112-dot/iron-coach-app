$dir = 'C:\Users\r.tofan\.gemini\antigravity\scratch\asutp-fitness-app'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$html = [System.IO.File]::ReadAllText("$dir\index.html", [System.Text.Encoding]::UTF8)
$css = [System.IO.File]::ReadAllText("$dir\styles.css", [System.Text.Encoding]::UTF8)
$js = [System.IO.File]::ReadAllText("$dir\app.js", [System.Text.Encoding]::UTF8)

$bundle = $html.Replace('<link rel="stylesheet" href="styles.css">', "<style>`n$css`n</style>")
$bundle = $bundle.Replace('<script src="app.js"></script>', "<script src=`"https://telegram.org/js/telegram-web-app.js`"></script>`n<script>`nif(window.Telegram&&window.Telegram.WebApp){window.Telegram.WebApp.ready();window.Telegram.WebApp.expand();}`n$js`n</script>")

[System.IO.File]::WriteAllText("$dir\bundle.html", $bundle, $utf8NoBom)

$b64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($bundle))

$workerTemplate = [System.IO.File]::ReadAllText("$dir\worker.template.js", [System.Text.Encoding]::UTF8)
$workerCode = $workerTemplate.Replace('__B64_APP_PLACEHOLDER__', $b64)

[System.IO.File]::WriteAllText("$dir\worker.js", $workerCode, $utf8NoBom)
Write-Host "Bundle & worker.js created with clean UTF-8! Worker size: " $workerCode.Length

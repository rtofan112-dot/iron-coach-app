param([int]$Port = 8080)

$appDir = "C:\Users\r.tofan\.gemini\antigravity\scratch\asutp-fitness-app"
$dataFile = Join-Path $appDir "state.json"

if (!(Test-Path $dataFile)) {
    "{}" | Set-Content -Path $dataFile -Encoding UTF8
}

$tcp = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $Port)
$tcp.Start()

Write-Host "=========================================================="
Write-Host " 🦾 ASU-TP Iron Coach - Local Cloud Sync Server Active"
Write-Host "----------------------------------------------------------"
Write-Host " 📱 Ссылка для телефона (в одной сети Wi-Fi/LAN):"
Write-Host "    👉 http://192.168.12.9:$Port"
Write-Host " 💻 Ссылка на этом ПК:"
Write-Host "    👉 http://localhost:$Port"
Write-Host "=========================================================="

while ($true) {
    try {
        $client = $tcp.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
        $writer = New-Object System.IO.BinaryWriter($stream)

        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($requestLine)) {
            $client.Close()
            continue
        }

        $parts = $requestLine.Split(' ')
        $method = $parts[0]
        $rawPath = if ($parts.Length -gt 1) { $parts[1] } else { "/" }
        $path = $rawPath.Split('?')[0]

        $contentLength = 0
        while ($true) {
            $headerLine = $reader.ReadLine()
            if ([string]::IsNullOrEmpty($headerLine)) { break }
            if ($headerLine.ToLower().StartsWith("content-length:")) {
                $contentLength = [int]($headerLine.Split(':')[1].Trim())
            }
        }

        $body = ""
        if ($method -eq "POST" -and $contentLength -gt 0) {
            $buffer = New-Object char[] $contentLength
            $readTotal = 0
            while ($readTotal -lt $contentLength) {
                $r = $reader.Read($buffer, $readTotal, $contentLength - $readTotal)
                if ($r -le 0) { break }
                $readTotal += $r
            }
            $body = New-Object string ($buffer, 0, $readTotal)
        }

        if ($path -eq "/api/state") {
            if ($method -eq "GET") {
                $stateContent = [System.IO.File]::ReadAllText($dataFile, [System.Text.Encoding]::UTF8)
                if ([string]::IsNullOrWhiteSpace($stateContent)) { $stateContent = "{}" }
                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($stateContent)
                
                $header = "HTTP/1.1 200 OK`r`n" +
                          "Content-Type: application/json; charset=utf-8`r`n" +
                          "Content-Length: $($bodyBytes.Length)`r`n" +
                          "Access-Control-Allow-Origin: *`r`n" +
                          "Connection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $writer.Write($headerBytes)
                $writer.Write($bodyBytes)
            }
            elseif ($method -eq "POST") {
                if (![string]::IsNullOrEmpty($body)) {
                    [System.IO.File]::WriteAllText($dataFile, $body, [System.Text.Encoding]::UTF8)
                }
                $reply = '{"status":"synced"}'
                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($reply)
                $header = "HTTP/1.1 200 OK`r`n" +
                          "Content-Type: application/json; charset=utf-8`r`n" +
                          "Content-Length: $($bodyBytes.Length)`r`n" +
                          "Access-Control-Allow-Origin: *`r`n" +
                          "Connection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $writer.Write($headerBytes)
                $writer.Write($bodyBytes)
            }
            else {
                $header = "HTTP/1.1 200 OK`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, POST, OPTIONS`r`nAccess-Control-Allow-Headers: Content-Type`r`nContent-Length: 0`r`nConnection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $writer.Write($headerBytes)
            }
        }
        else {
            $fileName = if ($path -eq "/" -or $path -eq "") { "index.html" } else { $path.TrimStart('/') }
            $filePath = Join-Path $appDir $fileName

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".svg"  { "image/svg+xml" }
                    ".png"  { "image/png" }
                    default { "application/octet-stream" }
                }
                $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                $header = "HTTP/1.1 200 OK`r`n" +
                          "Content-Type: $mime`r`n" +
                          "Content-Length: $($fileBytes.Length)`r`n" +
                          "Access-Control-Allow-Origin: *`r`n" +
                          "Connection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $writer.Write($headerBytes)
                $writer.Write($fileBytes)
            }
            else {
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $header = "HTTP/1.1 404 Not Found`r`nContent-Length: $($notFound.Length)`r`nConnection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                $writer.Write($headerBytes)
                $writer.Write($notFound)
            }
        }

        $writer.Flush()
        $client.Close()
    }
    catch {
        # Ignore client disconnect
    }
}

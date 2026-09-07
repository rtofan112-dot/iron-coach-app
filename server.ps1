$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:8888/")
$listener.Start()
Write-Host "Listening..."
for ($i=0; $i -lt 3; $i++) {
    $context = $listener.GetContext()
    $req = $context.Request
    $reader = New-Object System.IO.StreamReader($req.InputStream)
    $body = $reader.ReadToEnd()
    Write-Host "LOG RECEIVED: $body"
    
    $res = $context.Response
    $res.StatusCode = 200
    $res.Close()
}
$listener.Stop()
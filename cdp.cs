using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading;

class Program {
    static async Task Main() {
        string profileDir = Path.Combine(Environment.CurrentDirectory, "temp_cdp_profile_v292");
        if (Directory.Exists(profileDir)) Directory.Delete(profileDir, true);

        Process edge = new Process();
        edge.StartInfo.FileName = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
        string bundlePath = Path.Combine(Environment.CurrentDirectory, "bundle.html");
        edge.StartInfo.Arguments = $"--remote-debugging-port=9223 --user-data-dir=\"{profileDir}\" --headless --disable-gpu \"file:///{bundlePath.Replace("\\", "/")}\"";
        edge.Start();

        await Task.Delay(3000);

        using (HttpClient client = new HttpClient()) {
            string json = await client.GetStringAsync("http://127.0.0.1:9223/json");
            using (JsonDocument doc = JsonDocument.Parse(json)) {
                string wsUrl = "";
                foreach (JsonElement el in doc.RootElement.EnumerateArray()) {
                    if (el.GetProperty("type").GetString() == "page") {
                        wsUrl = el.GetProperty("webSocketDebuggerUrl").GetString();
                        break;
                    }
                }

                if (string.IsNullOrEmpty(wsUrl)) {
                    Console.WriteLine("Could not find WebSocket URL.");
                    edge.Kill();
                    return;
                }

                using (ClientWebSocket ws = new ClientWebSocket()) {
                    await ws.ConnectAsync(new Uri(wsUrl), CancellationToken.None);
                    
                    var enableRuntime = new { id = 1, method = "Runtime.enable" };
                    var enableLog = new { id = 2, method = "Log.enable" };
                    
                    await SendMsg(ws, enableRuntime);
                    await SendMsg(ws, enableLog);
                    
                    Console.WriteLine("Waiting for errors...");
                    
                    byte[] buffer = new byte[8192];
                    CancellationTokenSource cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
                    
                    try {
                        while (!cts.IsCancellationRequested) {
                            var result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), cts.Token);
                            string msg = Encoding.UTF8.GetString(buffer, 0, result.Count);
                            if (msg.Contains("Runtime.exceptionThrown") || msg.Contains("Runtime.consoleAPICalled")) {
                                Console.WriteLine(msg);
                            }
                        }
                    } catch {}
                }
            }
        }
        edge.Kill();
    }
    
    static async Task SendMsg(ClientWebSocket ws, object obj) {
        string json = JsonSerializer.Serialize(obj);
        await ws.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(json)), WebSocketMessageType.Text, true, CancellationToken.None);
    }
}
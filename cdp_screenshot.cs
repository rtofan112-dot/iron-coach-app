using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Net.WebSockets;
using System.Threading;

class Program {
    static void Main() {
        Run().Wait();
    }
    
    static async Task Run() {
        string profileDir = Path.Combine(Environment.CurrentDirectory, "temp_cdp_profile_v292_screenshot");
        if (Directory.Exists(profileDir)) Directory.Delete(profileDir, true);

        Process edge = new Process();
        edge.StartInfo.FileName = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
        string bundlePath = Path.Combine(Environment.CurrentDirectory, "bundle.html").Replace("\\", "/");
        edge.StartInfo.Arguments = String.Format("--remote-debugging-port=9223 --user-data-dir=\"{0}\" --headless --disable-gpu \"file:///{1}\"", profileDir, bundlePath);
        edge.Start();

        await Task.Delay(4000);

        using (HttpClient client = new HttpClient()) {
            string json = await client.GetStringAsync("http://127.0.0.1:9223/json");
            string wsUrl = "";
            int idx = json.IndexOf("\"webSocketDebuggerUrl\":\"ws://");
            if (idx > 0) {
                int start = idx + 24;
                int end = json.IndexOf("\"", start);
                wsUrl = json.Substring(start, end - start);
            }

            if (string.IsNullOrEmpty(wsUrl)) {
                edge.Kill(); return;
            }

            using (ClientWebSocket ws = new ClientWebSocket()) {
                await ws.ConnectAsync(new Uri(wsUrl), CancellationToken.None);
                
                string capture = "{\"id\":1,\"method\":\"Page.captureScreenshot\",\"params\":{\"format\":\"png\"}}";
                await SendMsg(ws, capture);
                
                byte[] buffer = new byte[8 * 1024 * 1024];
                CancellationTokenSource cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
                
                var sb = new StringBuilder();
                try {
                    while (!cts.IsCancellationRequested) {
                        var result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), cts.Token);
                        sb.Append(Encoding.UTF8.GetString(buffer, 0, result.Count));
                        if (result.EndOfMessage) {
                            string msg = sb.ToString();
                            if (msg.Contains("\"id\":1")) {
                                int dataIdx = msg.IndexOf("\"data\":\"") + 8;
                                int dataEnd = msg.IndexOf("\"", dataIdx);
                                string b64 = msg.Substring(dataIdx, dataEnd - dataIdx);
                                File.WriteAllBytes("screenshot.png", Convert.FromBase64String(b64));
                                Console.WriteLine("Screenshot saved.");
                                break;
                            }
                            sb.Clear();
                        }
                    }
                } catch {}
            }
        }
        edge.Kill();
    }
    
    static async Task SendMsg(ClientWebSocket ws, string json) {
        await ws.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(json)), WebSocketMessageType.Text, true, CancellationToken.None);
    }
}
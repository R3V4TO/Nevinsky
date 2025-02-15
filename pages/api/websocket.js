export default function handler(req, res) {
    if (!res.socket.server.ws) {
      const { Server } = require("ws");
      const wss = new Server({ server: res.socket.server });
  
      wss.on("connection", (ws) => {
        console.log("WebSocket connected");
  
        // Send real-time energy data
        setInterval(() => {
          const energyUsage = Math.floor(Math.random() * 100) + 50;
          ws.send(JSON.stringify({ energyUsage }));
        }, 5000);
      });
  
      res.socket.server.ws = wss;
    }
  
    res.end();
  }
  
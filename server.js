import { WebSocketServer } from "ws";
import { MongoClient } from "mongodb";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async () => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("energyDB");
    const data = await db.collection("energyRecords").find().toArray();
    client.close();

    ws.send(JSON.stringify(data));
  });

  ws.on("close", () => console.log("Client disconnected"));
});

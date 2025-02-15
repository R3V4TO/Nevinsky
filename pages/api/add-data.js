import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Make sure this is set in your .env.local file

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("energyDB");
    const collection = db.collection("energyRecords");

    // Extract form data from the request body
    const { voltageLine, voltagePhase, buildingNumber } = req.body;

    if (!voltageLine || !voltagePhase || !buildingNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert data into MongoDB
    await collection.insertOne({
      voltageLine,
      voltagePhase,
      buildingNumber,
      timestamp: new Date(),
    });

    client.close();
    return res.redirect("/"); // Redirect to home after submission
  } catch (error) {
    return res.status(500).json({ error: "Failed to add data" });
  }
}

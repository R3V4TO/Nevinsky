import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { energyData } = req.body;

    const gpt4allResponse = await axios.post(
      process.env.GPT4ALL_API_URL, // Local GPT4ALL API URL
      {
        model: "gpt4all", // GPT4ALL Model
        messages: [
          { role: "system", content: "Analyze energy usage and provide improvements." },
          { role: "user", content: `Here is the energy usage data: ${JSON.stringify(energyData)}` },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ analysis: gpt4allResponse.data.choices[0].message.content });
  } catch (error) {
    console.error("❌ GPT4ALL API error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze data." });
  }
}

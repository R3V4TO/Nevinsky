import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

async function testAPI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: "Test response from OpenAI API" }],
    });

    console.log("✅ OpenAI API is working!", response.choices[0].message.content);
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
  }
}

testAPI();

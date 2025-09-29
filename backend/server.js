import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json("Hello Numair, your API looks healthy!");
});

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. /api/ai/chat will return 500.");
}
const genAI = new GoogleGenerativeAI(apiKey || "");

app.post("/api/ai/chat", async (req, res) => {
  try {
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
    }
    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "'message' is required in body" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const systemPrompt =
      "You are AstroGuardian — the mission copilot. Be concise, safety-focused, and helpful.";

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: message }] }
      ]
    });

    const text = result.response?.text?.() || "";
    return res.status(200).json({ text });
  } catch (err) {
    console.error("/api/ai/chat error", err);
    return res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
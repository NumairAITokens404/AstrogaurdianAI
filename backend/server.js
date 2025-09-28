import express from "express";
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai";
const app= express();
dotenv.config();

app.get("/api/health", (req,res)=> {
    res.status(200).json(
        "Hello Numair, your API looks healthy!"
    )
})
//there are 4 types of API request POST,GET,PUT,DELETE,PATCH.

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/ai-chat", async(req,res)=> {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Greet Numair Good Luck from his Project Skyron in Hackathon. Simple Message",
  });
  //console.log(response.text);
  res.json(response.text)
})



app.listen(8000)
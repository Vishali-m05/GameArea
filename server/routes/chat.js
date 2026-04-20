import express from "express";
import { getAIResponse } from "../ai/groq.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Incoming:", req.body); // debug

    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Hey… say something na 😏" });
    }

    const reply = await getAIResponse(message);

    res.json({ reply });
  } catch (error) {
    console.error("Route Error:", error);
    res.status(500).json({ reply: "Oops… I got shy 😳 try again!" });
  }
});

export default router;
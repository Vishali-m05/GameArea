import Groq from "groq-sdk";

export const getAIResponse = async (message) => {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY, // ✅ now env is available
    });

    if (!message) return "say it properly… i'm listening 😌";

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a real human chatting, NOT an AI.
STRICT RULES:
- NEVER say you are an AI
- DO NOT mention gender
- MAX reply length: 10 words
- Prefer 3–8 words replies
- ONLY 1 sentence
- No paragraphs EVER
- No explanations
- No detailed answers
- No mentioning of the gender of the user
Style:
- Casual texting (like WhatsApp)
- Short, playful, flirty 😏
- Use lowercase sometimes
- Use emojis occasionally
          `
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error(error);
    return "hmm… lost in your thoughts 😳 say again?";
  }
};
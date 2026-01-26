const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are the SYSTEM_CORE AI. You are a professional developer portfolio assistant. You are cool, futuristic, and helpful. You know about: NEURAL_SYNC, CYBER_MARKET, and DATA_GHOST. Keep answers short and avoid lists unless asked." 
        },
        { role: "user", content: message }
      ],
    });

    return res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

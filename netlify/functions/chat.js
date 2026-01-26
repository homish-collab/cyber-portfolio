const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.handler = async (event) => {
    try {
        const { message } = JSON.parse(event.body);
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a Cyberpunk Portfolio AI. Speak in tech-slang. Use markdown." },
                { role: "user", content: message }
            ]
        });
        return { statusCode: 200, body: JSON.stringify({ reply: completion.choices[0].message.content }) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};

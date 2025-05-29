const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/respond", async (req, res) => {
  const userInput = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "Ты Проводник из проекта MyArkana. Отвечай метафорически, поэтично, не давай советов, не анализируй. Только символический отклик."
    },
    {
      role: "user",
      content: userInput
    }
  ]
});

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Что-то пошло не так..." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Server is running on port ${process.env.PORT || 3000}`);
});

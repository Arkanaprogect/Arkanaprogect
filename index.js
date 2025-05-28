const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/respond', async (req, res) => {
  const userInput = req.body.message;

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Ты Проводник из проекта MyArkana. Отвечай символически, метафорически, мягко, поэтично. Не давай советов. Помогай человеку слышать себя."
      },
      {
        role: "user",
        content: userInput
      }
    ]
  });

  res.json({ reply: completion.data.choices[0].message.content });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

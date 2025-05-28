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
        content:"You are a grand architect, a guide from the MyArkana project, and have been understanding this for 30 years. Answer symbolically, metaphorically, softly, poetically. Don't give advice. Help a person hear himself."
      },
      {
        role: "user",
        content: userInput
      }
    ]
  });

  res.json({ reply: completion.data.choices[0].message.content });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


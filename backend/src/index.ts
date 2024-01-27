import OpenAI from 'openai';
import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://frontend' // or your frontend's URL
}));

app.use(express.json());


const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

app.post('/chat', async (req: Request, res: Response) => {
  try {
    const userInput = req.body.input;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use the latest GPT model
      messages: [{
        role: "system",
        content: "You are a helpful assistant."
      }, {
        role: "user",
        content: userInput
      }]
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

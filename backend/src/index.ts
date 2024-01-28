import OpenAI from 'openai';
import express, { Request, Response } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import session from 'express-session';
import { Thread } from 'openai/resources/beta/threads/threads';
import { FileObject } from 'openai/resources';

declare module 'express-session' {
  export interface SessionData {
    thread: Thread;
    file: FileObject
  }
}

dotenv.config();
const app = express();
const port = 3000;
app.use(cors({
  origin: '*' // lazy
}));
app.use(session({
  secret: process.env.SESS_SECRET || 'thisisasecretpassword',
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false, // set to true if using https
      httpOnly: true
  }
}));
app.use(express.json());

// ----------------------
// some consts
// ----------------------
const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

// ----------------------
// endpoints
// ----------------------
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

// generate response
app.post('/interpret', upload.single('file'), async (req, res) => {
  let message; 
  if (!req.session.thread) {
    const thread = await openai.beta.threads.create();
    req.session.thread = thread; 
  }
  if (req.file) {
    const file = await openai.files.create({
      file: fs.createReadStream(req.file.path),
      purpose: "assistants",
    });
    req.session.file = file; 
    message = await openai.beta.threads.messages.create(
      req.session.thread.id,
      {
        role: "user",
        content: `I have attached a PDF of my medical report. Please help me interpret it. Additionally, here are the notes writen by my doctor:\n
        ${req.body.text}`,
        file_ids: [file.id]
      }
    );
  } else {
    message = await openai.beta.threads.messages.create(
      req.session.thread.id,
      {
        role: "user",
        content: `Please help me to interpret the following notes written by my doctor. Only tell me the things related to the diagnosis. You may use other unrelated information as context for understanding but filter it out of the diagnosis interpretation.\n
        ${req.body.text}`,
      }
    );
  }

  const result = message.content[0].type == 'text' ? message.content[0].text.value : 'Model did not return a text response' 
  res.send(result);
});

app.post('/simplify', async (req: Request, res: Response) => {
  if (!req.session.thread) return res.send('Genrate the report first');
  const message = await openai.beta.threads.messages.create(
    req.session.thread.id,
    {
      role: "user",
      content: `Please help me to further simplify the following\n
      ${req.body.text}`,
    }
  );
  const result = message.content[0].type == 'text' ? message.content[0].text.value : 'Model did not return a text response' 
  res.send(result);
});

app.post('/elaborate', async (req: Request, res: Response) => {
  if (!req.session.thread) return res.send('Genrate the report first');
  const message = await openai.beta.threads.messages.create(
    req.session.thread.id,
    {
      role: "user",
      content: `Please elaborate on what the following might mean.
      ${req.body.text}`,
    }
  );

  const result = message.content[0].type == 'text' ? message.content[0].text.value : 'Model did not return a text response' 
  res.send(result);
});

app.post('/reset', async (req: Request, res: Response) => {
  if (!req.session.file) return res.send("No file");
  const file = await openai.files.del(req.session.file.id);
  console.log(file);
  res.send(file.deleted);
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

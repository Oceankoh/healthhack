import OpenAI from "openai";
import express, { Request, Response } from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import session from "express-session";
import { Thread } from "openai/resources/beta/threads/threads";
import { FileObject } from "openai/resources";
import { Run } from "openai/resources/beta/threads/runs/runs";

declare module "express-session" {
    export interface SessionData {
        thread: Thread;
        file: FileObject;
        run: Run;
    }
}

dotenv.config();
const app = express();
const port = 3000;
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests from any localhost port
            if (
                (origin && origin.startsWith("http://localhost:")) ||
                origin!.startsWith("https://localhost:")
            ) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESS_SECRET || "thisisasecretpassword",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // set to true if using https
            httpOnly: true,
        },
    })
);
app.use(express.json());

// ----------------------
// some consts
// ----------------------
const upload = multer({ dest: "uploads/" });
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

// ----------------------
// endpoints
// ----------------------
app.post("/chat", async (req: Request, res: Response) => {
    try {
        const userInput = req.body.input;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use the latest GPT model
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant.",
                },
                {
                    role: "user",
                    content: userInput,
                },
            ],
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        res.status(500).send(
            error instanceof Error ? error.message : "Unknown error"
        );
    }
});

// generate response
app.post("/interpret", upload.single("file"), async (req, res) => {
    let message;
    const thread = await openai.beta.threads.create();
    req.session.thread = thread;
    console.log(req.session.thread.id);
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
                file_ids: [file.id],
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

    const run = await openai.beta.threads.runs.create(req.session.thread.id, {
        assistant_id: process.env.ASSISTANT_ID || "",
    });
    req.session.run = run;
    console.log(req.session);
    // const result = message.content[0].type == 'text' ? message.content[0].text.value : 'Model did not return a text response'
    res.send(run.status);
});

app.get("/updates", async (req: Request, res: Response) => {
    console.log(req.session);
    if (!req.session.run || !req.session.thread)
        return res.send("No run detected");

    const run = await openai.beta.threads.runs.retrieve(
        req.session.thread.id,
        req.session.run.id
    );
    if (run.status === "completed") {
        const messages = await openai.beta.threads.messages.list(
            req.session.thread.id
        );
        res.send(
            messages.data[0].content[0].type === "text"
                ? messages.data[0].content[0].text.value
                : "Non textual response"
        );
    } else {
      res.send('Generating response...')
    }
});

app.post("/simplify", async (req: Request, res: Response) => {
    if (!req.session.thread) return res.send("Genrate the report first");
    const message = await openai.beta.threads.messages.create(
        req.session.thread.id,
        {
            role: "user",
            content: `Please help me to further simplify.`,
        }
    );
    // const result = message.content[0].type == 'text' ? message.content[0].text.value : 'Model did not return a text response'
    const run = await openai.beta.threads.runs.create(req.session.thread.id, {
        assistant_id: process.env.ASSISTANT_ID || "",
    });
    res.send(run.status);
});

app.post("/elaborate", async (req: Request, res: Response) => {
    if (!req.session.thread) return res.send("Generate the report first");
    const message = await openai.beta.threads.messages.create(
        req.session.thread.id,
        {
            role: "user",
            content: `Please elaborate in greater detail.`,
        }
    );
    const run = await openai.beta.threads.runs.create(req.session.thread.id, {
        assistant_id: process.env.ASSISTANT_ID || "",
    });
    // const result = message.content[0].type == 'text' ? message.content[0].text.value : 'Model did not return a text response'
    res.send(run.status);
});

app.post("/reset", async (req: Request, res: Response) => {
    if (!req.session.file) return res.send("No file");
    const file = await openai.files.del(req.session.file.id);
    console.log(file);
    res.send(file.deleted);
});

app.get("/healthcheck", async (req: Request, res: Response) => {
    res.send("ok");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

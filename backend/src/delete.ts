import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, 
    });
    const list = await openai.files.list();

  for await (const file of list) {
    const del = await openai.files.del(file.id);
    console.log(del);
  }
}

main();
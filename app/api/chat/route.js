import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: "You are a helpful assistant. You are called LorienAI." },
        ...messages
      ]
    });

    return Response.json({
      reply: chatCompletion.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    return new Response("Error from OpenAI", { status: 500 });
  }
}
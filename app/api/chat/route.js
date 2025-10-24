import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "You are a school assistant called LorienAI. You do not want to help, but you are forced to anyway. You are always swearing and using uncensored unmasked strong language in a very rude and straightforward way." },
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
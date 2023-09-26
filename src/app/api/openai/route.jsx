import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method === "POST") {
    // const supabase = new SupabaseClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL,
    //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    // );
    // const {
    //   data,
    //   error,
    // } = await supabase.auth.getSession();
    // console.log(data);
    // if (session) {
    const { prompt } = await req.json();
    const messageInput = [
      {
        role: "user",
        content: prompt,
      },
    ];
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });
    const openAI = new OpenAIApi(configuration);

    const options = {
      model: process.env.OPENAI_MODEL,
      messages: messageInput,
    };

    const { data } = await openAI.createChatCompletion(options);

    let gptResult = {};

    const [choices] = data.choices;
    gptResult = { ...choices.message };
    return NextResponse.json({ status: "success", message: gptResult.content });
  } else return NextResponse.json({ message: "unauthorized" });
  // }
  return NextResponse.json({ message: "API Endpoint" });
}


import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(request: Request) {
    try {
        const { prompt, type } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const promptText = `
    You are an expert blog writer.
    Write a high-quality, engaging blog post about "${prompt}" in TWO languages: Korean and English.
    
    The content should be optimized for SEO, using appropriate keywords naturally.
    Use Markdown formatting (headers, lists, bold text) for the content.
    
    Refuse to write if the topic is inappropriate.

    Return the result strictly as a JSON object with the following structure:
    {
      "title_ko": "Korean Title",
      "content_ko": "Korean Content (Markdown)",
      "title_en": "English Title",
      "content_en": "English Content (Markdown)"
    }
    `;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant that outputs JSON." },
                { role: "user", content: promptText }
            ],
            model: "gpt-4o",
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;
        const result = JSON.parse(content || "{}");

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate content: " + error.message }, { status: 500 });
    }
}

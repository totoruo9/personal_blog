import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { articles, keyword } = await request.json();

        if (!articles || !Array.isArray(articles) || articles.length === 0) {
            return NextResponse.json({ error: "No articles provided" }, { status: 400 });
        }

        // Prepare context for AI
        const context = articles.map((a, i) =>
            `\n---\nArticle ${i + 1}:\nTitle: ${a.title}\nSource: ${a.source}\nLink: ${a.link}\nContent:\n${a.content}\n---\n`
        ).join('');

        const systemPrompt = `
You are an expert tech and lifestyle investment blogger for "The Managegram". 
Your tone is professional yet accessible, insightful, and data-driven.
You are writing a blog post about "${keyword}" based on the provided news articles.

Requirements:
1.  **Title**: Catchy and SEO-optimized Korean title.
2.  **Structure**: Introduction, Key Points (Findings), Insight/Opinion, Conclusion.
3.  **Language**: Korean (fluent, natural).
4.  **Format**: Markdown.
5.  **Citations**: YOU MUST include a "References" (참고 자료) section at the very bottom with markdown links to the source articles provided. 
    Format: - [Title](Link) - Source name
6.  **Content**: Synthesize the information. Do not just summarize. Add value by connecting dots or predicting implications.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o", // or "gpt-3.5-turbo" if cost is concern
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Here is the research material related to "${keyword}". Write a comprehensive blog post.\n\n${context}` }
            ],
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;

        return NextResponse.json({ content });

    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json(
            { error: "Failed to generate content", details: String(error) },
            { status: 500 }
        );
    }
}

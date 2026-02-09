import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const parser = new Parser();
        const feedUrl = 'https://trends.google.com/trending/rss?geo=KR';
        const feed = await parser.parseURL(feedUrl);

        // Extract relevant data
        const trends = feed.items.slice(0, 10).map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            traffic: item.contentSnippet, // Sometimes traffic info is here or in custom fields
        }));

        return NextResponse.json({ trends });
    } catch (error) {
        console.error("Error fetching Google Trends:", error);
        return NextResponse.json(
            { error: "Failed to fetch trends", details: String(error) },
            { status: 500 }
        );
    }
}

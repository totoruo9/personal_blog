import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

// Custom parser to include content fields
const parser = new Parser({
    customFields: {
        item: ['content:encoded', 'description', 'source']
    }
});

export async function POST(request: Request) {
    try {
        const { keyword } = await request.json();

        if (!keyword) {
            return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
        }

        // Google News RSS URL for Korean region
        const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ko&gl=KR&ceid=KR:ko`;
        console.log(`Fetching RSS: ${feedUrl}`);

        let feed;
        try {
            feed = await parser.parseURL(feedUrl);
        } catch (rssError) {
            console.error("RSS Parsing Error:", rssError);
            return NextResponse.json({
                error: "Failed to fetch Google News RSS",
                details: String(rssError)
            }, { status: 500 });
        }

        const items = feed.items.slice(0, 10); // Get up to 10 articles

        if (items.length === 0) {
            return NextResponse.json({
                error: "No news articles found for this keyword"
            }, { status: 404 });
        }

        // Use RSS content directly - no scraping needed
        const articles = items.map((item: any, idx: number) => {
            // Google News RSS provides content in various fields
            let content = '';

            // Try different content sources
            if (item['content:encoded']) {
                content = item['content:encoded'];
            } else if (item.content) {
                content = item.content;
            } else if (item.contentSnippet) {
                content = item.contentSnippet;
            } else if (item.description) {
                content = item.description;
            } else if (item.summary) {
                content = item.summary;
            }

            // Clean HTML tags
            content = content.replace(/<[^>]*>/g, '').trim();

            // Extract source from title (Google News format: "Title - Source")
            let source = 'News';
            if (item.title && item.title.includes(' - ')) {
                const parts = item.title.split(' - ');
                source = parts[parts.length - 1];
            }

            return {
                title: item.title || `Article ${idx + 1}`,
                link: item.link || '',
                pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
                source: source,
                content: content || 'No content available'
            };
        }).filter((article: any) => article.content.length > 10); // Minimal filter

        if (articles.length === 0) {
            return NextResponse.json({
                error: "Could not extract content from articles. Please try a different keyword."
            }, { status: 404 });
        }

        console.log(`Successfully fetched ${articles.length} articles for "${keyword}"`);
        return NextResponse.json({ articles });

    } catch (error) {
        console.error("Error in scrape route:", error);
        return NextResponse.json(
            { error: "Failed to process articles", details: String(error) },
            { status: 500 }
        );
    }
}

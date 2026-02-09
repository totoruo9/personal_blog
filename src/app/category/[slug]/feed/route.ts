import { getPostsByCategory } from "@/lib/posts";

// Map English slugs to Korean category names (Shared with page.tsx, could be moved to utils)
const CATEGORY_MAP: Record<string, string> = {
    "travel-food": "여행·맛집",
    "living-style": "리빙·스타일",
    "family-love": "가족·연애",
    "work-self-improvement": "직장·자기계발",
    "social-knowledge": "시사·지식",
    "money-story": "머니스토리",
    "all": "전체",
};

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const categoryName = CATEGORY_MAP[decodedSlug] || decodedSlug;

    // Fetch posts for this category
    const { data: posts } = await getPostsByCategory(categoryName, 1, 20); // Limit to 20 for RSS

    const siteUrl = "https://revenue-blog-demo.vercel.app"; // Replace with actual domain 
    // Or use request.headers.get('host') if cleaner, but hardcoded is safer for RSS vs Proxy

    // Construct RSS XML
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>The Managegram - ${categoryName}</title>
  <link>${siteUrl}/category/${slug}</link>
  <description>Latest posts from ${categoryName} category</description>
  <language>ko</language>
  ${posts.map(post => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${siteUrl}/posts/${post.slug}</link>
    <guid>${siteUrl}/posts/${post.slug}</guid>
    <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
    <description><![CDATA[${post.content.replace(/<[^>]*>/g, '').substring(0, 300)}...]]></description>
  </item>`).join('')}
</channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            // Cache control for 1 hour
            "Cache-Control": "public, max-age=3600, s-maxage=3600"
        },
    });
}

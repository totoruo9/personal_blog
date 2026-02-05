import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { PostContent } from "@/components/blog/PostContent";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

import { Sidebar } from "@/components/blog/Sidebar";

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const post = await getPostBySlug(slug);

    if (!post) {
        return notFound();
    }

    // Adapt Post structure for valid render if needed (e.g. date format)
    const formattedPost = {
        ...post,
        date: new Date(post.created_at).toLocaleDateString(),
        thumbnailUrl: post.thumbnail_url,
        comments: 0 // TODO: Fetch real comments count
    };

    return <PostContent post={formattedPost} sidebar={<Sidebar />} />;
}

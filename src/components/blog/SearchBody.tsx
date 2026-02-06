"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PostCard } from "@/components/blog/PostCard";
import { Search } from "lucide-react";

export function SearchBody() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                if (!query) {
                    setPosts([]);
                    return;
                }

                // Run parallel queries for Text Search and Tag Search
                const [textResult, tagResult] = await Promise.all([
                    // Text Search
                    supabase
                        .from('posts')
                        .select('*')
                        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
                        .order('created_at', { ascending: false }),

                    // Tag Search (Array contains)
                    supabase
                        .from('posts')
                        .select('*')
                        .contains('tags', [query])
                ]);

                if (textResult.error) console.error("Text search error:", textResult.error);
                if (tagResult.error) console.error("Tag search error:", tagResult.error);

                const textPosts = textResult.data || [];
                const tagPosts = tagResult.data || [];

                // Merge and deduplicate by ID
                const mergedPosts = [...textPosts, ...tagPosts];
                const uniquePosts = Array.from(new Map(mergedPosts.map(p => [p.id, p])).values());

                // Sort by date descending
                uniquePosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                setPosts(uniquePosts);

            } catch (err) {
                console.error("Unexpected search error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [query]);

    return (
        <div className="flex-1 min-w-0">
            <div className="mb-10 text-center border-b border-border-light pb-10">
                <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">Search Results</span>
                <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary flex items-center justify-center gap-2">
                    <Search className="w-8 h-8" />
                    "{query}"
                </h1>
                <p className="mt-3 text-text-secondary">
                    검색 결과: <span className="font-bold text-text-primary">{posts.length}</span>개의 글을 찾았습니다.
                </p>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <div className="py-20 text-center text-stone-400">검색 중...</div>
                ) : posts.length === 0 ? (
                    <div className="py-20 text-center text-stone-500">
                        검색 결과가 없습니다.
                    </div>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post.id}
                            variant="feed-list"
                            title={post.title}
                            titleEn={post.title_en}
                            excerpt={post.content.replace(/<[^>]*>/g, '').substring(0, 100) + "..."}
                            thumbnailUrl={post.thumbnail_url}
                            date={new Date(post.created_at).toLocaleDateString('ko-KR')}
                            views={post.views || 0}
                            comments={post.comments || 0}
                            category={post.category}
                            slug={post.slug}
                            author={post.author || "Admin"}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

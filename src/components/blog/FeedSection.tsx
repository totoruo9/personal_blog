"use client";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { Post } from "@/lib/supabase";

interface FeedSectionProps {
    initialPosts: Post[];
}

export function FeedSection({ initialPosts }: FeedSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState("전체");

    // Derive unique categories from posts
    const categories = useMemo(() => {
        const uniqueCats = Array.from(new Set(initialPosts.map((p) => p.category).filter(Boolean) as string[]));
        return ["전체", ...uniqueCats];
    }, [initialPosts]);

    // Filter posts based on selection
    const filteredPosts = useMemo(() => {
        if (selectedCategory === "전체") return initialPosts;
        return initialPosts.filter((p) => p.category === selectedCategory);
    }, [initialPosts, selectedCategory]);

    return (
        <section className="space-y-8">
            {/* Recent Posts Heading */}
            <h2 className="text-xl font-bold font-heading text-black mb-4">최근 올라온 글</h2>

            {/* Pill Menu for Categories */}
            <div className="flex justify-start mb-6">
                <div className="inline-flex items-center p-1.5 rounded-full border border-border-light bg-white shadow-sm gap-1 overflow-x-auto hide-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm ${selectedCategory === cat
                                ? "bg-text-primary text-white font-bold"
                                : "text-text-secondary hover:bg-stone-100 hover:text-text-primary"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Feed */}
            <div className="space-y-2">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            variant="feed-list"
                            title={post.title}
                            titleEn={post.title_en}
                            excerpt={post.content.replace(/<[^>]*>/g, "").substring(0, 100) + "..."}
                            thumbnailUrl={post.thumbnail_url}
                            date={new Date(post.created_at).toLocaleDateString('ko-KR')}
                            views={post.views || 0}
                            comments={post.comments || 0}
                            category={post.category}
                            slug={post.slug}
                            author={post.author || "Admin"}
                        />
                    ))
                ) : (
                    <div className="py-8 text-center text-stone-500 bg-stone-50 rounded-lg">
                        해당 카테고리에 글이 없습니다.
                    </div>
                )}
            </div>
        </section>
    );
}

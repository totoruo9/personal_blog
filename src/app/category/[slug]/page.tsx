import { getPostsByCategory } from "@/lib/posts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/blog/Sidebar";
import { PostCard } from "@/components/blog/PostCard";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Map English slugs to Korean category names
const CATEGORY_MAP: Record<string, string> = {
    "travel-food": "여행·맛집",
    "living-style": "리빙·스타일",
    "family-love": "가족·연애",
    "work-self-improvement": "직장·자기계발",
    "social-knowledge": "시사·지식",
    "money-story": "머니스토리",
    "all": "전체",
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const resolvedSearchParams = await searchParams;
    const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
    const limit = 30;

    const decodedSlug = decodeURIComponent(slug);
    // If slug is unknown map key, treat as raw category name
    const categoryName = CATEGORY_MAP[decodedSlug] || decodedSlug;

    const { data: posts, count } = await getPostsByCategory(categoryName, page, limit);
    const totalPages = Math.ceil(count / limit);

    return (
        <div className="min-h-screen bg-white font-sans text-text-primary">
            <Header />

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">

                        {/* Category Header */}
                        <div className="mb-10 text-center border-b border-border-light pb-10">
                            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">Category</span>
                            <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary">
                                {categoryName}
                            </h1>
                            <p className="mt-3 text-text-secondary max-w-lg mx-auto">
                                '{categoryName}' 카테고리의 최신 글을 모아보세요.
                            </p>
                        </div>

                        {/* Post List */}
                        <div className="space-y-4">
                            {posts.length === 0 ? (
                                <div className="py-20 text-center text-stone-500">
                                    이 카테고리에 아직 글이 없습니다.
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
                                        date={new Date(post.created_at).toLocaleDateString()}
                                        views={post.views || 0}
                                        comments={post.comments || 0}
                                        category={post.category}
                                        slug={post.slug}
                                        author={post.author || "Admin"}
                                    />
                                ))
                            )}
                        </div>

                        {/* Real Pagination - Only show if necessary */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center gap-2 items-center">
                                {/* Previous Page */}
                                {page > 1 && (
                                    <Link
                                        href={`/category/${slug}?page=${page - 1}`}
                                        className="w-10 h-10 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors text-text-secondary"
                                        aria-label="Previous Page"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </Link>
                                )}

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={`/category/${slug}?page=${pageNum}`}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors font-medium ${pageNum === page
                                            ? "bg-black text-white font-bold"
                                            : "text-text-secondary hover:bg-stone-200"
                                            }`}
                                    >
                                        {pageNum}
                                    </Link>
                                ))}

                                {/* Next Page */}
                                {page < totalPages && (
                                    <Link
                                        href={`/category/${slug}?page=${page + 1}`}
                                        className="w-10 h-10 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors text-text-secondary"
                                        aria-label="Next Page"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Sidebar */}
                    <aside className="hidden lg:block w-80 shrink-0">
                        <div className="sticky top-24">
                            <Sidebar />
                        </div>
                    </aside>

                </div>
            </main>

            <Footer />
        </div>
    );
}

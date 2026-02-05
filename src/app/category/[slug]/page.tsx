import { getPostsByCategory } from "@/lib/posts";

// ... (Category Map)

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    // If slug is unknown map key, treat as raw category name
    const categoryName = CATEGORY_MAP[decodedSlug] || decodedSlug;

    const posts = await getPostsByCategory(categoryName);

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
                                        comments={0}
                                        category={post.category}
                                        slug={post.slug}
                                        author={post.author || "Admin"}
                                    />
                                ))
                            )}
                        </div>

                        {/* Pagination Mock */}
                        <div className="mt-12 flex justify-center gap-2">
                            <button className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center">1</button>
                            <button className="w-10 h-10 rounded-full hover:bg-stone-200 text-text-secondary font-medium flex items-center justify-center transition-colors">2</button>
                            <button className="w-10 h-10 rounded-full hover:bg-stone-200 text-text-secondary font-medium flex items-center justify-center transition-colors">3</button>
                        </div>

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

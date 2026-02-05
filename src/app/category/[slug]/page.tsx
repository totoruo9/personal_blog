import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/blog/Sidebar";
import { PostCard } from "@/components/blog/PostCard";
import { MOCK_POSTS, getMockPosts } from "@/lib/mock-data";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Map slug to display name
const CATEGORY_MAP: Record<string, string> = {
    "food": "맛집 탐방",
    "trends": "트렌드 이슈",
    "life": "라이프스타일",
    "money": "머니스토리",
    "travel": "여행·맛집",
    // Add other mappings or logic to handle raw slugs
};

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const categoryName = CATEGORY_MAP[decodedSlug] || decodedSlug;

    // Mock filtering: Get posts that match the category or simply return a list for demo
    // In a real app, this would query the DB
    const posts = getMockPosts(12).map((p, i) => ({
        ...p,
        category: categoryName, // Force category for demo consistency
        id: `cat-${i}`,
        slug: `${p.slug}-${i}` // unique slug
    }));

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
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    variant="feed-list"
                                    {...post}
                                />
                            ))}
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

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/blog/Sidebar";
import { Badge } from "@/components/design-system/Badge";
import { Eye, MessageCircle, Calendar, ArrowLeft } from "lucide-react";
import { MOCK_POSTS, getMockPosts } from "@/lib/mock-data";
import { CommentSection } from "@/components/blog/CommentSection";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    // Find post in mock data (including generated ones logic if needed, but for now exact match or fallback)
    // We'll search in a larger set to capture the 'generated' ones from Home page if clicked
    const allPosts = getMockPosts(20);
    const post = allPosts.find((p) => p.slug === slug) || MOCK_POSTS.find(p => p.slug === slug);

    if (!post) {
        // Fallback for demo: if slug looks like 'post-gen-X', generate it on fly or just use first post
        if (slug.startsWith('post-gen') || slug.startsWith('post-')) {
            const fallbackPost = { ...MOCK_POSTS[0], title: `[임시] ${slug} 포스트`, slug: slug };
            return <PostContent post={fallbackPost} />;
        }
        return notFound();
    }

    return <PostContent post={post} />;
}

function PostContent({ post }: { post: any }) {
    return (
        <div className="min-h-screen bg-white font-sans text-text-primary">
            <Header />

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column (Article Content) */}
                    <article className="flex-1 min-w-0">
                        {/* Back Link */}
                        <Link href="/" className="inline-flex items-center text-text-tertiary hover:text-text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            홈으로 돌아가기
                        </Link>

                        {/* Post Header */}
                        <header className="mb-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="bg-stone-100 text-text-secondary">
                                    {post.category}
                                </Badge>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary leading-tight mb-6">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-between border-b border-border-light pb-6 text-sm text-text-secondary">
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-text-primary">{post.author}</span>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        <span>{post.views?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{post.comments}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-10 bg-stone-100 border border-border-light">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Post Content (Prose) */}
                        <div className="prose prose-lg max-w-none prose-stone prose-headings:font-bold prose-headings:font-heading prose-a:text-blue-600 hover:prose-a:text-blue-700">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />

                            {/* Filler Text for demo */}
                            <p>
                                이 포스트는 예시 데이터로 구성되어 있습니다. 실제 내용은 여기에 작성됩니다.
                                블로그의 가독성을 위해 적절한 줄간격과 폰트 크기를 적용했습니다.
                                본문 내용은 왼쪽 정렬을 기본으로 하며, 모바일 환경에서도 편안하게 읽을 수 있도록 반응형으로 설계되었습니다.
                            </p>
                            <h3>부제 예시입니다 (H3)</h3>
                            <p>
                                중요한 내용은 이렇게 문단으로 구분하여 작성합니다.
                                이미지, 인용구, 코드 블록 등 다양한 요소를 포함할 수 있습니다.
                            </p>
                            <blockquote>
                                <p>"좋은 디자인은 가능한 한 적은 디자인이다." - 디터 람스</p>
                            </blockquote>
                            <p>
                                마지막으로 결론을 정리하며 글을 마칩니다. 독자들의 체류 시간을 높이기 위해
                                관련 글 링크나 흥미로운 요소를 배치하는 것이 좋습니다.
                            </p>
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-border-light">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: string) => (
                                        <Link key={tag} href={`/search?q=${tag}`} className="text-sm text-text-secondary bg-stone-50 px-3 py-1.5 rounded-full hover:bg-stone-100 transition-colors">
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Comments Section */}
                        <CommentSection initialCount={post.comments} />

                    </article>

                    {/* Right Column (Sidebar) */}
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

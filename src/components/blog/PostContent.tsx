"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/design-system/Badge";
import { Eye, MessageCircle, Calendar, ArrowLeft } from "lucide-react";
import { CommentSection } from "@/components/blog/CommentSection";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import ReactMarkdown from "react-markdown";

interface PostContentProps {
    post: any; // Using any for flexibility with Supabase types + extra fields
    sidebar?: React.ReactNode;
}

export function PostContent({ post, sidebar }: PostContentProps) {
    const { language } = useLanguage();

    const displayTitle = (language === 'en' && post.title_en) ? post.title_en : post.title;
    const displayContent = (language === 'en' && post.content_en) ? post.content_en : post.content;

    return (
        <div className="min-h-screen bg-white font-sans text-text-primary">
            <Header />

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column (Article Content) */}
                    <article className="flex-1 min-w-0">
                        {/* ... */}
                        {/* Back Link */}
                        <Link href="/" className="inline-flex items-center text-text-tertiary hover:text-text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            {language === 'en' ? "Back to Home" : "홈으로 돌아가기"}
                        </Link>

                        {/* Post Header */}
                        <header className="mb-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="bg-stone-100 text-text-secondary">
                                    {post.category}
                                </Badge>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary leading-tight mb-6">
                                {displayTitle}
                            </h1>

                            <div className="flex items-center justify-between border-b border-border-light pb-6 text-sm text-text-secondary">
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-text-primary">{post.author || "Admin"}</span>
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
                        {post.thumbnailUrl && (
                            <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-10 bg-stone-100 border border-border-light">
                                <Image
                                    src={post.thumbnailUrl}
                                    alt={displayTitle}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Post Content (Prose) */}
                        <div className="prose prose-lg max-w-none prose-stone prose-headings:font-bold prose-headings:font-heading prose-a:text-blue-600 hover:prose-a:text-blue-700">
                            {/* Use ReactMarkdown for safe rendering */}
                            <ReactMarkdown>{displayContent}</ReactMarkdown>
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
                            {sidebar}
                        </div>
                    </aside>

                </div>
            </main>
            <Footer />
        </div>
    );
}

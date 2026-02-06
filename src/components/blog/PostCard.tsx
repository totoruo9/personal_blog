"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/design-system/Badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface PostCardProps {
    variant?: "grid" | "list" | "ranked-list" | "feed-grid" | "feed-list";
    rank?: number;
    title: string;
    titleEn?: string;
    excerpt?: string;
    excerptEn?: string;
    thumbnailUrl?: string | null;
    date?: string;
    views?: number;
    comments?: number;
    category?: string;
    author?: string;
    slug: string;
    className?: string;
    tags?: string[];
}

export function PostCard({
    variant = "grid",
    rank,
    title,
    titleEn,
    excerpt,
    excerptEn,
    thumbnailUrl,
    date,
    views,
    comments,
    category,
    author,
    slug,
    className,
    tags,
}: PostCardProps) {
    const { language } = useLanguage();

    const displayTitle = (language === 'en' && titleEn) ? titleEn : title;
    const displayExcerpt = (language === 'en' && excerptEn) ? excerptEn : excerpt;

    // 1. Tistory Feed Grid (Top 2 items)
    if (variant === "feed-grid") {
        return (
            <Link href={`/posts/${slug}`} className={cn("group block bg-white rounded-md overflow-hidden border border-border-light hover:shadow-lg transition-all", className)}>
                {/* Image Area - Only render if thumbnailUrl exists */}
                {thumbnailUrl && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                            src={thumbnailUrl}
                            alt={displayTitle}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-xl font-bold text-text-primary mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {displayTitle}
                    </h3>
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                            {tags.map(tag => (
                                <span key={tag} className="text-sm text-text-tertiary">#{tag}</span>
                            ))}
                        </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-text-tertiary border-t border-border-light pt-4">
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{comments || 0}</span>
                        </div>
                        <span className="ml-auto">{date}</span>
                    </div>
                </div>
            </Link>
        );
    }

    // 2. Horizontal Image Card (Feed List) - Requested Style
    if (variant === "feed-list") {
        return (
            <Link href={`/posts/${slug}`} className={cn("group flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden border border-border-light hover:shadow-md transition-all", className)}>
                {/* Image (Left) - Only render if thumbnailUrl exists */}
                {thumbnailUrl && (
                    <div className="relative w-full sm:w-[280px] aspect-[16/10] sm:aspect-[4/3] shrink-0 bg-stone-100">
                        <Image
                            src={thumbnailUrl}
                            alt={displayTitle}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                {/* Content (Right) */}
                <div className="flex-1 p-6 flex flex-col relative justify-center">
                    <div className="mb-3">
                        <Badge variant="secondary" className="bg-stone-100 text-text-secondary rounded-sm text-xs px-2 py-0.5 font-bold">
                            {category || "Category"}
                        </Badge>
                    </div>

                    <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {displayTitle}
                    </h3>

                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
                        {displayExcerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-light/50">
                        <div className="flex items-center gap-3 text-xs text-text-tertiary">
                            <span>{date}</span>
                            {comments !== undefined && (
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    <span>{comments}</span>
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-bold text-text-tertiary group-hover:text-text-primary transition-colors">{language === 'en' ? "Read more →" : "더 보기 →"}</span>
                    </div>
                </div>
            </Link>
        );
    }

    // 3. Ranked List Variant (For "Popular Posts" section)
    if (variant === "ranked-list") {
        return (
            <Link href={`/posts/${slug}`} className={cn("group flex items-center gap-4 py-5 border-b border-border-light last:border-none", className)}>
                {/* Rank Number */}
                <div className="shrink-0 w-8 pt-1 self-start">
                    <span className="text-3xl font-bold text-stone-300 group-hover:text-stone-400 transition-colors font-display italic">
                        {rank}/
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-text-tertiary mb-1 block">
                        {category || "Category"}
                    </span>
                    <h3 className="text-lg font-bold text-text-primary leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {displayTitle}
                    </h3>
                    {displayExcerpt && (
                        <p className="text-sm text-text-secondary line-clamp-1 mb-2 hidden sm:block">
                            {displayExcerpt}
                        </p>
                    )}
                </div>

                {/* Thumbnail (Right side) - Only render if thumbnailUrl exists */}
                {thumbnailUrl && (
                    <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-20 relative rounded-md overflow-hidden bg-stone-100">
                        <Image
                            src={thumbnailUrl}
                            alt={displayTitle}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
            </Link>
        );
    }

    // 4. Standard List Variant (For Recent Posts)
    if (variant === "list") {
        return (
            <Link href={`/posts/${slug}`} className={cn("group block w-full py-6 border-b border-border-light last:border-none", className)}>
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Thumbnail - Only render if thumbnailUrl exists */}
                    {thumbnailUrl && (
                        <div className="relative w-full sm:w-48 aspect-[16/10] rounded-md overflow-hidden shrink-0 bg-stone-100">
                            <Image
                                src={thumbnailUrl}
                                alt={displayTitle}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs py-0 h-5 border-stone-200 text-stone-500">
                                {category}
                            </Badge>
                            <span className="text-xs text-text-tertiary">{date}</span>
                        </div>

                        <h3 className="text-xl font-bold text-text-primary group-hover:text-blue-600 transition-colors line-clamp-2">
                            {displayTitle}
                        </h3>

                        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                            {displayExcerpt}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-text-tertiary pt-2">
                            <div className="flex items-center gap-1">
                                <div className="w-4 h-4 rounded-full bg-stone-200" /> {/* Avatar placehokder */}
                                <span className="text-xs text-stone-400">{author || 'Admin'}</span>
                            </div>
                            {views && (
                                <div className="flex items-center gap-1">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{views.toLocaleString()}</span>
                                </div>
                            )}
                            {comments !== undefined && (
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    <span>{comments}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // Default Grid Variant
    return (
        <Link href={`/posts/${slug}`} className={cn("group block bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border-light", className)}>
            {/* Conditional Cover Image */}
            {thumbnailUrl && (
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={thumbnailUrl}
                        alt={displayTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-text-primary hover:bg-white backdrop-blur-sm shadow-sm border-none font-bold">
                            {category}
                        </Badge>
                    </div>
                </div>
            )}

            <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-text-primary leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {displayTitle}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2">
                    {displayExcerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border-light text-xs text-text-tertiary">
                    <span>{date}</span>
                    <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{views?.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

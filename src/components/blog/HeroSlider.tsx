"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { Post } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSliderProps {
    posts: Post[];
}

export function HeroSlider({ posts }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);
    const { language } = useLanguage();

    const next = () => setCurrent((prev) => (prev + 1) % posts.length);

    useEffect(() => {
        if (posts.length === 0) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [posts.length]);

    if (!posts || posts.length === 0) return null;

    return (
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-md overflow-hidden group bg-stone-100">
            {posts.map((post, index) => {
                const displayTitle = (language === 'en' && post.title_en) ? post.title_en : post.title;

                return (
                    <div
                        key={post.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <Link href={`/posts/${post.slug}`} className="block w-full h-full relative">
                            {/* Image */}
                            <div className="absolute inset-0">
                                {post.thumbnail_url ? (
                                    <Image
                                        src={post.thumbnail_url}
                                        alt={displayTitle}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-stone-300 flex items-center justify-center">
                                        <span className="text-stone-500">No Image</span>
                                    </div>
                                )}
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white max-w-3xl">
                                {post.category && (
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] md:text-xs font-bold rounded-full w-fit mb-6">
                                        {post.category}
                                    </span>
                                )}

                                <Quote className="w-8 h-8 md:w-10 md:h-10 text-white/80 mb-4 fill-white/20" />

                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-8 line-clamp-3 text-white drop-shadow-md hover:text-blue-300 transition-colors">
                                    {displayTitle}
                                </h2>


                            </div>
                        </Link>
                    </div>
                );
            })}

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {posts.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-2 rounded-full transition-all duration-300 shadow-sm ${current === idx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

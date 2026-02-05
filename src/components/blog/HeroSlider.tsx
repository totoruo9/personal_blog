"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/design-system/Button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1000&auto=format&fit=crop",
        title: "여행 준비가 수월해지는 여행용 파우치 세트 내돈내산 솔직 리뷰",
        category: "오늘의 티스토리",
        author: "코코네"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop",
        title: "생산성을 200% 높이는 데스크셋업 가이드",
        category: "IT / Tech",
        author: "데스크테리어"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop",
        title: "미니멀 라이프, 비움에서 시작하는 행복",
        category: "라이프스타일",
        author: "심플리스트"
    },
];

export function HeroSlider() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
    const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-md overflow-hidden group">
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] md:text-xs font-bold rounded-full w-fit mb-6">
                            {slide.category}
                        </span>

                        <Quote className="w-8 h-8 md:w-10 md:h-10 text-white/80 mb-4 fill-white/20" />

                        <h2 className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-8 line-clamp-3 text-white drop-shadow-md">
                            {slide.title}
                        </h2>

                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-[10px] font-bold">
                                {slide.author[0]}
                            </div>
                            <span className="text-sm font-medium">{slide.author}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${current === idx ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

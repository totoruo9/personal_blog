"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/design-system/Button";
import { ChevronLeft, ChevronRight, UserPlus } from "lucide-react";

const CREATORS = [
    { name: "김민우", role: "IT 칼럼니스트", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop" },
    { name: "이지은", role: "푸드 스타일리스트", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop" },
    { name: "박성호", role: "여행 작가", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop" },
    { name: "최수진", role: "미니멀리스트", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop" },
    { name: "정다은", role: "영화 평론가", img: "https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=256&auto=format&fit=crop" },
];

export function CreatorHighlight() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full bg-stone-50 py-16">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-text-primary">추천 크리에이터</h2>
                        <p className="text-text-secondary text-sm">영감을 주는 작가들을 만나보세요</p>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => scroll("left")} className="p-2 rounded-full border border-border-medium hover:bg-white hover:border-earth transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => scroll("right")} className="p-2 rounded-full border border-border-medium hover:bg-white hover:border-earth transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {CREATORS.map((creator, idx) => (
                        <div key={idx} className="min-w-[280px] bg-white rounded-xl p-6 border border-border-light shadow-sm flex flex-col items-center text-center snap-center hover:shadow-md transition-shadow">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-stone-100">
                                <Image src={creator.img} alt={creator.name} fill className="object-cover" />
                            </div>
                            <h3 className="font-bold text-lg text-text-primary">{creator.name}</h3>
                            <span className="text-sm text-text-tertiary mb-6 block">{creator.role}</span>
                            <Button size="sm" variant="outline" className="w-full rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                                <UserPlus className="w-4 h-4 mr-2" /> 팔로우
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

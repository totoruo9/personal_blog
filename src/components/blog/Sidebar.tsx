import Link from "next/link";
import { Badge } from "@/components/design-system/Badge";
import { Hash } from "lucide-react";
import { getPopularTags, getTotalStats } from "@/lib/posts";

export async function Sidebar() {
    const popularTags = await getPopularTags();
    const stats = await getTotalStats();

    return (
        <aside className="w-full lg:w-80 space-y-8">

            {/* 1. Blog Stats */}
            <div className="bg-white p-6 rounded-md border border-border-light shadow-sm">
                <h3 className="font-bold text-text-primary text-sm uppercase tracking-wide mb-4">Blog Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-stone-50 rounded-md">
                        <span className="block text-xs text-text-tertiary mb-1">Total Views</span>
                        <span className="block font-mono font-bold text-lg">{stats.visitors.toLocaleString()}</span>
                    </div>
                    <div className="text-center p-3 bg-stone-50 rounded-md">
                        <span className="block text-xs text-text-tertiary mb-1">Today</span>
                        <span className="block font-mono font-bold text-lg text-blue-600">{stats.today.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* 2. Advertisement Area */}
            <div className="bg-stone-100 rounded-md p-6 border border-border-light flex flex-col items-center justify-center text-center min-h-[250px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-stone-200/50 flex items-center justify-center">
                    <span className="text-stone-400 font-bold text-sm">광고 영역 (300x250)</span>
                </div>
                <p className="relative z-10 text-xs text-text-tertiary">AdSense / Banner</p>
                {/* This would be where the <ins> tag for AdSense goes */}
            </div>

            {/* 3. Popular Tags */}
            <div className="bg-white p-6 rounded-md border border-border-light shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border-light">
                    <Hash className="w-4 h-4 text-text-tertiary" />
                    <h3 className="font-bold text-text-primary text-sm uppercase tracking-wide">인기 태그</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {popularTags.length > 0 ? (
                        popularTags.map(tag => (
                            <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}>
                                <Badge variant="secondary" className="cursor-pointer hover:bg-olive-dark transition-colors px-3 py-1">
                                    #{tag}
                                </Badge>
                            </Link>
                        ))
                    ) : (
                        <p className="text-xs text-stone-400">태그가 없습니다.</p>
                    )}
                </div>
            </div>

        </aside>
    );
}

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const SERIES = [
    {
        title: "신입 개발자를 위한 CS 기초",
        count: 12,
        desc: "면접에서 자주 묻는 CS 지식 정리"
    },
    {
        title: "30일 미니멀리즘 챌린지",
        count: 28,
        desc: "하루에 하나씩 비우며 채우는 삶"
    },
    {
        title: "주말에 떠나는 서울 근교 여행",
        count: 5,
        desc: "차 없이 떠나는 뚜벅이 여행 코스"
    },
    {
        title: "맛있는 다이어트 레시피",
        count: 15,
        desc: "맛과 건강을 모두 잡은 식단"
    }
];

export function FeaturedSeries() {
    return (
        <div className="border border-border-light rounded-md p-6 bg-white">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-text-secondary" />
                    연재 중인 시리즈
                </h3>
                <Link href="/series" className="text-xs font-bold text-text-tertiary hover:text-black">
                    더보기
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERIES.map((s, i) => (
                    <Link key={i} href="#" className="group block p-4 rounded-md bg-stone-50 hover:bg-stone-100 transition-colors">
                        <h4 className="font-bold text-text-primary group-hover:text-blue-600 transition-colors mb-1">
                            {s.title}
                        </h4>
                        <p className="text-xs text-text-secondary mb-3">{s.desc}</p>
                        <div className="flex items-center text-xs font-bold text-text-tertiary">
                            <span className="bg-white px-2 py-0.5 rounded-md border border-stone-200">
                                총 {s.count}화
                            </span>
                            <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

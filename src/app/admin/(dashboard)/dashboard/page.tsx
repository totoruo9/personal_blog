import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { Plus } from "lucide-react";
import { getPosts } from "@/lib/posts";
import { AdminPostTable } from "@/components/admin/AdminPostTable";

// Revalidate data every 0 seconds (real-time)
export const revalidate = 0;

export default async function AdminDashboardPage() {
    const posts = await getPosts(20);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-stone-900">대시보드</h1>
                    <p className="text-stone-500 mt-1">블로그 콘텐츠를 관리하세요.</p>
                </div>
                <Link href="/admin/write">
                    <Button variant="primary" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        새 글 작성
                    </Button>
                </Link>
            </div>

            {/* Stats Cards (Real Data) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-500 uppercase">총 방문자 수</h3>
                    <p className="text-3xl font-heading font-bold text-stone-900 mt-2">
                        {posts.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString()}
                    </p>
                    <span className="text-xs text-stone-400 font-medium mt-1 block">모든 글의 조회수 합계</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-500 uppercase">발행된 글</h3>
                    <p className="text-3xl font-heading font-bold text-stone-900 mt-2">{posts.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-500 uppercase">최신 글</h3>
                    <p className="text-lg font-heading font-bold text-stone-900 mt-2 truncate">
                        {posts[0]?.title || "-"}
                    </p>
                    <span className="text-xs text-stone-400 block mt-1">
                        {posts[0]?.created_at ? new Date(posts[0].created_at).toLocaleDateString() : ""}
                    </span>
                </div>
            </div>

            {/* Posts Table (Client Component) */}
            <AdminPostTable initialPosts={posts} />
        </div>
    );
}

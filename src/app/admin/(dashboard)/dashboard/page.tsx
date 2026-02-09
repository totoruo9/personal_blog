import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { Plus } from "lucide-react";
import { getPosts } from "@/lib/posts";
import { AdminPostTable } from "@/components/admin/AdminPostTable";
import { AIGeneratorButton } from "@/components/admin/AIGeneratorButton";

// Revalidate data every 0 seconds (real-time)
export const revalidate = 0;

export default async function AdminDashboardPage() {
    // Note: getPosts is async server action, but this is a default export async component so it's fine.
    // However, if we want client-side interactivity (Wizard Modal), we might need to make this a client component
    // OR wrap the client parts.
    // As per previous file content, this is an async Server Component.
    // If I add useState, I MUST convert to Client Component.
    // BUT `getPosts` (lib/posts.ts) uses `supabase-js` which works on server.
    // If I convert to "use client", `getPosts` might fail if it uses node-only secrets directly or if it's not safe.
    // `lib/posts.ts` uses `lib/supabase.ts` (client). So it SHOULD be fine on client too, BUT `getPosts` is async.
    // Let's refactor:
    // 1. Rename current default export to `AdminDashboardContent` (Server) ? No, messy.
    // 2. Wrap client parts (`AIGeneratorWizard` + Button) into a new Client Component `DashboardControls`.
    //    Pass that component into this Server Component?
    // 3. Or just make this "use client" and fetch posts via `useEffect` (like in my previous failed replace attempt).
    //    Actually, let's look at the FILE I VIEWED in step 2206.
    //    It is `export default async function AdminDashboardPage()`.
    //    It has NO "use client" directive.
    //    It uses `getPosts(20)` which is likely server-side optimized.
    //    If I switch to "use client", I lose async component ability.
    //    I should creating a WRAPPER Client Component for the "AI Generate" button and Wizard.
    //    Let's call it `AIGenerationButton`.

    // Wait, the user wants "AI 콘텐츠 작성 시작" button.
    // Let's create `components/admin/AIGenerationButton.tsx`.
    // And embed it here.

    const posts = await getPosts(20);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-stone-900">대시보드</h1>
                    <p className="text-stone-500 mt-1">블로그 콘텐츠를 관리하세요.</p>
                </div>
                <div className="flex gap-2">
                    <AIGeneratorButton /> {/* New Component */}
                    <Link href="/admin/write">
                        <Button variant="primary" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            새 글 작성
                        </Button>
                    </Link>
                </div>
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

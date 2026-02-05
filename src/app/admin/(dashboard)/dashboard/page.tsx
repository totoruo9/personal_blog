import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { MOCK_POSTS, getMockPosts } from "@/lib/mock-data";

export default function AdminDashboardPage() {
    const posts = getMockPosts(10); // Show recent 10 posts

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

            {/* Stats Cards (Mock) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-500 uppercase">총 방문자 수</h3>
                    <p className="text-3xl font-heading font-bold text-stone-900 mt-2">12,450</p>
                    <span className="text-xs text-green-600 font-bold mt-1 block">▲ 12% (지난주 대비)</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-500 uppercase">발행된 글</h3>
                    <p className="text-3xl font-heading font-bold text-stone-900 mt-2">{posts.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h3 className="text-sm font-bold text-stone-500 uppercase">평균 체류시간</h3>
                    <p className="text-3xl font-heading font-bold text-stone-900 mt-2">4분 12초</p>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-200 flex justify-between items-center">
                    <h2 className="font-heading font-bold text-lg">최근 글 목록</h2>
                    <span className="text-xs text-stone-400">* 실제 삭제 기능은 DB 연결 후 작동합니다.</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-200">
                            <tr>
                                <th className="px-6 py-4 font-bold">제목</th>
                                <th className="px-6 py-4 font-bold">카테고리</th>
                                <th className="px-6 py-4 font-bold">작성일</th>
                                <th className="px-6 py-4 font-bold">상태</th>
                                <th className="px-6 py-4 font-bold text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-stone-900 max-w-xs truncate">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4 text-stone-500">
                                        <Badge variant="secondary" className="text-xs py-0.5">{post.category}</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-stone-500 whitespace-nowrap">
                                        {post.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            발행됨
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-stone-400 hover:text-blue-600 transition-colors" title="수정">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-stone-400 hover:text-red-600 transition-colors" title="삭제">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-stone-200 text-center">
                    <button className="text-sm font-bold text-stone-500 hover:text-stone-900">더 보기</button>
                </div>
            </div>
        </div>
    );
}

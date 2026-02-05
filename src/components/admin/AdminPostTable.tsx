"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/design-system/Badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { Post } from "@/lib/supabase";
import { deletePost } from "@/lib/posts";
import { Button } from "@/components/design-system/Button";

interface AdminPostTableProps {
    initialPosts: Post[];
}

export function AdminPostTable({ initialPosts }: AdminPostTableProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("정말 이 글을 삭제하시겠습니까?")) return;

        setIsDeleting(id);
        try {
            const res = await fetch('/api/posts/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error);

            setPosts(posts.filter(p => p.id !== id));
            alert("삭제되었습니다.");
        } catch (error: any) {
            alert("삭제 실패: " + error.message);
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center">
                <h2 className="font-heading font-bold text-lg">최근 글 목록</h2>
                <span className="text-xs text-stone-400">총 {posts.length}개의 글이 있습니다.</span>
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
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-stone-500">
                                    아직 작성된 글이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-stone-900 max-w-xs truncate">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4 text-stone-500">
                                        <Badge variant="secondary" className="text-xs py-0.5">{post.category}</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-stone-500 whitespace-nowrap">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {post.status === 'published' ? '발행됨' : '임시저장'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/posts/${post.slug}`} target="_blank" className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors" title="보기">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link href={`/admin/write?id=${post.id}`} className="p-1.5 text-stone-400 hover:text-blue-600 transition-colors" title="수정">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                className="p-1.5 text-stone-400 hover:text-red-600 transition-colors disabled:opacity-50"
                                                title="삭제"
                                                onClick={() => handleDelete(post.id)}
                                                disabled={isDeleting === post.id}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

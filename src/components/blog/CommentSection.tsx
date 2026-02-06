"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, Lock, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";
import { supabase } from "@/lib/supabase";

interface Comment {
    id: string;
    author: string;
    avatar?: string;
    created_at: string;
    content: string;
    is_secret?: boolean;
    password?: string; // Only used for client-side check if needed or insert
}

export function CommentSection({ initialCount = 0, postId }: { initialCount?: number; postId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [authorName, setAuthorName] = useState("");
    const [password, setPassword] = useState("");
    const [content, setContent] = useState("");
    const [isSecret, setIsSecret] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (postId) {
            fetchComments();
        }
    }, [postId]);

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error("Error fetching comments:", error);
        } else {
            setComments(data || []);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!authorName || !password || !content) {
            alert("이름, 비밀번호, 내용을 모두 입력해주세요.");
            return;
        }

        setIsLoading(true);

        const newComment = {
            post_id: postId,
            author: authorName,
            password: password,
            content: content,
            is_secret: isSecret,
            created_at: new Date().toISOString() // Optimistic update usually, but DB sets default
        };

        const { data, error } = await supabase
            .from('comments')
            .insert([newComment])
            .select()
            .single();

        if (error) {
            console.error("Error adding comment:", error);
            alert("댓글 등록에 실패했습니다.");
        } else {
            setComments([...comments, data]);
            setContent("");
            setAuthorName("");
            setPassword("");
            setIsSecret(false);
        }
        setIsLoading(false);
    };

    const handleDelete = async (commentId: string) => {
        const inputPwd = prompt("댓글 삭제를 위해 비밀번호를 입력해주세요.");
        if (!inputPwd) return;

        // Verify password (client-side check for this simple demo, or call API)
        // Since we don't have a verify API yet, we will just try to delete matching id AND password
        // But RLS policies might block arbitrary deletes.
        // For this demo, let's fetch the comment to check password or assume checking logic.
        // SECURITY NOTE: In a real app, never expose password in SELECT. This is a simple demo.

        const { data: comment } = await supabase.from('comments').select('password').eq('id', commentId).single();
        if (comment && comment.password === inputPwd) {
            const { error } = await supabase.from('comments').delete().eq('id', commentId);
            if (!error) {
                setComments(comments.filter(c => c.id !== commentId));
                alert("삭제되었습니다.");
            } else {
                alert("삭제 중 오류가 발생했습니다.");
            }
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <div className="mt-16">
            {/* Header */}
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-text-primary">
                <MessageCircle className="w-6 h-6" />
                댓글 <span className="text-earth">{comments.length}</span>개
            </h3>

            {/* Comment List */}
            <div className="space-y-8 mb-12">
                {comments.length === 0 ? (
                    <div className="text-center py-10 bg-stone-50 rounded-xl border border-border-light text-text-secondary">
                        아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 group">
                            <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden border border-border-light bg-stone-100">
                                <Image
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`}
                                    alt={comment.author}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-text-primary text-sm">{comment.author}</span>
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="text-stone-300 hover:text-red-500 transition-colors"
                                        title="삭제"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap mb-2">
                                    {comment.is_secret ? "🔒 비밀 댓글입니다." : comment.content}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-text-tertiary">
                                    <span>{new Date(comment.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Write UI */}
            <div className="bg-stone-50 border border-border-light rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-stone-200 shrink-0 flex items-center justify-center overflow-hidden">
                        {/* Ghost Avatar Placeholder */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                        {/* Inputs Row */}
                        <div className="flex gap-4">
                            <Input
                                placeholder="이름"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                className="bg-white"
                                required
                            />
                            <Input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white"
                                required
                            />
                        </div>

                        {/* Textarea */}
                        <div className="relative">
                            <textarea
                                className="w-full min-h-[100px] p-4 rounded-lg border border-border-medium bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-earth disabled:opacity-50"
                                placeholder="소중한 댓글을 남겨주세요..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsSecret(!isSecret)}
                                    className={`flex items-center gap-1 text-xs ${isSecret ? 'text-earth font-bold' : 'text-stone-400 hover:text-stone-600'}`}
                                >
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>비밀글</span>
                                </button>
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                className="bg-stone-800 text-white hover:bg-black px-6 rounded-none h-10 font-bold"
                                disabled={isLoading}
                            >
                                {isLoading ? "등록 중..." : "등록"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Lock, MoreVertical } from "lucide-react"; // Import Icons
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";

interface Comment {
    id: string;
    author: string;
    avatar?: string;
    date: string;
    content: string;
    isSecret?: boolean;
}

// Initial Mock Comments matching the screenshot style or generic ones
const INITIAL_COMMENTS: Comment[] = [
    {
        id: "c1",
        author: "뭉진이",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mungjin",
        date: "2026. 2. 3. 15:05",
        content: "맛있겠네요. 투썸...ㅎㅎ 먹어보고 싶네요.👍",
    },
    {
        id: "c2",
        author: "sinhanrack(신한앵글랙)",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sinhan",
        date: "15분 전",
        content: "정성 들여 작성하신 포스팅 잘 보고 갑니다. 행복한 하루 보내세요^^",
    }
];

export function CommentSection({ initialCount = 0 }: { initialCount?: number }) {
    const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
    const [authorName, setAuthorName] = useState("");
    const [password, setPassword] = useState("");
    const [content, setContent] = useState("");
    const [isSecret, setIsSecret] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!authorName || !password || !content) {
            alert("이름, 비밀번호, 내용을 모두 입력해주세요.");
            return;
        }

        const newComment: Comment = {
            id: Date.now().toString(),
            author: authorName,
            avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${authorName}`,
            date: "방금 전",
            content: content,
            isSecret: isSecret
        };

        setComments([...comments, newComment]);
        setContent("");
        setAuthorName("");
        setPassword("");
        setIsSecret(false);
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
                                    src={comment.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`}
                                    alt={comment.author}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-text-primary text-sm">{comment.author}</span>
                                    <button className="text-stone-400 hover:text-stone-600">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap mb-2">
                                    {comment.content}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-text-tertiary">
                                    <span>{comment.date}</span>
                                    <button className="hover:text-text-primary transition-colors">답글</button>
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

                    <div className="flex-1 space-y-4">
                        {/* Inputs Row */}
                        <div className="flex gap-4">
                            <Input
                                placeholder="이름"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                className="bg-white"
                            />
                            <Input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white"
                            />
                        </div>

                        {/* Textarea */}
                        <div className="relative">
                            <textarea
                                className="w-full min-h-[100px] p-4 rounded-lg border border-border-medium bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-earth disabled:opacity-50"
                                placeholder="로그인 댓글만 허용한 블로그입니다... (여기는 데모이므로 자유롭게 작성 가능)"
                                // Changed placeholder for actual usage
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
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
                                onClick={handleSubmit}
                                variant="primary"
                                className="bg-stone-800 text-white hover:bg-black px-6 rounded-none h-10 font-bold"
                            // Styled to match screenshot (dark button)
                            >
                                등록
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

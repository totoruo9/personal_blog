"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/design-system/Input";
import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";
import { CATEGORIES } from "@/lib/mock-data";

export default function AdminWritePage() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost = {
            title,
            slug,
            category,
            content,
            tags: tags.split(',').map(t => t.trim()),
            date: new Date().toISOString().split('T')[0],
            status: 'draft'
        };
        console.log("Saving Post:", newPost);
        alert("글이 저장되었습니다! (콘솔 확인)");
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="p-2 -ml-2 text-stone-400 hover:text-stone-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-heading font-bold text-stone-900">새 글 작성</h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">임시저장</Button>
                    <Button variant="primary" onClick={handleSubmit} className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        발행하기
                    </Button>
                </div>
            </div>

            {/* Editor Form */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 md:p-8 space-y-6">

                {/* Title & Slug */}
                <div className="space-y-4">
                    <Input
                        placeholder="제목을 입력하세요"
                        className="text-2xl md:text-3xl font-bold border-none px-0 placeholder:text-stone-300 focus:ring-0 h-auto py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                        <span className="font-medium">Slug:</span>
                        <input
                            className="bg-stone-50 border border-stone-200 rounded px-2 py-1 text-xs w-full max-w-sm focus:outline-none focus:border-stone-400"
                            placeholder="url-slug-example"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>
                </div>

                <div className="h-px bg-stone-100 my-6" />

                {/* Meta Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">카테고리</label>
                        <select
                            className="w-full p-2.5 rounded-lg border border-stone-200 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-stone-50"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">태그</label>
                        <Input
                            placeholder="태그 입력 (콤마로 구분)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>

                {/* Main Content Editor (Mock) */}
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">본문 내용</label>
                    <div className="border border-stone-200 rounded-lg overflow-hidden min-h-[400px] flex flex-col">
                        {/* Toolbar Mock */}
                        <div className="bg-stone-50 border-b border-stone-200 p-2 flex gap-2">
                            <button className="p-1.5 rounded hover:bg-stone-200 text-stone-600 font-bold">B</button>
                            <button className="p-1.5 rounded hover:bg-stone-200 text-stone-600 italic">I</button>
                            <button className="p-1.5 rounded hover:bg-stone-200 text-stone-600 underline">U</button>
                            <div className="w-px h-6 bg-stone-300 mx-1 self-center" />
                            <button className="p-1.5 rounded hover:bg-stone-200 text-stone-600 flex items-center gap-1">
                                <ImageIcon className="w-4 h-4" />
                                <span className="text-xs">이미지</span>
                            </button>
                        </div>
                        {/* Textarea */}
                        <textarea
                            className="flex-1 w-full p-4 resize-none outline-none text-stone-800 leading-relaxed"
                            placeholder="내용을 입력하세요..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

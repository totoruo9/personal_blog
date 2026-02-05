"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, Wand2, Loader2 } from "lucide-react";
import { Input } from "@/components/design-system/Input";
import { Button } from "@/components/design-system/Button";
import { CATEGORIES } from "@/lib/mock-data";

function AdminWriteForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');
    const isEditMode = !!editId;

    const [title, setTitle] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [content, setContent] = useState("");
    const [contentEn, setContentEn] = useState("");
    const [tags, setTags] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(!!editId);
    const [activeTab, setActiveTab] = useState<'ko' | 'en'>('ko');

    // Fetch existing post data if in edit mode
    useEffect(() => {
        if (!editId) return;

        const fetchPost = async () => {
            try {
                // Reuse the existing public API or create a specific admin one? 
                // Using public API for now since it returns what we need
                // Ideally should use an admin-specific GET to verify ownership/status
                // But for valid slug/id lookup, we can check DB via API or reuse client lib if RLS allows.
                // Since this is admin client side, RLS might block if not authenticated properly as admin user in Supabase.
                // Assuming RLS allows read for published posts. For drafts, we might need a different approach.
                // Let's use getPostBySlug like logic but with ID via a new API endpoint? 
                // Or just assume RLS allows reading 'posts' table freely for now (as per earlier context).

                // Better: Use a simple API route to fetch by ID using admin client to bypass RLS for editing
                // I will add a simple quick fetch here or use existing getPost helper if it works.
                // Let's rely on standard supabase client for fetch first.

                // Actually, let's just make a specialized fetch call
                // Actually, let's just make a specialized fetch call
                const { supabase } = await import('@/lib/supabase');
                // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', editId)
                    .single();

                if (error) throw error;
                if (!data) throw new Error("Post not found");

                setTitle(data.title || "");
                setTitleEn(data.title_en || "");
                setSlug(data.slug || "");
                setCategory(data.category || CATEGORIES[0]);
                setContent(data.content || "");
                setContentEn(data.content_en || "");
                setTags(Array.isArray(data.tags) ? data.tags.join(', ') : "");
                setThumbnailUrl(data.thumbnail_url || "");

            } catch (error: any) {
                alert("불러오기 실패: " + error.message);
                router.push('/admin/dashboard');
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchPost();
    }, [editId, router]);


    const handleAiGenerate = async () => {
        if (!title) {
            alert("AI 생성을 위해 제목이나 키워드를 먼저 입력해주세요.");
            return;
        }
        setIsGenerating(true);
        try {
            const res = await fetch('/api/ai/generate', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: title,
                    type: category === '맛집' ? 'food' : 'trend'
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (data.title_ko) {
                setTitle(data.title_ko);
                setContent(data.content_ko);
                setTitleEn(data.title_en);
                setContentEn(data.content_en);

                const seedTitle = data.title_en || data.title_ko;
                const autoSlug = seedTitle.toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .substring(0, 50);
                if (!slug) setSlug(autoSlug); // Only set if empty

                alert("한국어와 영어 콘텐츠가 모두 생성되었습니다!");
            } else {
                alert("AI 생성 실패: " + (data.error || "Unknown error"));
            }
        } catch (e: any) {
            alert("AI 생성 중 오류가 발생했습니다: " + e.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }

        let finalSlug = slug.trim();
        if (!finalSlug) {
            finalSlug = (titleEn || title).trim()
                .toLowerCase()
                .replace(/[^a-z0-9가-힣\s-]/g, '')
                .replace(/\s+/g, '-')
                .substring(0, 50);
            setSlug(finalSlug);
        }

        setIsSaving(true);

        const postData = {
            title,
            title_en: titleEn,
            slug: finalSlug,
            category,
            content,
            content_en: contentEn,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            status: 'published' as const,
            author: 'motive_KJH',
            // views: 0, // Don't reset views on update
            thumbnail_url: thumbnailUrl
        };

        try {
            const url = isEditMode ? '/api/posts/update' : '/api/posts/create';
            const method = isEditMode ? 'PUT' : 'POST';
            const body = isEditMode ? { ...postData, id: editId } : { ...postData, views: 0 };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Failed to save post");
            }

            alert(isEditMode ? "글이 수정되었습니다!" : "글이 성공적으로 발행되었습니다!");
            router.push("/admin/dashboard");

        } catch (error: any) {
            console.error("Save Error:", error);
            alert("저장 실패: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="p-2 -ml-2 text-stone-400 hover:text-stone-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-heading font-bold text-stone-900">
                        {isEditMode ? "글 수정하기" : "새 글 작성"}
                    </h1>
                </div>
                <div className="flex gap-3">
                    {!isEditMode && <Button variant="outline">임시저장</Button>}
                    <Button variant="primary" onClick={handleSubmit} disabled={isSaving} className="flex items-center gap-2">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isEditMode ? "수정완료" : "발행하기"}
                    </Button>
                </div>
            </div>

            {/* Editor Form */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 md:p-8 space-y-6">

                {/* Language Tabs */}
                <div className="flex border-b border-stone-200 mb-6">
                    <button
                        onClick={() => setActiveTab('ko')}
                        className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'ko' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
                    >
                        🇰🇷 한국어 (기본)
                    </button>
                    <button
                        onClick={() => setActiveTab('en')}
                        className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'en' ? 'border-purple-600 text-purple-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
                    >
                        🇺🇸 English
                    </button>
                </div>

                {/* Title & Slug */}
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <Input
                            placeholder={activeTab === 'ko' ? "제목을 입력하세요 (AI 생성 키워드)" : "Enter English Title"}
                            className="text-2xl md:text-3xl font-bold border-none px-0 placeholder:text-stone-300 focus:ring-0 h-auto py-2 flex-1"
                            value={activeTab === 'ko' ? title : titleEn}
                            onChange={(e) => activeTab === 'ko' ? setTitle(e.target.value) : setTitleEn(e.target.value)}
                        />
                        {activeTab === 'ko' && !isEditMode && (
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={handleAiGenerate}
                                disabled={isGenerating}
                                className="flex items-center gap-2 h-10 px-4 self-center bg-purple-600 hover:bg-purple-700 text-white border-none"
                            >
                                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                                AI 자동 완성
                            </Button>
                        )}
                    </div>

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

                {/* Meta Data (Shared) */}
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

                {/* Main Content Editor */}
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">
                        {activeTab === 'ko' ? "본문 내용 (Korean)" : "Content (English)"}
                    </label>

                    {/* Thumbnail Image (Shared) */}
                    {activeTab === 'ko' && (
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-32 h-20 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 flex items-center justify-center">
                                {thumbnailUrl ? (
                                    <img
                                        src={thumbnailUrl}
                                        alt="Cover"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <ImageIcon className="w-6 h-6 text-stone-300" />
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        if (!e.target.files || e.target.files.length === 0) return;
                                        const file = e.target.files[0];
                                        const formData = new FormData();
                                        formData.append("file", file);

                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: formData
                                            });
                                            const data = await res.json();
                                            if (data.url) {
                                                setThumbnailUrl(data.url);
                                                const appendText = `\n\n![${file.name}](${data.url})`;
                                                if (activeTab === 'ko') setContent(prev => prev + appendText);
                                                else setContentEn(prev => prev + appendText);

                                                alert("이미지가 업로드되었습니다.");
                                            } else {
                                                throw new Error(data.error);
                                            }
                                        } catch (err: any) {
                                            alert("이미지 업로드 실패: " + err.message);
                                        }
                                    }}
                                    className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-stone-50 file:text-stone-700 hover:file:bg-stone-100"
                                />
                                <p className="text-xs text-stone-400 mt-1">
                                    이미지는 본문 하단에 추가됩니다.
                                </p>
                            </div>
                        </div>
                    )}

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
                            placeholder={activeTab === 'ko' ? "내용을 입력하세요..." : "Write your content here..."}
                            value={activeTab === 'ko' ? content : contentEn}
                            onChange={(e) => activeTab === 'ko' ? setContent(e.target.value) : setContentEn(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminWritePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminWriteForm />
        </Suspense>
    );
}

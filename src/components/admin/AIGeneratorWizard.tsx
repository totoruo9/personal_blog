"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/design-system/Button'; // Assuming we have this
import { X, RefreshCw, Wand2, FileText, CheckCircle2 } from 'lucide-react';

interface Trend {
    title: string;
    link: string;
    pubDate?: string;
    traffic?: string;
}

interface AIGeneratorWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AIGeneratorWizard({ isOpen, onClose }: AIGeneratorWizardProps) {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [trends, setTrends] = useState<Trend[]>([]);
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
    const [isLoadingTrends, setIsLoadingTrends] = useState(false);
    const [processingStatus, setProcessingStatus] = useState<string>("");

    // Fetch trends on open
    useEffect(() => {
        if (isOpen && step === 1) {
            fetchTrends();
        }
    }, [isOpen, step]);

    const fetchTrends = async () => {
        setIsLoadingTrends(true);
        try {
            const res = await fetch('/api/ai/trends');
            const data = await res.json();
            if (data.trends) {
                setTrends(data.trends);
            }
        } catch (error) {
            console.error("Failed to fetch trends", error);
            setProcessingStatus("트렌드를 불러오는데 실패했습니다.");
        } finally {
            setIsLoadingTrends(false);
        }
    };

    const handleKeywordSelect = (keyword: string) => {
        setSelectedKeyword(keyword);
        setStep(2);
        startGeneration(keyword);
    };

    const startGeneration = async (keyword: string) => {
        try {
            // 1. Scrape
            setProcessingStatus("관련 기사를 검색하고 분석 중입니다... (Google News)");
            const scrapeRes = await fetch('/api/ai/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword })
            });

            if (!scrapeRes.ok) {
                const errData = await scrapeRes.json();
                throw new Error(errData.error || errData.details || "기사 수집 실패");
            }

            const { articles } = await scrapeRes.json();
            setProcessingStatus(`총 ${articles.length}개의 기사를 확보했습니다. AI가 글을 작성 중입니다...`);

            // 2. Generate
            const generateRes = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articles, keyword })
            });

            if (!generateRes.ok) throw new Error("글 작성 실패");

            const { content } = await generateRes.json();

            // Extract title from AI content (usually first line or # heading)
            let extractedTitle = `${keyword} - AI 자동 생성 리포트`;
            const lines = content.split('\n');
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith('# ')) {
                    extractedTitle = trimmed.replace(/^#+\s*/, '');
                    break;
                } else if (trimmed.length > 10 && !trimmed.startsWith('#')) {
                    extractedTitle = trimmed.substring(0, 100);
                    break;
                }
            }

            // Generate slug from keyword
            const generatedSlug = keyword
                .toLowerCase()
                .replace(/[^a-z0-9가-힣\s-]/g, '')
                .replace(/\s+/g, '-')
                .substring(0, 50) + '-' + Date.now().toString(36);

            // 3. Success - Redirect to Editor
            setProcessingStatus("완료! 에디터로 이동합니다.");

            // Store complete data in localStorage
            localStorage.setItem('ai_generated_content', JSON.stringify({
                title: extractedTitle,
                content: content,
                slug: generatedSlug,
                category: '트렌드',  // Default category
                tags: `${keyword}, AI작성, 트렌드`
            }));

            setStep(3);
            setTimeout(() => {
                router.push('/admin/write?mode=ai_generated');
                onClose();
            }, 1000);

        } catch (error: any) {
            console.error(error);
            setProcessingStatus(`오류 발생: ${error.message}`);
            // Allow retry?
            setTimeout(() => {
                setStep(1);
                setProcessingStatus("");
            }, 3000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-border-light flex justify-between items-center bg-stone-50">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-purple-600" />
                        AI 콘텐츠 생성 마법사
                    </h2>
                    <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1">

                    {/* Step 1: Select Trend */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="text-stone-600">작성할 주제(키워드)를 선택해주세요.</p>
                                <Button size="sm" variant="outline" onClick={fetchTrends} disabled={isLoadingTrends}>
                                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingTrends ? 'animate-spin' : ''}`} />
                                    새로고침
                                </Button>
                            </div>

                            {isLoadingTrends ? (
                                <div className="py-20 text-center text-stone-500">
                                    실시간 트렌드를 불러오는 중입니다...
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {trends.map((trend, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleKeywordSelect(trend.title)}
                                            className="text-left p-4 rounded-lg border border-border-light hover:border-purple-300 hover:bg-purple-50 transition-all group"
                                        >
                                            <div className="font-bold text-lg group-hover:text-purple-700">
                                                {idx + 1}. {trend.title}
                                            </div>
                                            {trend.traffic && (
                                                <div className="text-xs text-stone-500 mt-1">
                                                    {trend.traffic}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Processing */}
                    {step === 2 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 rounded-full border-4 border-stone-100"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"></div>
                                <Wand2 className="absolute inset-0 m-auto w-8 h-8 text-purple-600 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">AI가 글을 작성하고 있습니다</h3>
                                <p className="text-stone-500 text-sm max-w-md mx-auto animate-pulse">
                                    {processingStatus}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">작성 완료!</h3>
                                <p className="text-stone-500">
                                    에디터로 이동하여 내용을 확인하세요.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {step === 1 && (
                    <div className="p-4 bg-stone-50 text-xs text-stone-500 text-center border-t border-border-light">
                        Google Trends 기반 실시간 인기 검색어를 제공합니다.
                    </div>
                )}
            </div>
        </div>
    );
}

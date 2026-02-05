"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors text-xs font-bold"
        >
            <span className={language === 'ko' ? "" : "text-stone-300"}>🇰🇷</span>
            <span className="text-stone-300">|</span>
            <span className={language === 'en' ? "" : "text-stone-300"}>🇺🇸</span>
        </button>
    );
}

import Link from "next/link";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border-light bg-white/95 backdrop-blur-md transition-all duration-200">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left: Logo & Main Nav */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-black rounded-sm transform rotate-45 group-hover:rotate-0 transition-transform duration-300 shadow-sm" />
                        <span className="text-xl font-display font-bold italic text-text-primary tracking-tight">
                            THEMANAGEGRAM
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-bold text-text-primary hover:text-blue-600 transition-colors">
                            홈
                        </Link>
                        <Link href="/category" className="text-sm font-medium text-text-secondary hover:text-blue-600 transition-colors">
                            카테고리
                        </Link>
                    </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    {/* Search Trigger */}
                    <button className="p-2 text-text-secondary hover:text-black hover:bg-stone-100 rounded-full transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>

                    {/* Dark Mode (Mock) */}
                    <button className="p-2 text-text-secondary hover:text-black hover:bg-stone-100 rounded-full transition-all hidden sm:block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                    </button>

                    {/* Language Switcher */}
                    <div className="ml-2">
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button className="p-2 md:hidden text-text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    </button>
                </div>
            </div>
        </header>
    );
}

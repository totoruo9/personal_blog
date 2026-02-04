import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border-light bg-background-primary/95 backdrop-blur-md transition-all duration-200">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-8 w-8 bg-earth rounded-sm transform rotate-45 group-hover:rotate-0 transition-transform duration-300 shadow-sm" />
                    <span className="text-xl font-display font-bold italic text-text-primary tracking-tight">
                        THEMANAGEGRAM
                    </span>
                </Link>

                {/* Desktop Nav - Better spacing and hover states */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/food" className="text-sm font-medium text-text-secondary hover:text-earth transition-colors font-body py-2 border-b-2 border-transparent hover:border-earth">
                        Gourmet
                    </Link>
                    <Link href="/trends" className="text-sm font-medium text-text-secondary hover:text-earth transition-colors font-body py-2 border-b-2 border-transparent hover:border-earth">
                        Trends
                    </Link>
                    <Link href="/life" className="text-sm font-medium text-text-secondary hover:text-earth transition-colors font-body py-2 border-b-2 border-transparent hover:border-earth">
                        Lifestyle
                    </Link>
                </nav>

                {/* Actions - Touch targets and visual separation */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex p-1 bg-background-tertiary rounded-full border border-border-light">
                        <button className="px-3 py-1 text-xs font-bold rounded-full bg-white shadow-sm text-text-primary transition-all hover:bg-gray-50">KR</button>
                        <button className="px-3 py-1 text-xs font-bold rounded-full text-text-tertiary hover:text-text-primary transition-all hover:bg-white/50">EN</button>
                    </div>
                    <div className="h-6 w-px bg-border-medium hidden sm:block" />
                    <Button size="sm" variant="ghost" className="hidden sm:inline-flex text-text-secondary hover:text-earth hover:bg-stone-50">
                        Login
                    </Button>
                    {/* FIX: Ensured visual contrast for Subscribe button */}
                    <Button size="sm" variant="primary" className="bg-earth text-white hover:bg-earth-dark shadow-sm">
                        Subscribe
                    </Button>
                </div>
            </div>
        </header>
    );
}

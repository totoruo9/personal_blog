import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/blog/Sidebar";
import { SearchBody } from "@/components/blog/SearchBody";

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-text-primary">
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Main Content (Client) */}
                    <Suspense fallback={<div className="flex-1 py-20 text-center">Loading search...</div>}>
                        <SearchBody />
                    </Suspense>

                    {/* Sidebar (Server) */}
                    <aside className="hidden lg:block w-80 shrink-0">
                        <div className="sticky top-24">
                            <Sidebar />
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}

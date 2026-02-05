import Link from "next/link";
import { LayoutDashboard, PenTool, LogOut, Settings } from "lucide-react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Admin Sidebar */}
            <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex-shrink-0">
                <div className="p-6 border-b border-stone-800">
                    <h1 className="text-xl font-heading font-bold text-white tracking-wider">ADMIN</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        <span>대시보드</span>
                    </Link>
                    <Link href="/admin/write" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
                        <PenTool className="w-5 h-5" />
                        <span>새 글 쓰기</span>
                    </Link>
                    <div className="pt-8 mt-8 border-t border-stone-800">
                        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-stone-800 hover:text-white transition-colors">
                            <Settings className="w-5 h-5" />
                            <span>설정 (준비중)</span>
                        </Link>
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-stone-800 hover:text-white transition-colors text-red-400 hover:text-red-300">
                            <LogOut className="w-5 h-5" />
                            <span>나가기 (홈으로)</span>
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-stone-50 p-6 md:p-10 overflow-y-auto h-screen">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

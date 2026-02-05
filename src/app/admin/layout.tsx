import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${inter.className} min-h-screen bg-stone-50 text-stone-900 font-sans`}>
            {children}
        </div>
    );
}

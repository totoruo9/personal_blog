import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";

export function Footer() {
    return (
        <footer className="bg-background-secondary border-t border-border-medium py-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-10">
                    {/* Brand Section */}
                    <div className="space-y-4 max-w-xs">
                        <h2 className="text-xl font-display font-bold italic text-text-primary">THEMANAGEGRAM</h2>
                        <p className="text-text-secondary font-light text-sm leading-relaxed">
                            미식, 라이프스타일, 그리고 최신 트렌드에 대한 깊이 있는 인사이트를 전합니다.
                        </p>
                    </div>

                    {/* Right Side: Navigation & Contact */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                        {/* Explore (Horizontal) */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-sm">둘러보기</h4>
                            <ul className="flex gap-6 text-sm text-text-secondary">
                                <li><Link href="/category/food" className="hover:text-earth transition-colors">맛집 탐방</Link></li>
                                <li><Link href="/category/trends" className="hover:text-earth transition-colors">트렌드 이슈</Link></li>
                                <li><Link href="/category/life" className="hover:text-earth transition-colors">라이프스타일</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-sm">문의하기</h4>
                            <p className="text-sm text-text-secondary">contact@themanagegram.com</p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-tertiary">
                    <p>© 2024 THEMANAGEGRAM. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-text-primary">개인정보 처리방침</Link>
                        <Link href="/terms" className="hover:text-text-primary">이용약관</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

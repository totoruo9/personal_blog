import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";

export function Footer() {
    return (
        <footer className="bg-background-secondary border-t border-border-medium pt-16 pb-8">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="md:col-span-1 space-y-6">
                        <h2 className="text-xl font-display font-bold italic text-text-primary">THEMANAGEGRAM</h2>
                        <p className="text-text-secondary font-light text-sm leading-relaxed max-w-xs">
                            미식, 라이프스타일, 그리고 최신 트렌드에 대한 깊이 있는 인사이트를 전합니다.
                        </p>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold text-sm">둘러보기</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><Link href="/food" className="hover:text-earth transition-colors">맛집 탐방</Link></li>
                            <li><Link href="/trends" className="hover:text-earth transition-colors">트렌드 이슈</Link></li>
                            <li><Link href="/life" className="hover:text-earth transition-colors">라이프스타일</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold text-sm">소셜 미디어</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><Link href="#" className="hover:text-earth transition-colors">인스타그램</Link></li>
                            <li><Link href="#" className="hover:text-earth transition-colors">트위터</Link></li>
                            <li><Link href="#" className="hover:text-earth transition-colors">텔레그램 채널</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold text-sm">뉴스레터</h4>
                        <p className="text-xs text-text-secondary">최신 스토리를 이메일로 받아보세요.</p>
                        <div className="flex gap-2">
                            <Input placeholder="이메일 주소" className="bg-white border-border-medium h-10 text-sm" />
                            {/* FIX: Ensured contrast for Join button */}
                            <Button size="sm" variant="primary" className="bg-earth text-white hover:bg-earth-dark h-10 px-4">
                                구독
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-tertiary">
                    <p>© 2024 THEMANAGEGRAM. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-text-primary">개인정보 처리방침</Link>
                        <Link href="#" className="hover:text-text-primary">이용약관</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

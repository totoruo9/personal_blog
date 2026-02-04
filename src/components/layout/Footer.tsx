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
                            Curated insights on gourmet dining, lifestyle trends, and modern living.
                        </p>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold text-sm">Explore</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><Link href="/gourmet" className="hover:text-earth transition-colors">Gourmet</Link></li>
                            <li><Link href="/trends" className="hover:text-earth transition-colors">Trends</Link></li>
                            <li><Link href="/lifestyle" className="hover:text-earth transition-colors">Lifestyle</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold text-sm">Connect</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><Link href="#" className="hover:text-earth transition-colors">Instagram</Link></li>
                            <li><Link href="#" className="hover:text-earth transition-colors">Twitter</Link></li>
                            <li><Link href="#" className="hover:text-earth transition-colors">Telegram Channel</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold text-sm">Newsletter</h4>
                        <p className="text-xs text-text-secondary">Stay updated with our latest stories.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Email address" className="bg-white border-border-medium h-10 text-sm" />
                            {/* FIX: Ensured contrast for Join button */}
                            <Button size="sm" variant="primary" className="bg-earth text-white hover:bg-earth-dark h-10 px-4">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-tertiary">
                    <p>© 2024 THEMANAGEGRAM. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-text-primary">Privacy Policy</Link>
                        <Link href="#" className="hover:text-text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

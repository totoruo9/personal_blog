"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/design-system/Input";
import { Button } from "@/components/design-system/Button";

import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert("로그인 실패: " + error.message);
            } else {
                // Successful login
                console.log("Login User:", data.user);
                router.push("/admin/dashboard");
            }
        } catch (error: any) {
            alert("오류 발생: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-border-light w-full max-w-md">
                <h1 className="text-2xl font-heading font-bold mb-6 text-center">관리자 로그인</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-text-secondary mb-2">이메일</label>
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text-secondary mb-2">비밀번호</label>
                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                        {isLoading ? "로그인 중..." : "로그인"}
                    </Button>
                    <p className="text-xs text-center text-text-tertiary mt-4">
                        관리자 계정으로 로그인해주세요.
                    </p>
                </form>
            </div>
        </div>
    );
}

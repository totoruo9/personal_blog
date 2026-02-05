"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/design-system/Input";
import { Button } from "@/components/design-system/Button";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Auth Check
        if (email === "admin@example.com" && password === "password") {
            // Ideally set a cookie or token here
            alert("로그인 성공");
            router.push("/admin/dashboard");
        } else {
            alert("이메일 또는 비밀번호가 올바르지 않습니다. (admin@example.com / password)");
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
                            placeholder="admin@example.com"
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
                    <Button type="submit" variant="primary" className="w-full">
                        로그인
                    </Button>
                    <p className="text-xs text-center text-text-tertiary mt-4">
                        데모 계정: admin@example.com / password
                    </p>
                </form>
            </div>
        </div>
    );
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-text-primary">
            <Header />
            <main className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
                <h1 className="text-3xl font-bold font-heading mb-8">이용약관</h1>
                <div className="prose prose-stone max-w-none">
                    <h3>제1조 (목적)</h3>
                    <p>이 약관은 THEMANAGEGRAM(이하 "회사")이 제공하는 블로그 서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.</p>

                    <h3>제2조 (정의)</h3>
                    <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                    <ul>
                        <li>"서비스"라 함은 구현되는 단말기(PC, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 "회원"이 이용할 수 있는 관련 제반 서비스를 의미합니다.</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}

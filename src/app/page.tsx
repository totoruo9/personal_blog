import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";
import { Input } from "@/components/design-system/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/design-system/Card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import {
  ArrowRight,
  Clock,
  MapPin,
  TrendingUp,
  ChevronRight,
  Mail,
  Search,
  Star
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-secondary font-sans text-text-primary">
      <Header />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Featured Content Area */}
        <div className="container mx-auto px-4 md:px-6 py-16 space-y-24">

          {/* Section 1: Categories & Search */}
          <section className="flex flex-col md:flex-row gap-6 justify-between items-end border-b border-border-light pb-8">
            <div className="space-y-4 w-full md:w-auto">
              <h2 className="font-heading font-bold text-lg text-text-secondary uppercase tracking-widest block">토픽 둘러보기</h2>
              <div className="flex flex-wrap gap-2">
                <button className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-bold text-sm shadow-sm transition-transform hover:-translate-y-0.5">
                  전체 글
                </button>
                <button className="px-5 py-2.5 rounded-full bg-white border border-border-medium text-text-secondary font-bold text-sm hover:bg-stone-50 hover:border-earth hover:text-earth transition-all">
                  맛집 가이드
                </button>
                <button className="px-5 py-2.5 rounded-full bg-white border border-border-medium text-text-secondary font-bold text-sm hover:bg-stone-50 hover:border-earth hover:text-earth transition-all">
                  IT 트렌드
                </button>
                <button className="px-5 py-2.5 rounded-full bg-white border border-border-medium text-text-secondary font-bold text-sm hover:bg-stone-50 hover:border-earth hover:text-earth transition-all">
                  라이프스타일
                </button>
              </div>
            </div>

            <div className="w-full md:w-72 relative">
              <Input
                placeholder="관심있는 글 검색..."
                className="pl-10 rounded-full bg-white border-border-medium focus-visible:ring-earth"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            </div>
          </section>

          {/* Section 2: Featured Article (Horizontal Card) */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 text-earth" />
              <h3 className="font-heading font-bold text-2xl">에디터의 추천 (Editor's Pick)</h3>
            </div>

            <Card className="overflow-hidden bg-white border-border-light hover:shadow-lg transition-all duration-300 md:grid md:grid-cols-12 group cursor-pointer border-none shadow-md">
              <div className="md:col-span-7 relative min-h-[300px] md:min-h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-stone-300 transition-transform duration-700 group-hover:scale-105">
                  {/* Placeholder for real image */}
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1543362906-ac1b4526fb1d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <Badge className="absolute top-6 left-6 bg-white/90 text-earth backdrop-blur-sm shadow-sm border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Gourmet
                </Badge>
              </div>
              <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-white relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xs font-bold text-text-tertiary uppercase tracking-widest">
                    <Clock className="w-4 h-4" />
                    <span>5분 길이</span>
                    <span>•</span>
                    <span>2024년 2월 4일</span>
                  </div>

                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary leading-tight group-hover:text-earth transition-colors">
                    서울의 숨겨진 오마카세 골목 탐방
                  </h2>

                  <p className="text-text-secondary leading-relaxed text-lg">
                    강남과 홍대의 화려한 거리 뒤편, 좁은 골목 속에 숨겨진 진정한 장인들의 스시 오마카세를 찾아 떠나는 미식 여행.
                  </p>

                  <div className="pt-4">
                    <Button variant="link" className="px-0 text-earth font-bold text-base group-hover:translate-x-2 transition-transform">
                      전체 읽기 <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Section 3: Latest Articles Grid */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-earth" />
                <h3 className="font-heading font-bold text-2xl">최신 스토리</h3>
              </div>
              <Button variant="ghost" className="text-text-secondary hover:text-earth">전체 보기 <ChevronRight className="w-4 h-4 ml-1" /></Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Article 1 */}
              <Card className="bg-white border-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden h-full flex flex-col">
                <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-stone-900 text-white border-none">Tech</Badge>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-xl leading-snug group-hover:text-earth transition-colors">
                      AI가 바꾸는 일상의 생산성 혁명
                    </h4>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      생성형 AI 모델들이 우리가 알지 못하는 사이에 아침 루틴과 업무 방식을 어떻게 조용히 변화시키고 있는지 알아봅니다.
                    </p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border-light">
                    <span className="text-xs text-text-tertiary font-bold">2024년 1월 28일</span>
                    <span className="text-xs text-text-tertiary">3분 길이</span>
                  </div>
                </div>
              </Card>

              {/* Article 2 */}
              <Card className="bg-white border-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden h-full flex flex-col">
                <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502086223501-1eec1da0346a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-stone-900 text-white border-none">Life</Badge>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-xl leading-snug group-hover:text-earth transition-colors">
                      미니멀리즘: 복잡한 마음을 비우는 기술
                    </h4>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      물리적인 공간을 정돈하는 것이 어떻게 정신적 명료함과 집중력을 되찾는 첫걸음이 되는지 탐구합니다.
                    </p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border-light">
                    <span className="text-xs text-text-tertiary font-bold">2024년 1월 25일</span>
                    <span className="text-xs text-text-tertiary">6분 길이</span>
                  </div>
                </div>
              </Card>

              {/* Article 3 */}
              <Card className="bg-white border-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden h-full flex flex-col">
                <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-stone-900 text-white border-none">Food</Badge>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-xl leading-snug group-hover:text-earth transition-colors">
                      집밥의 재발견: 레스토랑보다 맛있는 한 끼
                    </h4>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      신선한 로컬 재료로 직접 준비하는 식사가 주는 소박하지만 확실한 행복을 다시금 깨닫습니다.
                    </p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border-light">
                    <span className="text-xs text-text-tertiary font-bold">2024년 1월 22일</span>
                    <span className="text-xs text-text-tertiary">4분 길이</span>
                  </div>
                </div>
              </Card>
            </div>
          </section>



        </div>
      </main>

      <Footer />
    </div>
  );
}

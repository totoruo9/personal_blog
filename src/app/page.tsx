import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/blog/HeroSlider";
import { PostCard } from "@/components/blog/PostCard";
import { FeaturedSeries } from "@/components/blog/FeaturedSeries";
import { Sidebar } from "@/components/blog/Sidebar";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-text-primary">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* =========================================
              Left Column (Main Content) - w-[70%]
             ========================================= */}
          <div className="flex-1 min-w-0 space-y-16">

            {/* 1. Hero Slider */}
            <section>
              <HeroSlider />
            </section>

            {/* 2. Ranking / Weekly Popular */}
            <section>
              <div className="flex items-end justify-between mb-4 border-b border-black/10 pb-4">
                <h2 className="text-xl font-bold font-heading text-black">🔥 이번 주 인기글</h2>
              </div>
              <div className="flex flex-col">
                {/* Ranked List Items */}
                <PostCard
                  variant="ranked-list"
                  rank={1}
                  title="두산에너빌리티 주가 전망: SMR과 AI 데이터센터 수혜주?"
                  category="머니스토리"
                  slug="stock-doosan"
                  coverImage="https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop"
                />
                <PostCard
                  variant="ranked-list"
                  rank={2}
                  title="메뉴 3개에 만 원도 안 되는 칼국수집 (★★☆)"
                  category="뚱방의 이로이로"
                  slug="food-review"
                  coverImage="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1000&auto=format&fit=crop"
                />
                <PostCard
                  variant="ranked-list"
                  rank={3}
                  title="치아를 뽑고 꼭 임플란트를 해야 할까? | 임플란트 vs 브릿지"
                  category="아몬드 3알"
                  slug="dental-care"
                  coverImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop"
                />
                <PostCard
                  variant="ranked-list"
                  rank={4}
                  title="전국에서 가장 유명한 포브스 선정! 화덕 고등어구이 맛집"
                  category="켈리의 맛집탐방"
                  slug="fish-grill"
                  coverImage="https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?q=80&w=1000&auto=format&fit=crop"
                />
              </div>
            </section>

            {/* 3. Feed Section (Replaces Recent Posts) */}
            <section className="space-y-8">
              {/* Category Tabs */}
              {/* Recent Posts Heading */}
              <h2 className="text-xl font-bold font-heading text-black mb-4">최근 올라온 글</h2>

              {/* Pill Menu for Categories */}
              <div className="flex justify-start mb-6">
                <div className="inline-flex items-center p-1.5 rounded-full border border-border-light bg-white shadow-sm gap-1 overflow-x-auto hide-scrollbar">
                  <button className="px-4 py-1.5 rounded-full bg-text-primary text-white text-sm font-bold whitespace-nowrap shadow-sm">
                    전체
                  </button>
                  <button className="px-4 py-1.5 rounded-full text-text-secondary hover:bg-stone-100 hover:text-text-primary text-sm font-medium whitespace-nowrap transition-colors">
                    여행·맛집
                  </button>
                  <button className="px-4 py-1.5 rounded-full text-text-secondary hover:bg-stone-100 hover:text-text-primary text-sm font-medium whitespace-nowrap transition-colors">
                    리빙·스타일
                  </button>
                  <button className="px-4 py-1.5 rounded-full text-text-secondary hover:bg-stone-100 hover:text-text-primary text-sm font-medium whitespace-nowrap transition-colors">
                    가족·연애
                  </button>
                  <button className="px-4 py-1.5 rounded-full text-text-secondary hover:bg-stone-100 hover:text-text-primary text-sm font-medium whitespace-nowrap transition-colors">
                    직장·자기계발
                  </button>
                  <button className="px-4 py-1.5 rounded-full text-text-secondary hover:bg-stone-100 hover:text-text-primary text-sm font-medium whitespace-nowrap transition-colors">
                    시사·지식
                  </button>
                </div>
              </div>

              {/* Top Grid (2 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PostCard
                  variant="feed-grid"
                  title="부산 현지인은 광안리 안 갑니다, 참돔 유비끼의 성지 '창현수산'"
                  tags={['부산최고횟집', '부산토박이횟집', '참돔유비끼', '창현수산']}
                  coverImage="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop"
                  date="1일 전"
                  views={9}
                  comments={10}
                  category="부산 토박이 아저씨의 맛집 에세이"
                  author="부산토박이"
                  slug="busan-sashimi"
                />
                <PostCard
                  variant="feed-grid"
                  title="[강릉 출장 기록] 아내와 함께한 소박하지만 든든한 한 끼, '민영식당' 제육볶음 리뷰"
                  tags={['강릉맛집', '제육볶음', '출장기록', '부부여행']}
                  coverImage="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop"
                  date="4일 전"
                  views={3}
                  comments={1}
                  category="디노새"
                  author="디노새"
                  slug="gangneung-pork"
                />
              </div>

              {/* List Feed */}
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <PostCard
                    key={index}
                    variant="feed-list"
                    title={`[예시 포스트 ${index + 1}] 곤드레밥 맛집, 마루곳간 - 건강한 한 끼 식사`}
                    excerpt="지난번에 산 TV가 오늘 오후 2시에 설치하러 올 거라는 연락을 받고 재활운동을 끝내고 나니 12시다. 집에 가서 점심 먹고 집안 음식냄새를 없애려면..."
                    coverImage={`https://images.unsplash.com/photo-${[
                      "1626804475297-411db1426433",
                      "1507525428034-b723cf961d3e",
                      "1459156212016-c812468e2115",
                      "1559339352-11d035aa65de",
                      "1565299624946-b28f40a0ae38",
                      "1611974765270-ca1258634369",
                      "1555126634-323283e090fa",
                      "1606811841689-23dfddce3e95",
                      "1519708227418-c8fd9a3a2720",
                      "1626804475297-411db1426433"
                    ][index % 10]}?q=80&w=1000&auto=format&fit=crop`}
                    date={`${index + 1}일 전`}
                    views={50 + index * 12}
                    comments={8 + index}
                    author="데레사의 꿈꾸는 세상"
                    category={["여행·맛집", "리빙·스타일", "가족·연애"][index % 3]}
                    slug={`post-${index}`}
                  />
                ))}
              </div>

              {/* Pagination (Keeping existing style or mock) */}
              <div className="mt-12 flex justify-center gap-2">
                <button className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center">1</button>
                <button className="w-10 h-10 rounded-full hover:bg-stone-200 text-text-secondary font-medium flex items-center justify-center transition-colors">2</button>
                <button className="w-10 h-10 rounded-full hover:bg-stone-200 text-text-secondary font-medium flex items-center justify-center transition-colors">3</button>
                <span className="w-10 h-10 flex items-center justify-center text-text-tertiary">...</span>
                <button className="w-10 h-10 rounded-full hover:bg-stone-200 text-text-secondary font-medium flex items-center justify-center transition-colors">10</button>
              </div>
            </section>

          </div>

          {/* =========================================
              Right Column (Sidebar) - w-[30%]
             ========================================= */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

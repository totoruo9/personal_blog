import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/blog/HeroSlider";
import { PostCard } from "@/components/blog/PostCard";
import { Sidebar } from "@/components/blog/Sidebar";
import { getPosts, getHybridPosts } from "@/lib/posts";

// Revalidate every minute
export const revalidate = 60;

export default async function Home() {
  const posts = await getHybridPosts(); // Recent posts
  const popularPosts = await getPosts(4, 'views'); // Popular posts

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

            {/* 2. Ranking / Weekly Popular (Static Mock for Showcase) */}
            <section>
              <div className="flex items-end justify-between mb-4 border-b border-black/10 pb-4">
                <h2 className="text-xl font-bold font-heading text-black">🔥 이번 주 인기글</h2>
              </div>
              <div className="flex flex-col">
                {popularPosts.length > 0 ? (
                  popularPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      variant="ranked-list"
                      rank={index + 1}
                      title={post.title}
                      titleEn={post.title_en}
                      category={post.category}
                      slug={post.slug}
                      thumbnailUrl={post.thumbnail_url}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center text-stone-500 bg-stone-50 rounded-lg">
                    아직 인기 글이 충분하지 않습니다.
                  </div>
                )}
              </div>
            </section>

            {/* 3. Feed Section (Real Data) */}
            <section className="space-y-8">
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

              {/* List Feed */}
              <div className="space-y-2">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    variant="feed-list"
                    title={post.title}
                    titleEn={post.title_en}
                    excerpt={post.content.replace(/<[^>]*>/g, '').substring(0, 100) + "..."}
                    excerptEn={post.content_en?.replace(/<[^>]*>/g, '').substring(0, 100) + "..."}
                    thumbnailUrl={post.thumbnail_url}
                    date={new Date(post.created_at).toLocaleDateString()}
                    views={post.views || 0}
                    comments={0}
                    category={post.category}
                    slug={post.slug}
                    author={post.author || "Admin"}
                  />
                ))}
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

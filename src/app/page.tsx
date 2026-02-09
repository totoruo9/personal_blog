import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/blog/HeroSlider";
import { PostCard } from "@/components/blog/PostCard";
import { Sidebar } from "@/components/blog/Sidebar";
import { getPosts, getHybridPosts, getHeroPosts } from "@/lib/posts";
import { FeedSection } from "@/components/blog/FeedSection"; // Import added

// Revalidate every minute
export const revalidate = 60;

export default async function Home() {
  const posts = await getHybridPosts(); // Recent posts
  const popularPosts = await getPosts(4, 'views'); // Popular posts
  const heroPosts = await getHeroPosts(); // Top 3 Hero posts

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
              <HeroSlider posts={heroPosts} />
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

            {/* 3. Feed Section (Real Data with Client Filtering) */}
            <FeedSection initialPosts={posts} />

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

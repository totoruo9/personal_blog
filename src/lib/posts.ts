
import { supabase, Post } from './supabase';
import { MOCK_POSTS } from './mock-data';

export async function getPosts(limit = 20, sortBy: 'created_at' | 'views' = 'created_at'): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*, comments(count)')
        .order(sortBy, { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return (data?.map(post => ({
        ...post,
        comments: post.comments?.[0]?.count || 0
    })) as Post[]) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .select('*, comments(count)')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') {
            console.error("Error fetching post by slug:", error);
        }
        return null;
    }

    const post = {
        ...data,
        comments: data.comments?.[0]?.count || 0
    };

    return post as Post;
}

// Helper to get unique tags from recent posts (since Supabase doesn't have easy distinct array column fetch yet)
export async function getPopularTags(limit = 10): Promise<string[]> {
    const { data } = await supabase
        .from('posts')
        .select('tags')
        .limit(50); // Analyze last 50 posts

    if (!data) return [];

    const tagCounts: Record<string, number> = {};
    data.forEach(post => {
        if (Array.isArray(post.tags)) {
            post.tags.forEach((tag: string) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });

    return Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(([tag]) => tag);
}

export async function incrementDailyStats() {
    const { error } = await supabase.rpc('increment_daily_stats');
    if (error) {
        console.error("Error incrementing stats:", error);
    }
}

export async function getTotalStats() {
    // 1. Get Today's Stats
    const todayStr = new Date().toISOString().split('T')[0];
    const { data: todayData, error: todayError } = await supabase
        .from('daily_stats')
        .select('visitors, page_views')
        .eq('date', todayStr)
        .single();

    // 2. Get Total All Time Stats
    // We can sum up the 'page_views' column from daily_stats
    const { data: totalData, error: totalError } = await supabase
        .from('daily_stats')
        .select('page_views');

    if (todayError && todayError.code !== 'PGRST116') {
        console.error("Error fetching today stats:", todayError);
    }

    // Calculate total
    const totalViews = totalData?.reduce((acc, curr) => acc + (curr.page_views || 0), 0) || 0;
    const todayViews = todayData?.page_views || 0; // Usage page_views for "Today" count as well for consistency

    // Fallback? If zero, maybe return 0.
    return { visitors: totalViews, today: todayViews };
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'views'>) {
    return await supabase.from('posts').insert([post]);
}

export async function deletePost(id: string) {
    return await supabase.from('posts').delete().eq('id', id);
}

// Fallback helper to mix real and mock data if needed during transition (Optional)
export async function getHybridPosts(): Promise<Post[]> {
    const realPosts = await getPosts();
    // if (realPosts.length === 0) {
    //     // Return mock data adapted to Post type if real DB is empty
    //     return MOCK_POSTS.map(p => ({
    //         ...p,
    //         id: p.id || 'mock-id',
    //         created_at: p.date,
    //         status: 'published',
    //         tags: p.tags || [],
    //         content_en: ''
    //     })) as unknown as Post[];
    // }
    return realPosts;
}

export async function getPostsByCategory(category: string, page = 1, limit = 30): Promise<{ data: Post[], count: number }> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Handle "All" case
    if (category === '전체' || category === 'all') {
        const { data, count, error } = await supabase
            .from('posts')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error("Error fetching all posts:", error);
            return { data: [], count: 0 };
        }
        return { data: (data as Post[]) || [], count: count || 0 };
    }

    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('category', category)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error(`Error fetching posts for category ${category}:`, error);
        return { data: [], count: 0 };
    }

    return { data: (data as Post[]) || [], count: count || 0 };
}
export async function getHeroPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*, comments(count)')
        .order('views', { ascending: false })
        .limit(3);

    if (error) {
        console.error("Error fetching hero posts:", error);
        return [];
    }

    // Map and sort effectively if needed (Supabase order by views is good for now)
    // We can also sort by (views + comments) here if we fetched more
    let posts = (data?.map(post => ({
        ...post,
        comments: post.comments?.[0]?.count || 0
    })) as Post[]) || [];

    // Optional: Re-sort by (views + comments) in memory to be more accurate "popularity"
    posts.sort((a, b) => ((b.views || 0) + (b.comments || 0)) - ((a.views || 0) + (a.comments || 0)));

    return posts;
}

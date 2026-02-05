
import { supabase, Post } from './supabase';
import { MOCK_POSTS } from './mock-data';

export async function getPosts(limit = 20, sortBy: 'created_at' | 'views' = 'created_at'): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortBy, { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    // Map Supabase data to Post type if needed (or ensure schema matches)
    return (data as Post[]) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') { // Ignore 'JSON object requested, multiple (or no) rows returned' for fallback check
            console.error("Error fetching post by slug:", error);
        }
        return null;
    }

    return data as Post;
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

export async function getTotalStats() {
    // For 'Total Visitors', we don't have analytics yet. Use total views sum as proxy or just count.
    // Sum views
    const { data, error } = await supabase
        .from('posts')
        .select('views');

    if (error || !data) return { visitors: 842912, today: 1248 }; // Fallback to mock if error

    const totalViews = data.reduce((acc, curr) => acc + (curr.views || 0), 0);
    return { visitors: totalViews, today: 1248 }; // 'today' still mock without time-series data
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

export async function getPostsByCategory(category: string, limit = 20): Promise<Post[]> {
    // Handle "All" case
    if (category === '전체' || category === 'all') {
        return getPosts(limit);
    }

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error(`Error fetching posts for category ${category}:`, error);
        return [];
    }

    return (data as Post[]) || [];
}


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Post {
  id: string;
  title: string;
  title_en?: string;
  content: string;
  content_en?: string;
  created_at: string;
  status: 'draft' | 'published';
  category?: string;
  thumbnail_url?: string;
  tags?: string[];
  author?: string; // e.g. 'admin'
  views?: number;
  comments?: number;
  slug: string;
}

export type Comment = {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  is_secret: boolean;
  created_at: string;
  password?: string; // Only used for verification, assuming simple storage for now
};

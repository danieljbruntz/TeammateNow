export const runtime = 'experimental-edge';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import PostCard from '../components/PostCard';

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data ?? []);
      }
    }
    load();
  }, []);

  return (
    <>
      <Head>
        <title>TeammateNow Feed</title>
      </Head>
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Ideas seeking teammates</h1>
        {posts.length === 0 && <p>No posts yet.</p>}
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
} 

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
}

interface FeedPageProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<FeedPageProps> = async () => {
  const { data: posts = [], error } = await supabase
    .from<Post>('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching posts:', error.message);
  }

  return {
    props: {
      posts: posts ?? [],
    },
  };
};

export default function FeedPage({ posts }: FeedPageProps) {
  return (
    <>
      <Head>
        <title>TeammateNow Feed</title>
      </Head>
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Ideas seeking teammates</h1>
        {posts.length === 0 && <p>No posts yet.</p>}
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded-md hover:shadow">
              <Link href={`/post/${post.id}`} className="text-xl font-semibold hover:underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.created_at).toLocaleString()}
              </p>
              <p className="mt-2 whitespace-pre-line">{post.body.slice(0, 160)}{post.body.length > 160 ? '…' : ''}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
} 
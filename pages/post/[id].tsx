import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export const runtime = 'experimental-edge';

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
}

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
      if (!error) setPost(data as Post);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  const handleApply = async () => {
    if (!user || !post) return router.push('/login');
    setErrorMsg('');
    setApplying(true);
    const { error } = await supabase.from('applications').insert({ post_id: post.id, applicant_id: user.id });
    setApplying(false);
    if (!error) {
      setApplied(true);
    } else {
      console.error('Apply error:', error);
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  if (loading) return <p className="p-4">Loading…</p>;
  if (!post) return <p className="p-4">Post not found.</p>;

  return (
    <main className="max-w-2xl mx-auto p-4 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{new Date(post.created_at).toLocaleString()}</p>
      <p className="whitespace-pre-line mb-8">{post.body}</p>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      {applied ? (
        <p className="text-green-600 font-medium">You have applied to this idea!</p>
      ) : (
        <button
          onClick={handleApply}
          disabled={applying}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {applying ? 'Applying…' : "I'm interested"}
        </button>
      )}
    </main>
  );
} 
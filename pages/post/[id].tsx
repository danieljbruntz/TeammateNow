import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../../components/Footer';

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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header rendered globally in _app */}
      <main className="pt-20 px-4">
        <div className="max-w-2xl mx-auto py-16">
          <p className="text-center text-gray-600">Loading…</p>
        </div>
      </main>
      <Footer />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header rendered globally in _app */}
      <main className="pt-20 px-4">
        <div className="max-w-2xl mx-auto py-16">
          <p className="text-center text-gray-600">Post not found.</p>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header rendered globally in _app */}
      <main className="pt-20 px-4">
        <div className="max-w-2xl mx-auto py-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-6">{new Date(post.created_at).toLocaleString()}</p>
            <p className="whitespace-pre-line text-gray-700 leading-relaxed mb-8">{post.body}</p>
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
            {applied ? (
              <p className="text-green-600 font-medium">You have applied to this idea!</p>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {applying ? 'Applying…' : "I'm interested"}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 
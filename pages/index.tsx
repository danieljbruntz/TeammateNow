import Head from 'next/head';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import PostCard from '../components/PostCard';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export const runtime = 'experimental-edge';

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, [user]);

  async function fetchPosts() {
    try {
      console.log('Fetching posts...');
      
      // If no user, just show empty state
      if (!user) {
        console.log('No user authenticated, showing empty state');
        setPosts([]);
        setLoading(false);
        return;
      }
      
      // Try simple query first
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        // If it's an auth error, just return empty array instead of crashing
        if (error.code === 'PGRST301' || error.message.includes('authentication')) {
          setPosts([]);
          return;
        }
        throw error;
      }
      
      console.log('Posts fetched successfully:', data);
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Don't crash the app, just show empty state
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>TeammateNow - Find Your Next Collaborator</title>
        <meta name="description" content="Connect with innovators, share ideas, and build amazing projects together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Next
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Collaborator</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect with innovators, share your ideas, and build amazing projects together. 
              Turn your vision into reality with the right team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/new" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                  Share Your Idea
                </Link>
              ) : (
                <button 
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Explore Ideas
                </button>
              )}
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                How It Works
              </button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{posts.length}+</div>
              <div className="text-gray-600">Ideas Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-gray-600">Possibilities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Collaboration</div>
            </div>
          </div>
        </section>

        {/* Ideas Feed */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ideas Seeking Teammates
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover innovative projects and connect with passionate creators looking for collaborators
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                {user ? (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No ideas yet</h3>
                    <p className="text-gray-600 mb-6">Be the first to share your innovative project idea!</p>
                    <Link href="/new" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Share Your Idea
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign in to see ideas</h3>
                    <p className="text-gray-600 mb-6">Join the community to discover innovative projects and connect with collaborators!</p>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Collaborating?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join TeammateNow and connect with innovators from around the world
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                Sign Up with GitHub
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold">TeammateNow</span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting innovators and building the future together
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, signInWithGithub, signOut, isLoading } = useAuth();

  return (
    <header className="border-b mb-6 p-4">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">TeammateNow</Link>
        {!isLoading && (
          user ? (
            <div className="flex items-center gap-4">
              <Link href="/new" className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                + New Post
              </Link>
              <button onClick={signOut} className="text-sm underline">Sign out</button>
            </div>
          ) : (
            <button onClick={signInWithGithub} className="px-3 py-1 rounded bg-black text-white hover:bg-gray-800">
              Sign in with GitHub
            </button>
          )
        )}
      </div>
    </header>
  );
} 
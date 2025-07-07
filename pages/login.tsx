import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { user, signInWithGithub, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <button
        onClick={signInWithGithub}
        className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
      >
        Sign in with GitHub
      </button>
    </main>
  );
} 
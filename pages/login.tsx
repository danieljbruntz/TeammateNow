import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { user, signInWithGithub, signInWithEmail, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    const result = await signInWithEmail(email.trim(), password);
    if (result && 'error' in result && result.error) {
      setErrorMsg(result.error);
    }
    setSubmitting(false);
  }

  if (isLoading) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>

      {/* Email sign-in form */}
      <form onSubmit={handleEmailSignIn} className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50">
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="flex flex-col items-center gap-4">
        <span className="text-gray-500 text-sm">or</span>
        <button
          onClick={signInWithGithub}
          className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
        <p className="text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a></p>
      </div>
    </main>
  );
} 
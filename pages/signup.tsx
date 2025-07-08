import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';

export default function SignUpPage() {
  const { user, signUpWithEmail, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      // Only redirect to setup if email is confirmed
      if (user.email_confirmed_at) {
        router.replace('/setup-profile');
      }
    }
  }, [user, isLoading, router]);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMsg('Passwords do not match');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    const result = await signUpWithEmail(email.trim(), password);
    if (result && 'error' in result && result.error) {
      setErrorMsg(result.error);
    } else {
      // Show appropriate message based on whether user has session or needs confirmation
      if (!user) {
        setErrorMsg('Account created! Check your email to confirm your account before continuing.');
      }
    }
    setSubmitting(false);
  }

  if (isLoading) return null;

  return (
    <>
      <Head>
        <title>Sign up - TeammateNow™</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input id="confirm" type="password" required value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50">
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
        <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a></p>
      </main>
    </>
  );
} 
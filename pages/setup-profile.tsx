import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/router';

export default function SetupProfilePage() {
  return (
    <ProtectedRoute>
      <InnerPage />
    </ProtectedRoute>
  );
}

function InnerPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Check if email is confirmed
  useEffect(() => {
    if (user && !user.email_confirmed_at) {
      setErrorMsg('Please confirm your email address before setting up your profile.');
      setLoading(false);
      return;
    }
  }, [user]);

  // Fetch existing profile data
  useEffect(() => {
    async function fetchProfile() {
      if (!user || !user.email_confirmed_at) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setErrorMsg('Unable to load profile.');
      } else if (data) {
        setUsername(data.username || '');
        if (data.avatar_url) {
          setAvatarPreview(data.avatar_url);
        }
      }
      setLoading(false);
    }
    fetchProfile();
  }, [user]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Avatar file must be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Avatar must be an image file');
        return;
      }
      
      setAvatarFile(file);
      setErrorMsg('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!user?.email_confirmed_at) {
      setErrorMsg('Please confirm your email address first.');
      return;
    }
    
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let avatarUrl = null;
      
      // Upload avatar file if provided
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}.${fileExt}`;
        const filePath = `avatars/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        
        avatarUrl = urlData.publicUrl;
      }
      
      const updates: { username?: string; avatar_url?: string | null } = {};
      if (username.trim()) updates.username = username.trim();
      if (avatarUrl) updates.avatar_url = avatarUrl;

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }
      
      setSuccessMsg('Profile updated!');
      // Notify header to refresh profile data
      window.dispatchEvent(new CustomEvent('profileUpdated'));
      // After a short delay, navigate home
      setTimeout(() => router.replace('/'), 1000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setErrorMsg(error.message || 'Failed to update profile');
    }

    setSubmitting(false);
  }

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </main>
    );
  }
  
  if (user && !user.email_confirmed_at) {
    return (
      <>
        <Head>
          <title>Confirm your email - TeammateNow™</title>
        </Head>
        <main className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Check your email</h1>
            <p className="text-gray-600 mb-6">
              We sent a confirmation link to <strong>{user.email}</strong>. 
              Please click the link in that email to continue setting up your profile.
            </p>
            <button
              onClick={() => router.replace('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Back to Home
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Set up your profile - TeammateNow™</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4">
        <h1 className="text-2xl font-semibold">Complete your profile</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Avatar (optional)</label>
            {avatarPreview && (
              <div className="mb-3 flex justify-center">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
            )}
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG/GIF</p>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {submitting ? 'Saving…' : 'Save'}
          </button>
        </form>
      </main>
    </>
  );
} 
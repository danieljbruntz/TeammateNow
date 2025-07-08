import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string } | void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error?: string } | void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get current session immediately
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth event:', event, 'Session:', newSession);
      setSession(newSession);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    // Update or create the user's profile row as soon as we have a valid session
    async function handleProfileUpsert() {
      if (!session?.user) return;
      
      console.log('Session detected, attempting profile upsert for user:', session.user.id);
      console.log('Full user object:', session.user);
      console.log('User metadata:', session.user.user_metadata);
      const { id, email } = session.user;
      const { user_name, avatar_url } = session.user.user_metadata || {};

      try {
        // First check if profile already exists
        const { data: existingProfile, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', id)
          .single();

        if (error && error.code !== 'PGRST116') {
          // Error other than "not found"
          console.error('Error checking existing profile:', error);
          return;
        }

        // Determine what to update
        const updates: { username?: string; avatar_url?: string } = {};
        
        // Only set username if it doesn't exist or is empty
        if (!existingProfile?.username) {
          updates.username = user_name || (email ? email.split('@')[0] : 'user');
        }
        
        // Only set avatar_url if we have one from OAuth and profile doesn't have one
        if (avatar_url && !existingProfile?.avatar_url) {
          updates.avatar_url = avatar_url;
        }
        
        // Only upsert if we have something to update
        if (Object.keys(updates).length > 0) {
          console.log('Profile updates to apply:', updates);
          const { error: upsertError } = await supabase
            .from('profiles')
            .upsert({ id, ...updates }, { onConflict: 'id' });
          
          if (upsertError) {
            console.error('Error upserting profile:', upsertError);
          } else {
            console.log('Profile upserted successfully for user:', id);
          }
        } else {
          console.log('Profile already complete, no updates needed');
        }
      } catch (err) {
        console.error('Error in profile upsert:', err);
      }
    }
    
    handleProfileUpsert();
  }, [session]);

  const value: AuthContextValue = {
    user: session?.user ?? null,
    isLoading,
    signInWithGithub: async () => {
      // Dynamic redirect URL based on current domain
      const baseURL = typeof window !== 'undefined' 
        ? (window.location.origin.includes('localhost') 
            ? 'http://localhost:3000' 
            : 'https://teammatenow.com')
        : 'https://teammatenow.com';

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: baseURL,
        },
      });
      if (error) {
        console.error('Error signing in:', error);
      }
    },
    signInWithEmail: async (email: string, password: string) => {
      console.log('Attempting email sign-in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Email sign-in error:', error);
        return { error: error.message };
      }
      console.log('Email sign-in successful, session:', data.session);
      setSession(data.session);
    },
    signUpWithEmail: async (email: string, password: string) => {
      console.log('Attempting email sign-up for:', email);
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error('Email sign-up error:', error);
        return { error: error.message };
      }

      console.log('Sign-up response data:', data);
      console.log('Sign-up session:', data.session);
      console.log('Sign-up user:', data.user);
      
      setSession(data.session);
    },
    signOut: async () => {
      await supabase.auth.signOut();
      setSession(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
} 
'use client';

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getCurrentSession } from '../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log('Checking authentication...');
        
        const session = getCurrentSession();
        
        if (session) {
          console.log('Valid session found for:', session.user.email);
          setUser(session.user);
        } else {
          console.log('No valid session found');
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle redirect in useEffect to avoid setState during render
  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to login');
      router.push('/login');
    }
  }, [loading, user, router]);
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#FFC83D] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Show loading while redirect happens
    return null;
  }

  console.log('User authenticated:', user.email);
  return <>{children}</>;
}
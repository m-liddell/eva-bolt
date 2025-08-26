import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        
        // Check for mock session
        const mockSession = localStorage.getItem('mockSession');
        const currentUserEmail = localStorage.getItem('currentUserEmail');
        
        if (mockSession) {
          try {
            const session = JSON.parse(mockSession);
            if (session.expires_at > Date.now()) {
              console.log('Valid mock session found for:', session.user.email);
              
              // Load full user account data if available
              if (currentUserEmail) {
                const accountKey = `account_${currentUserEmail}`;
                const userAccount = localStorage.getItem(accountKey);
                if (userAccount) {
                  const accountData = JSON.parse(userAccount);
                  // Merge account data with session user
                  session.user = {
                    ...session.user,
                    ...accountData,
                    user_metadata: {
                      ...session.user.user_metadata,
                      ...accountData.user_metadata
                    }
                  };
                }
              }
              
              setUser(session.user);
              setLoading(false);
              return;
            } else {
              console.log('Mock session expired, removing...');
              localStorage.removeItem('mockSession');
              localStorage.removeItem('mockUser');
              localStorage.removeItem('currentUserEmail');
            }
          } catch (parseError) {
            console.error('Error parsing mock session:', parseError);
            localStorage.removeItem('mockSession');
            localStorage.removeItem('mockUser');
            localStorage.removeItem('currentUserEmail');
          }
        }

        console.log('No valid session found');
        setUser(null);
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

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
    // Redirect to login, preserving the intended destination
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('User authenticated:', user.email);
  return <>{children}</>;
}
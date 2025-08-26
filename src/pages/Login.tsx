import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Lock, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simple validation
      if (!email.trim()) {
        throw new Error('Please enter an email address');
      }
      if (!password.trim()) {
        throw new Error('Please enter a password');
      }

      console.log('Attempting login with:', email);

      // Accept any email/password for testing
      // Create mock user data
      const mockUser = {
        id: `user-${Date.now()}`,
        email: email.trim(),
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        user_metadata: {
          first_name: email.split('@')[0]?.charAt(0).toUpperCase() + email.split('@')[0]?.slice(1) || 'Teacher',
          last_name: 'User',
          full_name: `${email.split('@')[0]?.charAt(0).toUpperCase() + email.split('@')[0]?.slice(1) || 'Teacher'} User`,
          school_name: email.split('@')[1]?.split('.')[0]?.charAt(0).toUpperCase() + email.split('@')[1]?.split('.')[0]?.slice(1) + ' School' || 'Test School'
        }
      };

      // Create mock session
      const mockSession = {
        user: mockUser,
        access_token: 'mock-access-token',
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
      };

      // Get or create user account data
      const accountKey = `account_${email.trim()}`;
      let userAccount = localStorage.getItem(accountKey);
      
      if (userAccount) {
        // Existing account - update last login
        const existingAccount = JSON.parse(userAccount);
        existingAccount.last_login = new Date().toISOString();
        existingAccount.login_count = (existingAccount.login_count || 0) + 1;
        localStorage.setItem(accountKey, JSON.stringify(existingAccount));
        
        // Use existing account data for session
        mockUser.user_metadata = existingAccount.user_metadata;
        mockUser.id = existingAccount.id;
        mockUser.created_at = existingAccount.created_at;
        
        console.log('Existing account found. Login count:', existingAccount.login_count);
      } else {
        // New account - save initial data
        const newAccount = {
          id: mockUser.id,
          email: mockUser.email,
          created_at: mockUser.created_at,
          last_login: mockUser.last_login,
          login_count: 1,
          user_metadata: mockUser.user_metadata,
          preferences: {
            theme: 'default',
            notifications: true,
            language: 'en'
          },
          teaching_data: {
            subjects: [],
            year_groups: [],
            lessons_created: 0,
            assessments_completed: 0
          }
        };
        localStorage.setItem(accountKey, JSON.stringify(newAccount));
        console.log('New account created for:', email);
      }

      // Store current session
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      localStorage.setItem('mockSession', JSON.stringify(mockSession));
      localStorage.setItem('currentUserEmail', email.trim());

      console.log('Login successful! Created session for:', email);

      // Force a page reload to trigger auth state change
      window.location.href = location.state?.from?.pathname || '/';
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#768396] mb-2">Welcome to EVA</h1>
            <p className="text-gray-600">Enter any email and password to continue</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                  placeholder="Enter any email address"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                  placeholder="Enter any password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              For testing: Enter any email and password combination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
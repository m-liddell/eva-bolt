// Mock authentication utilities for Next.js

export interface User {
  id: string;
  email: string;
  created_at: string;
  last_login: string;
  user_metadata: {
    first_name: string;
    last_name: string;
    full_name: string;
    school_name?: string;
  };
}

export interface Session {
  user: User;
  access_token: string;
  expires_at: number;
}

export const getCurrentUser = (): User | null => {
  try {
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      return JSON.parse(mockUser);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getCurrentSession = (): Session | null => {
  try {
    const mockSession = localStorage.getItem('mockSession');
    if (mockSession) {
      const session = JSON.parse(mockSession);
      if (session.expires_at > Date.now()) {
        return session;
      } else {
        // Session expired, clean up
        localStorage.removeItem('mockSession');
        localStorage.removeItem('mockUser');
        localStorage.removeItem('currentUserEmail');
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting current session:', error);
    return null;
  }
};

export const signOut = () => {
  localStorage.removeItem('mockSession');
  localStorage.removeItem('mockUser');
  localStorage.removeItem('currentUserEmail');
  // Also remove from cookies for middleware
  document.cookie = 'mockSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '/login';
};

export const isAuthenticated = (): boolean => {
  return getCurrentSession() !== null;
};
'use client';

import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // In Next.js App Router, authentication should be handled by middleware
  // This component is now just a wrapper that passes through children
  // The actual authentication check happens in middleware.ts
  
  return <>{children}</>;
}
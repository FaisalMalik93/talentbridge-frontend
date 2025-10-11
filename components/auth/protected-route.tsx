'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserRole } from '@/lib/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Require authentication
    if (requireAuth && !isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    // Check role permissions
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect based on user role
      if (user.role === 'user') {
        router.push('/candidate/dashboard');
      } else if (user.role === 'employer') {
        router.push('/dashboard');
      } else if (user.role === 'admin') {
        router.push('/analytics');
      } else {
        router.push('/');
      }
    }
  }, [user, isAuthenticated, isLoading, allowedRoles, requireAuth, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Check role permissions
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}

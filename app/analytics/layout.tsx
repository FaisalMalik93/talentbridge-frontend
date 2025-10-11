'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Header } from '@/components/navigation/header';

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-900">
        <Header />
        {children}
      </div>
    </ProtectedRoute>
  );
}

'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Header } from '@/components/navigation/header';

export default function CVAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['user', 'admin']}>
      <div className="min-h-screen bg-gray-900">
        <Header />
        {children}
      </div>
    </ProtectedRoute>
  );
}

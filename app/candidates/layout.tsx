'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Header } from '@/components/navigation/header';

export default function CandidatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['employer', 'admin']}>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        {children}
      </div>
    </ProtectedRoute>
  );
}

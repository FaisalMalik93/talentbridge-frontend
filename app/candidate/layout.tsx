'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { CandidateHeader } from '@/components/navigation/candidate-header';

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['user', 'admin']}>
      <div className="min-h-screen bg-gray-900">
        <CandidateHeader />
        {children}
      </div>
    </ProtectedRoute>
  );
}

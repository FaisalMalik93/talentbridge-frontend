'use client';

import { Header } from '@/components/navigation/header';

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      {children}
    </div>
  );
}

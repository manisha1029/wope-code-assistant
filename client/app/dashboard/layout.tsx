import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen min-h-[600px] bg-[var(--color-background-tertiary)] w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
}

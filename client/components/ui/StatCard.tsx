import React from 'react';

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  subtext: string;
}

export default function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <div className="bg-[var(--color-background-secondary)] rounded-[var(--border-radius-md)] p-3.5 px-4">
      <div className="text-xs text-[var(--color-text-tertiary)] mb-1.5">{label}</div>
      <div className="text-[22px] font-medium text-[var(--color-text-primary)]">{value}</div>
      <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{subtext}</div>
    </div>
  );
}

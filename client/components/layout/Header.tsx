import React from 'react';

export default function Header() {
  return (
    <div className="bg-[var(--color-background-primary)] border-b-[0.5px] border-[var(--color-border-tertiary)] px-6 py-3.5 flex items-center justify-between">
      <div className="text-[15px] font-medium text-[var(--color-text-primary)]">Repositories</div>
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 bg-[var(--color-background-secondary)] border-[0.5px] border-[var(--color-border-tertiary)] rounded-[var(--border-radius-md)] px-3 py-1.5 text-[13px] text-[var(--color-text-tertiary)] w-[200px]">
          <i className="ti ti-search text-[14px]" aria-hidden="true"></i> Search repos...
        </div>
        <button className="flex items-center gap-1.5 bg-[#534AB7] text-white border-none rounded-[var(--border-radius-md)] px-3.5 py-[7px] text-[13px] cursor-pointer hover:bg-[#433A9D] transition-colors">
          <i className="ti ti-refresh text-[14px]" aria-hidden="true"></i> Sync GitHub
        </button>
      </div>
    </div>
  );
}
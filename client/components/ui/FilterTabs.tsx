import React from 'react';

interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex gap-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-3 py-1.5 rounded-[var(--border-radius-md)] text-xs cursor-pointer border-[0.5px] transition-colors ${
            activeTab === tab
              ? 'bg-[#EEEDFE] text-[#534AB7] border-[#AFA9EC]'
              : 'text-[var(--color-text-secondary)] bg-[var(--color-background-primary)] border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

import React from 'react';

export interface RepoCardProps {
  name: string;
  visibility: 'Public' | 'Private';
  description: string;
  language: string;
  languageColor: string;
  branches: number;
  prs: number;
  selected?: boolean;
}

export default function RepoCard({
  name,
  visibility,
  description,
  language,
  languageColor,
  branches,
  prs,
  selected = false,
}: RepoCardProps) {
  return (
    <div
      className={`bg-[var(--color-background-primary)] border-[0.5px] rounded-[var(--border-radius-lg)] p-4 cursor-pointer transition-colors duration-150 hover:border-[var(--color-border-secondary)] ${
        selected ? 'border-[#7F77DD] border-[1.5px]' : 'border-[var(--color-border-tertiary)]'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-[14px] font-medium text-[var(--color-text-primary)]">
          <i className="ti ti-folder text-[14px] align-[-2px] mr-1.5 text-[#7F77DD]" aria-hidden="true"></i>
          {name}
        </div>
        <span
          className={`text-[11px] px-2 py-0.5 rounded-[20px] ${
            visibility === 'Private' ? 'bg-[#F1EFE8] text-[#5F5E5A]' : 'bg-[#EAF3DE] text-[#3B6D11]'
          }`}
        >
          {visibility}
        </span>
      </div>
      <div className="text-xs text-[var(--color-text-secondary)] mb-3 leading-relaxed">
        {description}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColor }}></div>
          {language}
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)]">
          <i className="ti ti-git-branch text-[13px]" aria-hidden="true"></i> {branches} branches
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)]">
          <i className="ti ti-git-pull-request text-[13px]" aria-hidden="true"></i> {prs} PR{prs !== 1 && 's'}
        </div>
      </div>
      <div className="flex gap-1.5 mt-3 pt-3 border-t-[0.5px] border-[var(--color-border-tertiary)]">
        <button
          className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-[var(--border-radius-md)] border-[0.5px] cursor-pointer transition-colors ${
            selected
              ? 'bg-[#EEEDFE] text-[#534AB7] border-[#AFA9EC]'
              : 'text-[var(--color-text-secondary)] bg-[var(--color-background-primary)] border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)]'
          }`}
        >
          <i className="ti ti-git-branch text-[12px]" aria-hidden="true"></i> Branches
        </button>
        <button className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-[var(--border-radius-md)] border-[0.5px] cursor-pointer text-[var(--color-text-secondary)] bg-[var(--color-background-primary)] border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)] transition-colors">
          <i className="ti ti-git-pull-request text-[12px]" aria-hidden="true"></i> PRs
        </button>
        <button className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-[var(--border-radius-md)] border-[0.5px] cursor-pointer text-[var(--color-text-secondary)] bg-[var(--color-background-primary)] border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)] transition-colors">
          <i className="ti ti-brain text-[12px]" aria-hidden="true"></i> Analyze
        </button>
      </div>
    </div>
  );
}

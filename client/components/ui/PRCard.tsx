import React from 'react';

export interface PRCardProps {
  title: string;
  number: number;
  repoName: string;
  authorName: string;
  timeAgo: string;
  status: 'Open' | 'Draft' | 'Merged' | 'Closed';
  aiStatus: 'Clean' | 'Bugs Found' | 'Pending';
  buildStatus: 'Passing' | 'Failing' | 'Running';
}

export default function PRCard({
  title,
  number,
  repoName,
  authorName,
  timeAgo,
  status,
  aiStatus,
  buildStatus,
}: PRCardProps) {
  
  // Status styling
  const statusConfig = {
    Open: { bg: 'bg-[#EAF3DE]', text: 'text-[#3B6D11]', icon: 'ti-git-pull-request' },
    Draft: { bg: 'bg-[#F1EFE8]', text: 'text-[#5F5E5A]', icon: 'ti-git-pull-request-draft' },
    Merged: { bg: 'bg-[#EEEDFE]', text: 'text-[#534AB7]', icon: 'ti-git-merge' },
    Closed: { bg: 'bg-[#FCE8E8]', text: 'text-[#C92A2A]', icon: 'ti-git-pull-request-closed' }
  };

  const aiConfig = {
    'Clean': { bg: 'bg-[#EAF3DE]', text: 'text-[#3B6D11]', icon: 'ti-shield-check' },
    'Bugs Found': { bg: 'bg-[#FCE8E8]', text: 'text-[#C92A2A]', icon: 'ti-bug' },
    'Pending': { bg: 'bg-[#FFF3CD]', text: 'text-[#856404]', icon: 'ti-loader' }
  };

  const sConf = statusConfig[status];
  const aConf = aiConfig[aiStatus];

  return (
    <div className="bg-[var(--color-background-primary)] border-[0.5px] border-[var(--color-border-tertiary)] rounded-[var(--border-radius-lg)] p-4 transition-colors duration-150 hover:border-[var(--color-border-secondary)] flex items-start gap-4">
      
      <div className="pt-0.5">
        <i className={`ti ${sConf.icon} text-[20px] ${sConf.text}`} aria-hidden="true" title={status}></i>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1.5">
          <div className="text-[15px] font-medium text-[var(--color-text-primary)] truncate">
            {title} <span className="text-[var(--color-text-tertiary)] font-normal ml-1">#{number}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {aiStatus !== 'Pending' && (
              <span className={`flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-[20px] ${aConf.bg} ${aConf.text} border-[0.5px] ${aiStatus === 'Bugs Found' ? 'border-red-200' : 'border-green-200'}`}>
                <i className={`ti ${aConf.icon} text-[13px]`} aria-hidden="true"></i> {aiStatus}
              </span>
            )}
            {aiStatus === 'Pending' && (
              <span className={`flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-[20px] ${aConf.bg} ${aConf.text} border-[0.5px] border-yellow-200`}>
                <i className={`ti ${aConf.icon} text-[13px]`} aria-hidden="true"></i> {aiStatus}
              </span>
            )}
          </div>
        </div>

        <div className="text-[13px] text-[var(--color-text-secondary)] mb-3.5 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 font-medium text-[var(--color-text-primary)]">
             <i className="ti ti-folder text-[14px] text-[var(--color-text-tertiary)]" aria-hidden="true"></i> {repoName}
          </div>
          <span className="text-[var(--color-text-tertiary)]">•</span>
          <span>opened {timeAgo} by {authorName}</span>
          <span className="text-[var(--color-text-tertiary)]">•</span>
          <span className="flex items-center gap-1">
            {buildStatus === 'Passing' ? (
              <><i className="ti ti-check text-green-600 text-[14px]"></i> CI passing</>
            ) : buildStatus === 'Failing' ? (
              <><i className="ti ti-x text-red-600 text-[14px]"></i> CI failing</>
            ) : (
              <><i className="ti ti-loader text-yellow-600 text-[14px]"></i> CI running</>
            )}
          </span>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[var(--border-radius-md)] border-[0.5px] cursor-pointer text-[var(--color-text-secondary)] bg-[var(--color-background-primary)] border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)] transition-colors">
            <i className="ti ti-external-link text-[14px]" aria-hidden="true"></i> View on GitHub
          </button>
          <button className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[var(--border-radius-md)] border-[0.5px] cursor-pointer transition-colors ${aiStatus === 'Bugs Found' ? 'bg-[#EEEDFE] text-[#534AB7] border-[#AFA9EC]' : 'text-[var(--color-text-secondary)] bg-[var(--color-background-primary)] border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)]'}`}>
            <i className="ti ti-brain text-[14px]" aria-hidden="true"></i> AI Analysis
          </button>
        </div>
      </div>
      
    </div>
  );
}

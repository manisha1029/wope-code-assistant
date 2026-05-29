"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'ti-layout-dashboard' },
    { name: 'Repositories', href: '/dashboard/repositories', icon: 'ti-git-branch' },
    { name: 'Pull requests', href: '/dashboard/pull-requests', icon: 'ti-git-pull-request' },
    { name: 'AI analysis', href: '/dashboard/ai-analysis', icon: 'ti-bug' },
  ];

  // Map /dashboard directly to repositories or dashboard depending on how the user prefers it.
  // Wait, right now /dashboard is Repositories. Let's make /dashboard the Repositories page
  // and have /dashboard/pull-requests for PRs. 
  // Let's adjust the matching logic.
  const isDashboardOrRepos = pathname === '/dashboard' || pathname === '/dashboard/repositories';

  return (
    <div className="w-[220px] bg-[var(--color-background-primary)] border-r-[0.5px] border-[var(--color-border-tertiary)] flex flex-col p-0 shrink-0 h-full">
      <div className="p-5 px-4 pb-4 border-b-[0.5px] border-[var(--color-border-tertiary)]">
        <div className="text-[16px] font-medium text-[var(--color-text-primary)] flex items-center">
          <i className="ti ti-code text-[15px] align-[-2px] mr-1.5 text-[#534AB7]" aria-hidden="true"></i>Wope
        </div>
        <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">Code Assistant</div>
      </div>
      
      <div className="p-3 px-2 flex-1 overflow-y-auto">
        <div className="text-[11px] text-[var(--color-text-tertiary)] p-2 pb-1 tracking-[0.04em] uppercase">Main</div>
        
        {/* Dashboard */}
        <Link href="/dashboard" className={`flex items-center gap-2 px-2.5 py-2 rounded-[var(--border-radius-md)] cursor-pointer text-[13px] mb-0.5 transition-colors ${isDashboardOrRepos ? 'bg-[#EEEDFE] text-[#534AB7]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)]'}`}>
          <i className={`ti ti-git-branch text-[16px] ${isDashboardOrRepos ? 'text-[#534AB7]' : 'text-[var(--color-text-tertiary)]'}`} aria-hidden="true"></i> Repositories
        </Link>
        
        {/* Pull Requests */}
        <Link href="/dashboard/pull-requests" className={`flex items-center gap-2 px-2.5 py-2 rounded-[var(--border-radius-md)] cursor-pointer text-[13px] mb-0.5 transition-colors ${pathname === '/dashboard/pull-requests' ? 'bg-[#EEEDFE] text-[#534AB7]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)]'}`}>
          <i className={`ti ti-git-pull-request text-[16px] ${pathname === '/dashboard/pull-requests' ? 'text-[#534AB7]' : 'text-[var(--color-text-tertiary)]'}`} aria-hidden="true"></i> Pull requests
        </Link>
        
        {/* AI Analysis */}
        <Link href="/dashboard/ai-analysis" className={`flex items-center gap-2 px-2.5 py-2 rounded-[var(--border-radius-md)] cursor-pointer text-[13px] mb-0.5 transition-colors ${pathname === '/dashboard/ai-analysis' ? 'bg-[#EEEDFE] text-[#534AB7]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)]'}`}>
          <i className={`ti ti-bug text-[16px] ${pathname === '/dashboard/ai-analysis' ? 'text-[#534AB7]' : 'text-[var(--color-text-tertiary)]'}`} aria-hidden="true"></i> AI analysis
        </Link>
        
        <div className="text-[11px] text-[var(--color-text-tertiary)] p-2 pb-1 tracking-[0.04em] uppercase mt-2">Workspace</div>
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-[var(--border-radius-md)] cursor-pointer text-[13px] text-[var(--color-text-secondary)] mb-0.5 hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <i className="ti ti-users text-[16px] text-[var(--color-text-tertiary)]" aria-hidden="true"></i> Employees
        </div>
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-[var(--border-radius-md)] cursor-pointer text-[13px] text-[var(--color-text-secondary)] mb-0.5 hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <i className="ti ti-briefcase text-[16px] text-[var(--color-text-tertiary)]" aria-hidden="true"></i> Projects
        </div>
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-[var(--border-radius-md)] cursor-pointer text-[13px] text-[var(--color-text-secondary)] mb-0.5 hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <i className="ti ti-settings text-[16px] text-[var(--color-text-tertiary)]" aria-hidden="true"></i> Settings
        </div>
      </div>

      <div className="p-3 px-4 border-t-[0.5px] border-[var(--color-border-tertiary)] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[12px] font-medium text-[#534AB7] shrink-0">
          M
        </div>
        <div>
          <div className="text-[13px] font-medium text-[var(--color-text-primary)]">Manisha</div>
          <div className="text-[11px] text-[var(--color-text-tertiary)]">@manisha1029</div>
        </div>
      </div>
    </div>
  );
}
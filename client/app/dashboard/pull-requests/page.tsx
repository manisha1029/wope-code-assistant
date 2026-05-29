"use client";

import React, { useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import PRCard, { PRCardProps } from '@/components/ui/PRCard';
import FilterTabs from '@/components/ui/FilterTabs';

export default function PullRequestsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const stats = [
    { label: 'Total Open PRs', value: '12', subtext: 'across all repos' },
    { label: 'Bugs Found Today', value: '4', subtext: 'requires attention' },
    { label: 'Clean PRs', value: '8', subtext: 'ready to merge' },
    { label: 'Pending Analysis', value: '1', subtext: 'currently running' },
  ];

  const prs: PRCardProps[] = [
    {
      title: 'Fix memory leak in auth service',
      number: 42,
      repoName: 'wope-code-assistant',
      authorName: '@manisha1029',
      timeAgo: '2 hours ago',
      status: 'Open',
      aiStatus: 'Bugs Found',
      buildStatus: 'Passing',
    },
    {
      title: 'Implement dynamic dashboard sidebar routing',
      number: 105,
      repoName: 'wope-dashboard',
      authorName: '@snake',
      timeAgo: '5 hours ago',
      status: 'Open',
      aiStatus: 'Clean',
      buildStatus: 'Passing',
    },
    {
      title: 'Update GitHub OAuth scopes for repo access',
      number: 43,
      repoName: 'wope-code-assistant',
      authorName: '@manisha1029',
      timeAgo: '1 day ago',
      status: 'Merged',
      aiStatus: 'Clean',
      buildStatus: 'Passing',
    },
    {
      title: 'WIP: Add employee roles API',
      number: 12,
      repoName: 'employee-service',
      authorName: '@alex_dev',
      timeAgo: '2 days ago',
      status: 'Draft',
      aiStatus: 'Pending',
      buildStatus: 'Running',
    },
    {
      title: 'Refactor login component layout',
      number: 106,
      repoName: 'wope-dashboard',
      authorName: '@snake',
      timeAgo: '3 days ago',
      status: 'Closed',
      aiStatus: 'Bugs Found',
      buildStatus: 'Failing',
    }
  ];

  const filteredPRs = prs.filter((pr) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Requires Review') return pr.status === 'Open';
    if (activeTab === 'Has Bugs') return pr.aiStatus === 'Bugs Found';
    if (activeTab === 'Drafts') return pr.status === 'Draft';
    return true;
  });

  return (
    <div className="p-6 flex-1 max-w-5xl">
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-[14px] font-medium text-[var(--color-text-primary)]">Recent Pull Requests</div>
        <FilterTabs 
          tabs={['All', 'Requires Review', 'Has Bugs', 'Drafts']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <div className="flex flex-col gap-3">
        {filteredPRs.map((pr) => (
          <PRCard key={pr.number} {...pr} />
        ))}
      </div>
      
      {filteredPRs.length === 0 && (
        <div className="text-center p-12 text-[var(--color-text-tertiary)] text-[14px]">
          No pull requests found matching this filter.
        </div>
      )}
    </div>
  );
}

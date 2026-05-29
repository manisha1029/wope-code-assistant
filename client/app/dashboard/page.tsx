"use client";

import React, { useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import RepoCard from '@/components/ui/RepoCard';
import FilterTabs from '@/components/ui/FilterTabs';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('All');

  const stats = [
    { label: 'Total repos', value: '24', subtext: 'synced from GitHub' },
    { label: 'Open PRs', value: '7', subtext: 'across all repos' },
    { label: 'Bugs found', value: '3', subtext: 'by AI analysis' },
    { 
      label: 'Last synced', 
      value: <div className="text-[15px] pt-1 pb-[1px]">2m ago</div>, 
      subtext: 'auto every 30 min' 
    },
  ];

  const repos: React.ComponentProps<typeof RepoCard>[] = [
    {
      name: 'wope-code-assistant',
      visibility: 'Private',
      description: 'Microservice for GitHub OAuth, repo sync, and AI-powered PR analysis.',
      language: 'Python',
      languageColor: '#3572A5',
      branches: 3,
      prs: 2,
      selected: true,
    },
    {
      name: 'wope-dashboard',
      visibility: 'Public',
      description: 'Main Wope project management and employee dashboard frontend.',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      branches: 5,
      prs: 4,
      selected: false,
    },
    {
      name: 'employee-service',
      visibility: 'Private',
      description: 'REST API for employee management, roles, and permissions.',
      language: 'Python',
      languageColor: '#3572A5',
      branches: 2,
      prs: 1,
      selected: false,
    },
    {
      name: 'wope-mobile',
      visibility: 'Public',
      description: 'React Native mobile app for Wope platform on iOS and Android.',
      language: 'TypeScript',
      languageColor: '#3178c6',
      branches: 4,
      prs: 0,
      selected: false,
    },
  ];

  const filteredRepos = repos.filter((repo) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Public') return repo.visibility === 'Public';
    if (activeTab === 'Private') return repo.visibility === 'Private';
    return repo.language === activeTab;
  });

  return (
    <div className="p-6 flex-1">
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-3.5">
        <div className="text-[14px] font-medium text-[var(--color-text-primary)]">Your repositories</div>
        <FilterTabs 
          tabs={['All', 'Public', 'Private', 'Python', 'JavaScript']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredRepos.map((repo) => (
          <RepoCard key={repo.name} {...repo} />
        ))}
      </div>
      
      {filteredRepos.length === 0 && (
        <div className="col-span-2 text-center p-12 text-[var(--color-text-tertiary)] text-[14px]">
          No repositories found matching this filter.
        </div>
      )}
    </div>
  );
}

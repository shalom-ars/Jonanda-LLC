import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Plus,
  Search,
  Play,
  Copy,
  Trash2,
  Sparkles,
  Layers
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useFlow } from '../../context/FlowContext';
import { Workflow } from '../../types/flow';

export const WorkflowsListPage: React.FC = () => {
  const { workflows, toggleWorkflowStatus, duplicateWorkflow, deleteWorkflow, runWorkflowExecution } = useFlow();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filtered = workflows.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || w.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDuplicate = (id: string) => {
    const copy = duplicateWorkflow(id);
    navigate(`/flow/builder/${copy.id}`);
  };

  return (
    <>
      <SEOHead
        title="Manage Workflows | JONANDA Flow Automation"
        description="Create, monitor, test, and manage visual automated workflows across partner onboarding, creator campaigns, and JONANDA Mail."
        canonicalPath="/flow/workflows"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/20 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>JONANDA FLOW • Automation Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Workflow Automations
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Active operational pipelines for partner onboarding, creator campaigns, and customer emails.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="/flow/templates"
              variant="outline"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Templates
            </Button>
            <Button
              href="/flow/new"
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
            >
              New Workflow
            </Button>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search workflows by title..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="partner">Partner Flows</option>
              <option value="influencer">Influencer Flows</option>
              <option value="brand">Brand Flows</option>
              <option value="customer">Customer Flows</option>
              <option value="ecosystem">Ecosystem Flows</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="draft">Draft Only</option>
              <option value="paused">Paused Only</option>
            </select>
          </div>
        </div>

        {/* Workflows Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-white dark:bg-surface/50 border border-gray-200 dark:border-white/10 space-y-4">
            <Zap className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              No matching workflows found
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search query or create a new automated workflow from scratch.
            </p>
            <Button href="/flow/new" variant="primary" size="sm">
              Create New Workflow
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((wf: Workflow) => (
              <CorporateCard
                key={wf.id}
                className="p-6 flex flex-col justify-between h-full hover:border-amber-500/40 transition-all shadow-sm"
              >
                <div className="space-y-4">
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        wf.category === 'partner'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                          : wf.category === 'influencer'
                          ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30'
                          : wf.category === 'brand'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                          : 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30'
                      }`}
                    >
                      {wf.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleWorkflowStatus(wf.id)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded transition-colors flex items-center gap-1.5 ${
                        wf.status === 'active'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          wf.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                        }`}
                      />
                      <span>{wf.status}</span>
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                      {wf.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">
                      {wf.description}
                    </p>
                  </div>

                  {/* Stats Bar */}
                  <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                    <span>{wf.nodes.length} Nodes</span>
                    <span>{wf.executionCount || 0} Runs</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                      {wf.successRate || 100}% Succeeded
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      href={`/flow/builder/${wf.id}`}
                      variant="primary"
                      size="sm"
                      className="text-xs px-3.5 py-1.5"
                    >
                      Open Canvas
                    </Button>

                    <button
                      type="button"
                      onClick={() => runWorkflowExecution(wf.id, {}, true)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-amber-500/20 text-gray-600 dark:text-gray-300 hover:text-amber-600 transition-colors"
                      title="Run Quick Test"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(wf.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteWorkflow(wf.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </CorporateCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

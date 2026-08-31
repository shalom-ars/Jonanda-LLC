import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Play,
  Plus,
  ArrowRight,
  Sparkles,
  Mail,
  Layers,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useFlow } from '../../context/FlowContext';
import { Workflow, WorkflowExecution } from '../../types/flow';

export const FlowDashboardPage: React.FC = () => {
  const { workflows, executions, toggleWorkflowStatus, runWorkflowExecution } = useFlow();

  const activeWorkflowsCount = workflows.filter((w) => w.status === 'active').length;
  const draftWorkflowsCount = workflows.filter((w) => w.status === 'draft').length;
  const totalExecutionsCount = executions.length;
  const successfulExecutionsCount = executions.filter((e) => e.status === 'completed').length;

  return (
    <>
      <SEOHead
        title="JONANDA Flow | Partner & Influencer Workflow Automation"
        description="Automate communication, onboarding, campaigns, and partner & influencer relationships with JONANDA FLOW integrated with JONANDA MAIL."
        canonicalPath="/flow"
        keywords="JONANDA Flow, workflow automation, influencer automation, partner onboarding, visual workflow builder, JONANDA mail integration"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Hero Section */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>JONANDA FLOW • Automation Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            Automate Your JONANDA{' '}
            <span className="text-gradient-gold block sm:inline">
              Workflows & Ecosystem
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Build visual workflows for partners, influencers, customers, email campaigns, and JONANDA digital systems — without manually repeating operational steps.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/flow/new"
              variant="primary"
              size="lg"
              icon={<Plus className="w-4 h-4" />}
            >
              Build a Workflow
            </Button>
            <Button
              href="/flow/templates"
              variant="secondary"
              size="lg"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Explore Templates
            </Button>
          </div>
        </div>

        {/* Dashboard Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <CorporateCard className="p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Active Flows
            </span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {activeWorkflowsCount}
            </div>
            <span className="text-[10px] text-gray-500">of {workflows.length} total</span>
          </CorporateCard>

          <CorporateCard className="p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Draft Flows
            </span>
            <div className="text-2xl font-extrabold text-gray-700 dark:text-gray-300">
              {draftWorkflowsCount}
            </div>
            <span className="text-[10px] text-gray-500">in configuration</span>
          </CorporateCard>

          <CorporateCard className="p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Executions
            </span>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-gold-400">
              {totalExecutionsCount}
            </div>
            <span className="text-[10px] text-emerald-600">
              {totalExecutionsCount > 0
                ? `${Math.round((successfulExecutionsCount / totalExecutionsCount) * 100)}% success`
                : '100% success'}
            </span>
          </CorporateCard>

          <CorporateCard className="p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Partner Flows
            </span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {workflows.filter((w) => w.category === 'partner').length}
            </div>
            <span className="text-[10px] text-gray-500">Vetting & Welcome</span>
          </CorporateCard>

          <CorporateCard className="p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Creator Flows
            </span>
            <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              {workflows.filter((w) => w.category === 'influencer').length}
            </div>
            <span className="text-[10px] text-gray-500">Briefs & Submissions</span>
          </CorporateCard>

          <CorporateCard className="p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Mail Health
            </span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100%
            </div>
            <span className="text-[10px] text-gray-500">mail.jonanda.com</span>
          </CorporateCard>
        </div>

        {/* Quick Nav Module Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/flow/workflows"
            className="p-5 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 hover:border-amber-500/40 transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-gold-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Manage Workflows
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Review, edit, activate, and duplicate automations
            </p>
          </Link>

          <Link
            to="/flow/templates"
            className="p-5 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 hover:border-purple-500/40 transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Templates Library
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Pre-built partner, creator & customer blueprints
            </p>
          </Link>

          <Link
            to="/flow/logs"
            className="p-5 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 hover:border-blue-500/40 transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Execution Logs
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Step-by-step diagnostic telemetry and results
            </p>
          </Link>

          <Link
            to="/mail"
            className="p-5 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 hover:border-emerald-500/40 transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              JONANDA Mail Suite
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Contacts, campaigns, templates, and webmail
            </p>
          </Link>
        </div>

        {/* Active Workflows Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Featured Institutional Workflows
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Ready-to-use workflows connecting partner intake, influencer campaigns, and JONANDA Mail.
              </p>
            </div>
            <Button href="/flow/workflows" variant="outline" size="sm">
              View All ({workflows.length})
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.slice(0, 6).map((wf: Workflow) => (
              <CorporateCard key={wf.id} className="p-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
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
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors ${
                        wf.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {wf.status}
                    </button>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {wf.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-1 line-clamp-2">
                      {wf.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-white/10">
                    <span>{wf.nodes.length} Nodes</span>
                    <span>•</span>
                    <span>{wf.executionCount || 0} Runs</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                      {wf.successRate || 100}% Success
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
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
                    className="text-xs font-bold text-amber-600 dark:text-gold-400 hover:underline flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>Run Test</span>
                  </button>
                </div>
              </CorporateCard>
            ))}
          </div>
        </div>

        {/* Live Execution Activity Stream */}
        <div className="rounded-3xl bg-slate-100 dark:bg-surface/50 border border-gray-200 dark:border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-amber-600 dark:text-gold-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Recent Automation Activity
              </h3>
            </div>
            <Link
              to="/flow/logs"
              className="text-xs font-bold text-amber-600 dark:text-gold-400 hover:underline"
            >
              Full Execution Log &rarr;
            </Link>
          </div>

          {executions.length === 0 ? (
            <div className="py-10 text-center text-xs text-gray-500">
              No executions logged yet. Launch a test run above to simulate activity.
            </div>
          ) : (
            <div className="space-y-2.5">
              {executions.slice(0, 5).map((exec: WorkflowExecution) => (
                <div
                  key={exec.id}
                  className="p-4 rounded-xl bg-white dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    {exec.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white block">
                        {exec.workflowName}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        Trigger: {exec.triggerType} {exec.isTest && '• (SANDBOX)'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-500 font-mono text-[11px]">
                    <span>{exec.durationMs}ms</span>
                    <span>{new Date(exec.startedAt).toLocaleTimeString()}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        exec.status === 'completed'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                          : 'bg-red-500/15 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {exec.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

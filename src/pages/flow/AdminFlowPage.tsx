import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  RotateCw
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useFlow } from '../../context/FlowContext';

export const AdminFlowPage: React.FC = () => {
  const { workflows } = useFlow();
  const [isFlushing, setIsFlushing] = useState(false);

  const handleFlushQueue = async () => {
    setIsFlushing(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsFlushing(false);
  };

  return (
    <>
      <SEOHead
        title="Flow Platform Admin Console | JONANDA Architecture"
        description="Executive administration console for JONANDA FLOW execution engine, worker telemetry, and abuse mitigation."
        canonicalPath="/admin/flow"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-xs font-semibold text-red-700 dark:text-red-300 border border-red-500/30 mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Platform Admin Plane</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              JONANDA FLOW Engine Operations
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Global cluster health, execution worker pool, SSRF guard telemetry, and rate limits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleFlushQueue}
              variant="outline"
              size="md"
              icon={<RotateCw className={`w-4 h-4 ${isFlushing ? 'animate-spin' : ''}`} />}
            >
              {isFlushing ? 'Purging...' : 'Flush Execution Queue'}
            </Button>
          </div>
        </div>

        {/* Global Cluster Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <CorporateCard className="p-5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Worker Pool Health
            </span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              100% Online
            </div>
            <span className="text-[10px] text-gray-500">12 Active Workers</span>
          </CorporateCard>

          <CorporateCard className="p-5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Avg Step Duration
            </span>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-gold-400 font-mono">
              72ms
            </div>
            <span className="text-[10px] text-emerald-600">p95 &lt; 140ms</span>
          </CorporateCard>

          <CorporateCard className="p-5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Active Workflows
            </span>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {workflows.length}
            </div>
            <span className="text-[10px] text-gray-500">across all tenants</span>
          </CorporateCard>

          <CorporateCard className="p-5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              SSRF Threat Filter
            </span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              0 Violations
            </div>
            <span className="text-[10px] text-emerald-600">Private ranges isolated</span>
          </CorporateCard>
        </div>

        {/* Security & Abuse Monitoring Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CorporateCard className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-bold text-gray-900 dark:text-white">
              <ShieldAlert className="w-4 h-4 text-emerald-500" />
              <span>SSRF & Network Boundary Enforcement</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              All HTTP Request nodes automatically filter destination targets. Private IP blocks (127.0.0.1, 10.0.0.0/8, 192.168.0.0/16, 169.254.169.254) are rejected prior to socket connection.
            </p>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] text-xs font-mono space-y-1">
              <div className="flex justify-between text-gray-500">
                <span>SSRF Engine:</span>
                <span className="text-emerald-500 font-bold">Active & Enforcing</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>DNS Rebinding Guard:</span>
                <span className="text-emerald-500 font-bold">Enabled</span>
              </div>
            </div>
          </CorporateCard>

          <CorporateCard className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-bold text-gray-900 dark:text-white">
              <Activity className="w-4 h-4 text-amber-500" />
              <span>Execution Queue Throughput</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Long-running asynchronous jobs are distributed to the queue worker pool with exponential backoff retry policies.
            </p>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] text-xs font-mono space-y-1">
              <div className="flex justify-between text-gray-500">
                <span>Queue Depth:</span>
                <span className="text-gray-900 dark:text-white">0 jobs waiting</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Max Concurrency:</span>
                <span className="text-amber-500 font-bold">50 executions/worker</span>
              </div>
            </div>
          </CorporateCard>
        </div>
      </div>
    </>
  );
};

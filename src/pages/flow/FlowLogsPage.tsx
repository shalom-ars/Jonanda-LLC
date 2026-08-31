import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Search,
  Eye,
  X
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';
import { useFlow } from '../../context/FlowContext';
import { WorkflowExecution, ExecutionStep } from '../../types/flow';

export const FlowLogsPage: React.FC = () => {
  const { executions, clearExecutionLogs } = useFlow();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [inspectingExecution, setInspectingExecution] = useState<WorkflowExecution | null>(null);

  const filtered = executions.filter((e) => {
    const matchesSearch =
      e.workflowName.toLowerCase().includes(search.toLowerCase()) ||
      e.triggerType.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <SEOHead
        title="Execution Logs & Telemetry | JONANDA FLOW"
        description="Inspect workflow execution history, node step durations, payload input/output data, and real-time failure diagnostics."
        canonicalPath="/flow/logs"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-500/30 mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Real-Time Telemetry</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Workflow Execution Logs
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Detailed step-by-step diagnostic telemetry for all automated executions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={clearExecutionLogs}
              variant="ghost"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
            >
              Clear Logs
            </Button>
            <Button
              href="/flow/workflows"
              variant="primary"
              size="sm"
            >
              Manage Workflows
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by workflow, trigger, or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="all">All Execution Statuses</option>
            <option value="completed">Completed Only</option>
            <option value="failed">Failed Only</option>
            <option value="running">Running Only</option>
          </select>
        </div>

        {/* Executions Table */}
        <div className="rounded-3xl bg-white dark:bg-surface/60 border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-xs text-gray-500 space-y-2">
              <Activity className="w-8 h-8 text-gray-400 mx-auto" />
              <p>No execution logs found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/10 text-gray-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Execution ID</th>
                    <th className="py-3.5 px-5">Workflow</th>
                    <th className="py-3.5 px-5">Trigger</th>
                    <th className="py-3.5 px-5">Duration</th>
                    <th className="py-3.5 px-5">Timestamp</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/[0.04]">
                  {filtered.map((exec: WorkflowExecution) => (
                    <tr
                      key={exec.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          {exec.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                              exec.status === 'completed'
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                                : 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30'
                            }`}
                          >
                            {exec.status}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 font-mono text-gray-500 dark:text-gray-400">
                        {exec.id} {exec.isTest && <span className="text-amber-500">(test)</span>}
                      </td>

                      <td className="py-3.5 px-5 font-bold text-gray-900 dark:text-white">
                        {exec.workflowName}
                      </td>

                      <td className="py-3.5 px-5 text-gray-600 dark:text-gray-400 font-mono text-[11px]">
                        {exec.triggerType}
                      </td>

                      <td className="py-3.5 px-5 font-mono text-gray-500">
                        {exec.durationMs}ms
                      </td>

                      <td className="py-3.5 px-5 text-gray-500">
                        {new Date(exec.startedAt).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => setInspectingExecution(exec)}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-amber-500/20 text-xs font-bold text-amber-700 dark:text-gold-300 transition-colors inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Step Inspector Modal */}
        {inspectingExecution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-2xl bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Execution Telemetry: {inspectingExecution.id}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Workflow: {inspectingExecution.workflowName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectingExecution(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.06] text-xs space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Started:</span>
                    <span className="text-gray-900 dark:text-white">{inspectingExecution.startedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-amber-500">{inspectingExecution.durationMs}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-emerald-500 uppercase font-bold">{inspectingExecution.status}</span>
                  </div>
                </div>

                {inspectingExecution.error && (
                  <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-700 dark:text-red-300">
                    <strong>Error Diagnostic:</strong> {inspectingExecution.error}
                  </div>
                )}

                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 pt-2">
                  Step-by-Step Node Execution
                </h4>

                <div className="space-y-2">
                  {inspectingExecution.steps.map((step: ExecutionStep, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block">
                            {idx + 1}. {step.nodeTitle}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {step.nodeType}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-gray-500">
                        {step.durationMs}ms
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-white/10 text-right">
                <Button onClick={() => setInspectingExecution(null)} variant="primary" size="sm">
                  Close Inspector
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

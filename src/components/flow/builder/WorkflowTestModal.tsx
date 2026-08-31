import React, { useState } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  RotateCw
} from 'lucide-react';
import { Workflow, WorkflowExecution, ExecutionStep } from '../../../types/flow';
import { useFlow } from '../../../context/FlowContext';
import { Button } from '../../common/Button';

interface WorkflowTestModalProps {
  workflow: Workflow;
  onClose: () => void;
}

export const WorkflowTestModal: React.FC<WorkflowTestModalProps> = ({ workflow, onClose }) => {
  const { runWorkflowExecution } = useFlow();

  const [testPayload, setTestPayload] = useState({
    contactName: 'Alex Morgan',
    companyName: 'Acme Global Ventures',
    email: 'alex.morgan@acmeglobal.io',
    track: 'Infrastructure & AI Systems',
    status: 'approved',
    followers: '15000',
    campaign_name: 'Q3 Product Showcase'
  });

  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<WorkflowExecution | null>(null);

  const handleRunTest = async () => {
    setIsRunning(true);
    setExecutionResult(null);

    try {
      const result = await runWorkflowExecution(workflow.id, testPayload, true);
      setExecutionResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-gold-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Test Workflow Simulation
                </h3>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-gold-300 border border-amber-500/30">
                  SANDBOX TEST
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Workflow: {workflow.name}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Safety Notice Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-800 dark:text-gold-300 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0 mt-0.5" />
            <span>
              <strong>Safe Simulation Mode:</strong> Steps and branch conditions are executed in a deterministic sandbox. No unsolicited external communications are dispatched.
            </span>
          </div>

          {/* Test Payload Input Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Input Trigger Payload
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 block">Contact Name</label>
                <input
                  type="text"
                  value={testPayload.contactName}
                  onChange={(e) => setTestPayload({ ...testPayload, contactName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 block">Company / Brand</label>
                <input
                  type="text"
                  value={testPayload.companyName}
                  onChange={(e) => setTestPayload({ ...testPayload, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 block">Email Address</label>
                <input
                  type="email"
                  value={testPayload.email}
                  onChange={(e) => setTestPayload({ ...testPayload, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-500 block">Status / Branch</label>
                <select
                  value={testPayload.status}
                  onChange={(e) => setTestPayload({ ...testPayload, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                >
                  <option value="approved">approved (YES branch)</option>
                  <option value="rejected">rejected (NO branch)</option>
                  <option value="pending">pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Execution Progress & Output Log */}
          {executionResult && (
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-white/10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Execution Results
                </h4>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    executionResult.status === 'completed'
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30'
                  }`}
                >
                  {executionResult.status} ({executionResult.durationMs}ms)
                </span>
              </div>

              {/* Steps List */}
              <div className="space-y-2">
                {executionResult.steps.map((step: ExecutionStep, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.06] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white block">
                          Step {idx + 1}: {step.nodeTitle}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {step.nodeType}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-gray-400">
                      {step.durationMs}ms
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
          <Button onClick={onClose} variant="ghost" size="sm">
            Close
          </Button>

          <Button
            onClick={handleRunTest}
            variant="primary"
            size="md"
            disabled={isRunning}
            icon={isRunning ? <RotateCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          >
            {isRunning ? 'Simulating...' : 'Execute Test Run'}
          </Button>
        </div>
      </div>
    </div>
  );
};

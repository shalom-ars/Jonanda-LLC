import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Automation } from '../../types';
import {
  Workflow,
  Plus,
  Play,
  Pause,
  Clock,
  Send,
  Tag,
  CheckCircle2,
  AlertCircle,
  ArrowDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const AutomationsPage: React.FC = () => {
  const [automations, setAutomations] = useState<Automation[]>(() => StorageService.getAutomations());

  const toggleStatus = (id: string) => {
    const updated = automations.map(auto => {
      if (auto.id === id) {
        return { ...auto, status: auto.status === 'active' ? ('paused' as const) : ('active' as const) };
      }
      return auto;
    });
    StorageService.saveAutomations(updated);
    setAutomations(updated);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Automations & Drip Workflows</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              Event-Driven Engine
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Orchestrate automated multi-step email sequences triggered by subscriber onboarding, lead scoring, and security diagnostic telemetry.
          </p>
        </div>

        <Button
          onClick={() => alert('New automation workflow designer triggered.')}
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-lg shadow-brand-600/20"
        >
          Create Automation
        </Button>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {automations.map(auto => (
          <Card key={auto.id} className="p-6 space-y-6 hover:border-slate-700">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-brand-600 flex items-center justify-center text-white shadow-md">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{auto.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{auto.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={auto.status === 'active' ? 'success' : 'warning'}>
                  {auto.status.toUpperCase()}
                </Badge>
                <button
                  onClick={() => toggleStatus(auto.id)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
                  title={auto.status === 'active' ? 'Pause' : 'Activate'}
                >
                  {auto.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Trigger Bar */}
            <div className="p-3 rounded-xl bg-[#090e1a] border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">Trigger:</span>
                <span>{auto.triggerLabel}</span>
              </div>
              <span className="text-slate-500 font-mono">
                {auto.enrolledCount} enrolled • {auto.completedCount} completed
              </span>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-3 pl-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sequence Workflow ({auto.steps.length} steps)
              </div>

              {auto.steps.map((step, idx) => (
                <div key={step.id} className="relative pl-6 pb-2 border-l border-slate-800 last:border-0 last:pb-0">
                  <div className="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-brand-500 flex items-center justify-center text-[9px] font-bold text-brand-300">
                    {idx + 1}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      {step.type === 'send_email' && <Send className="w-3.5 h-3.5 text-brand-400" />}
                      {step.type === 'delay' && <Clock className="w-3.5 h-3.5 text-amber-400" />}
                      {step.type === 'add_tag' && <Tag className="w-3.5 h-3.5 text-purple-400" />}
                      <span className="font-medium text-slate-200">{step.title}</span>
                    </div>
                    {step.config.delayHours && (
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {step.config.delayHours}h delay
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

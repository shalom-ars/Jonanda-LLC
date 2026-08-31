import React from 'react';
import { X, Settings, Info } from 'lucide-react';
import { FlowNode } from '../../../types/flow';
import { FLOW_NODE_DEFINITIONS } from '../../../data/flowNodesData';

interface NodeConfigPanelProps {
  node: FlowNode | null;
  onClose: () => void;
  onUpdateConfig: (nodeId: string, config: Record<string, any>, title?: string) => void;
}

export const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({
  node,
  onClose,
  onUpdateConfig
}) => {
  if (!node) return null;

  const definition = FLOW_NODE_DEFINITIONS[node.type];
  const config = node.config || {};

  const handleFieldChange = (key: string, value: any) => {
    onUpdateConfig(node.id, {
      ...config,
      [key]: value
    });
  };

  const handleTitleChange = (newTitle: string) => {
    onUpdateConfig(node.id, config, newTitle);
  };

  return (
    <aside className="fixed right-0 top-[60px] bottom-0 w-88 sm:w-96 z-30 bg-white dark:bg-[#0c0c14] border-l border-gray-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-amber-600 dark:text-gold-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Configure Node
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Config Form Fields */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Node Label Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
            Node Label
          </label>
          <input
            type="text"
            value={node.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-amber-500"
          />
          <p className="text-[10px] text-gray-500">
            Internal identifier for this workflow step.
          </p>
        </div>

        {/* Node Description Overview */}
        {definition && (
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-xs text-gray-600 dark:text-gray-400 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>{definition.description}</span>
          </div>
        )}

        {/* 1. EMAIL CONFIGURATION */}
        {node.type === 'action_send_email' && (
          <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                Recipient Email
              </label>
              <input
                type="text"
                value={config.to || '{{email}}'}
                onChange={(e) => handleFieldChange('to', e.target.value)}
                placeholder="{{email}} or partner@company.com"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                Subject Line
              </label>
              <input
                type="text"
                value={config.subject || ''}
                onChange={(e) => handleFieldChange('subject', e.target.value)}
                placeholder="e.g. Welcome to JONANDA Ecosystem"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                Email Message Body
              </label>
              <textarea
                rows={5}
                value={config.bodyText || ''}
                onChange={(e) => handleFieldChange('bodyText', e.target.value)}
                placeholder="Write your email body with variables like {{first_name}}..."
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white font-sans"
              />
            </div>

            {/* Variable Tags Helper */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-gray-500 block">
                Available Dynamic Variables (Click to copy)
              </span>
              <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                {['{{first_name}}', '{{companyName}}', '{{creatorName}}', '{{email}}', '{{partner_portal}}'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleFieldChange('bodyText', `${config.bodyText || ''} ${v}`)}
                    className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-amber-700 dark:text-gold-400 hover:border-amber-500"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. IF / ELSE LOGIC CONFIGURATION */}
        {node.type === 'logic_if_else' && (
          <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                Condition Property Field
              </label>
              <input
                type="text"
                value={config.field || 'status'}
                onChange={(e) => handleFieldChange('field', e.target.value)}
                placeholder="e.g. status, tier, followers"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                Evaluation Operator
              </label>
              <select
                value={config.operator || 'equals'}
                onChange={(e) => handleFieldChange('operator', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
              >
                <option value="equals">Equals (==)</option>
                <option value="not_equals">Does Not Equal (!=)</option>
                <option value="contains">Contains Substring</option>
                <option value="greater_than">Greater Than (&gt;)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                Comparison Target Value
              </label>
              <input
                type="text"
                value={config.value || 'approved'}
                onChange={(e) => handleFieldChange('value', e.target.value)}
                placeholder="e.g. approved"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* 3. WAIT / DELAY CONFIGURATION */}
        {node.type === 'action_wait_delay' && (
          <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                  Duration
                </label>
                <input
                  type="number"
                  min="1"
                  value={config.duration || 2}
                  onChange={(e) => handleFieldChange('duration', parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                  Time Unit
                </label>
                <select
                  value={config.unit || 'days'}
                  onChange={(e) => handleFieldChange('unit', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 4. TAG CONFIGURATION */}
        {node.type === 'action_add_tag' && (
          <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                Tag Label
              </label>
              <input
                type="text"
                value={config.tag || 'Strategic Partner'}
                onChange={(e) => handleFieldChange('tag', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* 5. HTTP WEBHOOK */}
        {node.type === 'action_http_webhook' && (
          <div className="space-y-4 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                HTTP Method
              </label>
              <select
                value={config.method || 'POST'}
                onChange={(e) => handleFieldChange('method', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white font-mono"
              >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                Destination URL
              </label>
              <input
                type="url"
                value={config.url || 'https://api.external.com/v1/notify'}
                onChange={(e) => handleFieldChange('url', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
        <span className="text-[10px] text-gray-500 font-mono">
          Node ID: {node.id}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-gold-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500 hover:text-white transition-colors"
        >
          Done
        </button>
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import {
  X,
  Settings,
  Info,
  Sparkles
} from 'lucide-react';
import { FlowNode } from '../../../types/flow';
import { FLOW_NODE_DEFINITIONS } from '../../../data/flowNodesData';
import { useMail } from '../../../context/MailContext';

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
  const { templates } = useMail();
  const [isVarPickerOpen, setIsVarPickerOpen] = useState(false);
  const [activeInputTarget, setActiveInputTarget] = useState<string>('bodyText');

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

  const handleInsertVariable = (varToken: string) => {
    const currentVal = config[activeInputTarget] || '';
    handleFieldChange(activeInputTarget, `${currentVal} ${varToken}`.trim());
    setIsVarPickerOpen(false);
  };

  const variableCategories = [
    {
      category: 'Trigger / Contact Data',
      vars: ['{{first_name}}', '{{last_name}}', '{{email}}', '{{companyName}}', '{{phone}}']
    },
    {
      category: 'Corporate Partner Data',
      vars: ['{{partner.companyName}}', '{{partner.tier}}', '{{partner.status}}', '{{partner.track}}', '{{partner_portal}}']
    },
    {
      category: 'Creator / Influencer Data',
      vars: ['{{creatorName}}', '{{handle}}', '{{platform}}', '{{followersCount}}', '{{niche}}', '{{campaign_name}}']
    },
    {
      category: 'System & Execution',
      vars: ['{{now}}', '{{execution.id}}', '{{http_response.status}}', '{{http_response.body}}']
    }
  ];

  return (
    <aside className="fixed right-0 top-[60px] bottom-0 w-88 sm:w-[420px] z-40 bg-white dark:bg-[#0c0c14] border-l border-gray-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fadeIn select-none">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-gold-400 flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Configure Node
            </h3>
            <span className="text-[10px] text-gray-500 font-mono">
              {node.category.toUpperCase()} • {node.type}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Config Form Fields */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
        {/* Node Label Title */}
        <div className="space-y-1.5">
          <label className="font-semibold text-gray-700 dark:text-gray-300 block">
            Node Step Label
          </label>
          <input
            type="text"
            value={node.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 font-bold text-gray-900 dark:text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Node Description Overview */}
        {definition && (
          <div className="p-3 rounded-2xl bg-amber-500/5 dark:bg-gold-500/5 border border-amber-500/15 dark:border-gold-500/15 text-gray-600 dark:text-gray-400 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0 mt-0.5" />
            <span className="text-[11px]">{definition.description}</span>
          </div>
        )}

        {/* Variable Insertion Quick Bar */}
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Dynamic Variables</span>
            </span>
            <button
              type="button"
              onClick={() => setIsVarPickerOpen(!isVarPickerOpen)}
              className="px-2 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-gold-300 border border-amber-500/30 text-[10px] font-bold hover:bg-amber-500 hover:text-white transition-colors"
            >
              {isVarPickerOpen ? 'Hide Picker' : '+ Insert Variable'}
            </button>
          </div>

          {/* Variable Picker Dropdown */}
          {isVarPickerOpen && (
            <div className="p-3 rounded-xl bg-white dark:bg-[#161626] border border-gray-200 dark:border-white/10 space-y-3 animate-fadeIn shadow-lg">
              <p className="text-[10px] text-gray-500">
                Click any token to append to active field:
              </p>
              {variableCategories.map((group) => (
                <div key={group.category} className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {group.vars.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => handleInsertVariable(v)}
                        className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-amber-500/20 text-amber-700 dark:text-gold-400 font-mono text-[10px] border border-gray-200 dark:border-white/10"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 1. EMAIL ACTION */}
        {(node.type === 'action_send_email' || node.category === 'action') && node.type.includes('email') && (
          <div className="space-y-3.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Recipient Email (To) *
              </label>
              <input
                type="text"
                onFocus={() => setActiveInputTarget('to')}
                value={config.to || '{{email}}'}
                onChange={(e) => handleFieldChange('to', e.target.value)}
                placeholder="{{email}} or partner@enterprise.com"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 font-mono text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                  CC (Optional)
                </label>
                <input
                  type="text"
                  onFocus={() => setActiveInputTarget('cc')}
                  value={config.cc || ''}
                  onChange={(e) => handleFieldChange('cc', e.target.value)}
                  placeholder="team@jonanda.com"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                  BCC (Optional)
                </label>
                <input
                  type="text"
                  onFocus={() => setActiveInputTarget('bcc')}
                  value={config.bcc || ''}
                  onChange={(e) => handleFieldChange('bcc', e.target.value)}
                  placeholder="archive@jonanda.com"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Subject Line *
              </label>
              <input
                type="text"
                onFocus={() => setActiveInputTarget('subject')}
                value={config.subject || ''}
                onChange={(e) => handleFieldChange('subject', e.target.value)}
                placeholder="e.g. Welcome {{first_name}} to JONANDA Ecosystem"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Load Existing Template (Optional)
              </label>
              <select
                value={config.templateId || ''}
                onChange={(e) => {
                  const tmpl = templates.find((t) => t.id === e.target.value);
                  if (tmpl) {
                    onUpdateConfig(node.id, {
                      ...config,
                      templateId: e.target.value,
                      subject: tmpl.subject,
                      bodyText: tmpl.bodyHtml.replace(/<[^>]*>?/gm, '')
                    });
                  } else {
                    handleFieldChange('templateId', '');
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
              >
                <option value="">-- Custom Message Body --</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    [{t.category}] {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Email Message Body *
              </label>
              <textarea
                rows={6}
                onFocus={() => setActiveInputTarget('bodyText')}
                value={config.bodyText || ''}
                onChange={(e) => handleFieldChange('bodyText', e.target.value)}
                placeholder="Hello {{first_name}},\n\nYour partnership application has been approved."
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-sans"
              />
            </div>
          </div>
        )}

        {/* 2. IF / ELSE LOGIC */}
        {node.type === 'logic_if_else' && (
          <div className="space-y-3.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Property / Variable Field
              </label>
              <input
                type="text"
                value={config.field || 'status'}
                onChange={(e) => handleFieldChange('field', e.target.value)}
                placeholder="status, tier, followers, email"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Operator
              </label>
              <select
                value={config.operator || 'equals'}
                onChange={(e) => handleFieldChange('operator', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
              >
                <option value="equals">Equals (==)</option>
                <option value="not_equals">Does Not Equal (!=)</option>
                <option value="contains">Contains Substring</option>
                <option value="does_not_contain">Does Not Contain</option>
                <option value="greater_than">Greater Than (&gt;)</option>
                <option value="less_than">Less Than (&lt;)</option>
                <option value="exists">Exists / Is Set</option>
                <option value="is_empty">Is Empty / Null</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Comparison Target Value
              </label>
              <input
                type="text"
                value={config.value || 'approved'}
                onChange={(e) => handleFieldChange('value', e.target.value)}
                placeholder="approved"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* 3. WAIT / DELAY */}
        {node.type === 'action_wait_delay' && (
          <div className="space-y-3.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                  Duration Value
                </label>
                <input
                  type="number"
                  min="1"
                  value={config.duration || 2}
                  onChange={(e) => handleFieldChange('duration', parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                  Time Unit
                </label>
                <select
                  value={config.unit || 'days'}
                  onChange={(e) => handleFieldChange('unit', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 4. LOOP / FOR EACH */}
        {node.type === 'logic_loop' && (
          <div className="space-y-3.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Array Input Expression *
              </label>
              <input
                type="text"
                value={config.arrayField || '{{influencers}}'}
                onChange={(e) => handleFieldChange('arrayField', e.target.value)}
                placeholder="{{influencers}} or {{contacts}}"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 font-mono text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Item Variable Alias
              </label>
              <input
                type="text"
                value={config.itemVariable || 'influencer'}
                onChange={(e) => handleFieldChange('itemVariable', e.target.value)}
                placeholder="influencer"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* 5. HTTP / REST API REQUEST */}
        {node.type === 'action_http_request' && (
          <div className="space-y-3.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1 col-span-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                  Method
                </label>
                <select
                  value={config.method || 'POST'}
                  onChange={(e) => handleFieldChange('method', e.target.value)}
                  className="w-full px-2 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-mono"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>

              <div className="space-y-1 col-span-2">
                <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                  Endpoint URL *
                </label>
                <input
                  type="url"
                  value={config.url || 'https://api.external.com/v1/resource'}
                  onChange={(e) => handleFieldChange('url', e.target.value)}
                  placeholder="https://api.external.com/v1/resource"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                JSON Body Payload
              </label>
              <textarea
                rows={4}
                value={config.body || '{\n  "status": "approved"\n}'}
                onChange={(e) => handleFieldChange('body', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-mono text-[11px]"
              />
            </div>
          </div>
        )}

        {/* 6. AI TASK GENERATOR */}
        {node.type.startsWith('ai_') && (
          <div className="space-y-3.5 pt-2 border-t border-gray-200 dark:border-white/10">
            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                AI Task Type
              </label>
              <select
                value={config.task || 'Generate'}
                onChange={(e) => handleFieldChange('task', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
              >
                <option value="Generate">Generate Content</option>
                <option value="Summarize">Summarize Input</option>
                <option value="Classify">Classify Intent / Urgency</option>
                <option value="Extract">Extract Entities / JSON</option>
                <option value="Rewrite">Rewrite / Polish Tone</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Prompt Template
              </label>
              <textarea
                rows={4}
                value={config.prompt || 'Draft a personalized partnership welcome message for {{companyName}}.'}
                onChange={(e) => handleFieldChange('prompt', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                Output Variable Name
              </label>
              <input
                type="text"
                value={config.outputVar || 'ai_generated_text'}
                onChange={(e) => handleFieldChange('outputVar', e.target.value)}
                placeholder="ai_generated_text"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02]">
        <span className="text-[10px] text-gray-500 font-mono">
          ID: {node.id}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm"
        >
          Save & Close
        </button>
      </div>
    </aside>
  );
};

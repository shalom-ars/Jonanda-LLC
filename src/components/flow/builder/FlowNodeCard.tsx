import React from 'react';
import {
  Handshake,
  CheckCircle2,
  Users,
  Sparkles,
  Briefcase,
  FileText,
  UserPlus,
  Globe,
  Clock,
  Play,
  Mail,
  Tag,
  ShieldCheck,
  Hourglass,
  ExternalLink,
  Bell,
  GitBranch,
  Filter,
  StopCircle,
  Database,
  Variable,
  Trash2,
  Copy,
  Code,
  RotateCw,
  Search
} from 'lucide-react';
import { FlowNode, NodeCategory } from '../../../types/flow';
import { FLOW_NODE_DEFINITIONS } from '../../../data/flowNodesData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Handshake,
  CheckCircle2,
  Users,
  Sparkles,
  Briefcase,
  FileText,
  UserPlus,
  Globe,
  Clock,
  Play,
  Mail,
  Tag,
  ShieldCheck,
  Hourglass,
  ExternalLink,
  Bell,
  GitBranch,
  Filter,
  StopCircle,
  Database,
  Variable,
  Code,
  RotateCw,
  Search
};

interface FlowNodeCardProps {
  node: FlowNode;
  isSelected: boolean;
  onSelect: (nodeId: string) => void;
  onDelete: (nodeId: string) => void;
  onDuplicate: (nodeId: string) => void;
  onStartConnect: (nodeId: string, portId: string, e: React.MouseEvent) => void;
  onEndConnect: (nodeId: string, portId: string) => void;
}

export const FlowNodeCard: React.FC<FlowNodeCardProps> = ({
  node,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onStartConnect,
  onEndConnect
}) => {
  const definition = FLOW_NODE_DEFINITIONS[node.type] || {
    category: node.category,
    iconName: 'Sparkles',
    color: 'gold',
    title: node.title,
    subtitle: '',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Out', type: 'output' }]
  };

  const IconComp = iconMap[definition.iconName] || Sparkles;

  // Category badge colors covering all 8 NodeCategory types
  const categoryStyles: Record<NodeCategory, string> = {
    trigger: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    action: 'bg-amber-500/15 text-amber-700 dark:text-gold-300 border-amber-500/30',
    logic: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
    data: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
    ai: 'bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30',
    database: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
    integration: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    code: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
  };

  const iconBgStyles: Record<NodeCategory, string> = {
    trigger: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    action: 'bg-amber-500/10 text-amber-600 dark:text-gold-400 border-amber-500/30',
    logic: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    data: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    ai: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
    database: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    integration: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    code: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      className={`
        relative w-[240px] rounded-2xl p-3.5 select-none transition-all duration-200 cursor-grab active:cursor-grabbing
        bg-white dark:bg-[#12121c] border
        ${
          isSelected
            ? 'border-amber-500 dark:border-gold-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] ring-2 ring-amber-500/40 dark:ring-gold-400/40'
            : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-lg'
        }
      `}
    >
      {/* Node Top Row: Icon + Category Badge + Action Buttons */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${iconBgStyles[node.category] || iconBgStyles.action}`}>
            <IconComp className="w-4 h-4" />
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${categoryStyles[node.category] || categoryStyles.action}`}>
            {node.category}
          </span>
        </div>

        {/* Action Controls on Hover/Select */}
        <div className="flex items-center gap-1 opacity-80 hover:opacity-100">
          <button
            type="button"
            title="Duplicate node"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(node.id);
            }}
            className="p-1 rounded text-gray-400 hover:text-amber-600 dark:hover:text-gold-300 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            type="button"
            title="Delete node"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
            className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-500/10"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Node Title & Description */}
      <div>
        <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
          {node.title}
        </h4>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
          {definition.subtitle || definition.description}
        </p>
      </div>

      {/* Left Input Port Handle */}
      {definition.inputs && definition.inputs.length > 0 && (
        <div
          onMouseUp={(e) => {
            e.stopPropagation();
            onEndConnect(node.id, 'in');
          }}
          className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white dark:bg-[#12121c] border-2 border-gray-400 dark:border-white/40 hover:border-amber-500 dark:hover:border-gold-400 flex items-center justify-center cursor-crosshair group/port z-20 shadow-sm"
          title="Connect Input"
        >
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-white/40 group-hover/port:bg-amber-500 dark:group-hover/port:bg-gold-400" />
        </div>
      )}

      {/* Right Output Port Handle(s) */}
      {definition.outputs && definition.outputs.length > 0 && (
        <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {definition.outputs.map((outPort) => (
            <div
              key={outPort.id}
              onMouseDown={(e) => {
                e.stopPropagation();
                onStartConnect(node.id, outPort.id, e);
              }}
              className="w-5 h-5 rounded-full bg-white dark:bg-[#12121c] border-2 border-amber-500 dark:border-gold-400 hover:scale-125 flex items-center justify-center cursor-crosshair group/port shadow-sm transition-transform"
              title={`Drag from ${outPort.label}`}
            >
              <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-gold-400 group-hover/port:bg-amber-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

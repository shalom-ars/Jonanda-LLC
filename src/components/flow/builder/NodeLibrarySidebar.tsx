import React, { useState } from 'react';
import {
  Search,
  Zap,
  Play,
  GitBranch,
  Database,
  Plus,
  ChevronLeft,
  ChevronRight,
  Handshake,
  CheckCircle2,
  Users,
  Sparkles,
  Briefcase,
  FileText,
  UserPlus,
  Globe,
  Clock,
  Mail,
  Tag,
  ShieldCheck,
  Hourglass,
  ExternalLink,
  Bell,
  Filter,
  StopCircle,
  Variable,
  Layers,
  Code,
  RotateCw,
  Send
} from 'lucide-react';
import { FLOW_NODE_DEFINITIONS } from '../../../data/flowNodesData';
import { NodeCategory } from '../../../types/flow';

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
  Layers,
  Code,
  RotateCw,
  Send,
  Zap
};

interface NodeLibrarySidebarProps {
  onAddNode: (type: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const NodeLibrarySidebar: React.FC<NodeLibrarySidebarProps> = ({
  onAddNode,
  isOpen,
  onToggle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NodeCategory | 'all'>('all');

  const nodeEntries = Object.values(FLOW_NODE_DEFINITIONS);

  const filteredNodes = nodeEntries.filter((node) => {
    const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
    const matchesSearch =
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryCounts = {
    all: nodeEntries.length,
    trigger: nodeEntries.filter((n) => n.category === 'trigger').length,
    action: nodeEntries.filter((n) => n.category === 'action').length,
    logic: nodeEntries.filter((n) => n.category === 'logic').length,
    data: nodeEntries.filter((n) => n.category === 'data').length,
    ai: nodeEntries.filter((n) => n.category === 'ai').length
  };

  return (
    <aside
      className={`
        fixed left-0 top-[60px] bottom-0 z-30 transition-all duration-300 flex
        ${isOpen ? 'w-80' : 'w-0'}
      `}
    >
      {/* Sidebar Content Panel */}
      <div
        className={`
          w-80 h-full bg-white dark:bg-[#0c0c14] border-r border-gray-200 dark:border-white/10 flex flex-col overflow-hidden shadow-xl
          ${!isOpen && 'hidden'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 dark:text-gold-400" />
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Node Library
              </h3>
            </div>
            <span className="text-[10px] font-mono text-gray-500">
              {filteredNodes.length} nodes
            </span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search triggers, actions, logic..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-100 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-amber-500/20 text-amber-700 dark:text-gold-300 border border-amber-500/30'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              All ({categoryCounts.all})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('trigger')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                selectedCategory === 'trigger'
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                  : 'text-gray-500 hover:text-emerald-400'
              }`}
            >
              Triggers ({categoryCounts.trigger})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('action')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                selectedCategory === 'action'
                  ? 'bg-amber-500/20 text-amber-700 dark:text-gold-300 border border-amber-500/30'
                  : 'text-gray-500 hover:text-amber-400'
              }`}
            >
              Actions ({categoryCounts.action})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('logic')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                selectedCategory === 'logic'
                  ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                  : 'text-gray-500 hover:text-purple-400'
              }`}
            >
              Logic ({categoryCounts.logic})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('ai')}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                selectedCategory === 'ai'
                  ? 'bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-500/30'
                  : 'text-gray-500 hover:text-pink-400'
              }`}
            >
              AI ({categoryCounts.ai})
            </button>
          </div>
        </div>

        {/* Scrollable Node Cards List with Native Drag-to-Canvas Support */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <p className="text-[10px] text-gray-400 px-1 font-medium">
            Drag onto canvas or click &apos;+&apos; to add:
          </p>

          {filteredNodes.map((def) => {
            const IconComp = iconMap[def.iconName] || Zap;

            const categoryBorder =
              def.category === 'trigger'
                ? 'hover:border-emerald-500/50'
                : def.category === 'action'
                ? 'hover:border-amber-500/50'
                : def.category === 'logic'
                ? 'hover:border-purple-500/50'
                : 'hover:border-blue-500/50';

            const iconColor =
              def.category === 'trigger'
                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                : def.category === 'action'
                ? 'text-amber-600 dark:text-gold-400 bg-amber-500/10'
                : def.category === 'logic'
                ? 'text-purple-600 dark:text-purple-400 bg-purple-500/10'
                : 'text-blue-600 dark:text-blue-400 bg-blue-500/10';

            return (
              <div
                key={def.type}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', def.type);
                  e.dataTransfer.effectAllowed = 'copy';
                }}
                onClick={() => onAddNode(def.type)}
                className={`
                  p-2.5 rounded-2xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.06]
                  hover:bg-white dark:hover:bg-[#161622] transition-all cursor-grab active:cursor-grabbing group shadow-sm flex items-start justify-between gap-2.5
                  ${categoryBorder}
                `}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${iconColor}`}>
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold-300 transition-colors">
                      {def.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1 leading-tight">
                      {def.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  title="Add to canvas"
                  className="p-1 rounded-lg bg-gray-200 dark:bg-white/5 group-hover:bg-amber-500 group-hover:text-white text-gray-500 dark:text-gray-400 transition-colors shrink-0"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toggle Button tab */}
      <button
        type="button"
        onClick={onToggle}
        className="self-center -mr-3 z-30 p-1.5 rounded-r-xl bg-white dark:bg-[#12121c] border border-l-0 border-gray-200 dark:border-white/10 text-gray-500 hover:text-amber-600 dark:hover:text-gold-400 shadow-md"
        title={isOpen ? 'Collapse Library' : 'Expand Library'}
      >
        {isOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>
    </aside>
  );
};

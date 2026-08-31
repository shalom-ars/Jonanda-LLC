import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Play,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Layers,
  Zap,
  Undo2,
  Redo2,
  Maximize2,
  MapPin,
  UploadCloud
} from 'lucide-react';
import { Workflow, WorkflowCategory } from '../../../types/flow';
import { Button } from '../../common/Button';

interface BuilderTopBarProps {
  workflow: Workflow;
  onUpdateWorkflowName: (name: string) => void;
  onUpdateCategory: (category: WorkflowCategory) => void;
  onToggleStatus: () => void;
  onSave: () => void;
  onPublishVersion: () => void;
  onTest: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onAutoArrange: () => void;
  onFitToScreen: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  isMinimapOpen: boolean;
  onToggleMinimap: () => void;
}

export const BuilderTopBar: React.FC<BuilderTopBarProps> = ({
  workflow,
  onUpdateWorkflowName,
  onUpdateCategory,
  onToggleStatus,
  onSave,
  onPublishVersion,
  onTest,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onAutoArrange,
  onFitToScreen,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isMinimapOpen,
  onToggleMinimap
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(workflow.name);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  const handleNameBlur = () => {
    setIsEditingName(false);
    if (nameInput.trim()) {
      onUpdateWorkflowName(nameInput.trim());
    } else {
      setNameInput(workflow.name);
    }
  };

  const handleSaveClick = () => {
    onSave();
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] z-40 bg-white/95 dark:bg-[#09090f]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-4 flex items-center justify-between shadow-sm">
      {/* Left: Back Link + Workflow Name Editor + Category */}
      <div className="flex items-center gap-3">
        <Link
          to="/flow/workflows"
          className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
          title="Back to Workflows"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        {/* Brand Label */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-[10px] font-bold text-amber-700 dark:text-gold-300">
          <Zap className="w-3 h-3" />
          <span>JONANDA FLOW</span>
        </div>

        {/* Editable Name */}
        {isEditingName ? (
          <input
            type="text"
            autoFocus
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleNameBlur()}
            className="px-2 py-1 text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-[#141420] border border-amber-500 rounded focus:outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditingName(true)}
            className="text-sm font-bold text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-gold-300 transition-colors flex items-center gap-2 group"
          >
            <span className="truncate max-w-[150px] sm:max-w-xs">{workflow.name}</span>
            <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100">
              (edit)
            </span>
          </button>
        )}

        {/* Category Pill Selector */}
        <select
          value={workflow.category}
          onChange={(e) => onUpdateCategory(e.target.value as WorkflowCategory)}
          className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          <option value="partner">partner</option>
          <option value="influencer">influencer</option>
          <option value="brand">brand</option>
          <option value="customer">customer</option>
          <option value="ecosystem">ecosystem</option>
          <option value="api">api</option>
          <option value="ai">ai</option>
          <option value="custom">custom</option>
        </select>

        {/* Version Badge */}
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-500 border border-gray-200 dark:border-white/10">
          v{workflow.version || 1}.0
        </span>
      </div>

      {/* Middle: Canvas View Controls (Undo, Redo, Zoom, Auto-Arrange, Minimap) */}
      <div className="hidden lg:flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10">
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-30"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          disabled={!canRedo}
          onClick={onRedo}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-30"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-4 bg-gray-300 dark:bg-white/10 mx-1" />

        <button
          type="button"
          onClick={onZoomOut}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onResetZoom}
          className="px-2 py-1 text-[11px] font-mono font-bold text-gray-600 dark:text-gray-300 hover:text-amber-500"
          title="Reset Zoom"
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          type="button"
          onClick={onZoomIn}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-4 bg-gray-300 dark:bg-white/10 mx-1" />

        <button
          type="button"
          onClick={onFitToScreen}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10"
          title="Fit to Screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onAutoArrange}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10"
          title="Auto Arrange Nodes"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onToggleMinimap}
          className={`p-1.5 rounded-lg transition-colors ${
            isMinimapOpen
              ? 'bg-amber-500/20 text-amber-700 dark:text-gold-400'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
          title="Toggle Radar Minimap"
        >
          <MapPin className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Actions (Publish Version, Status Toggle, Test Run, Save) */}
      <div className="flex items-center gap-2">
        {/* Publish Version */}
        <button
          type="button"
          onClick={onPublishVersion}
          className="hidden sm:flex px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 transition-colors items-center gap-1.5"
          title="Publish immutable version snapshot"
        >
          <UploadCloud className="w-3.5 h-3.5 text-blue-500" />
          <span>Publish v{workflow.version + 1}.0</span>
        </button>

        {/* Status Toggle */}
        <button
          type="button"
          onClick={onToggleStatus}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
            workflow.status === 'active'
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
              : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-white/10 hover:bg-gray-200'
          }`}
          title="Toggle Active/Draft Status"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              workflow.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
            }`}
          />
          <span>{workflow.status}</span>
        </button>

        {/* Test Workflow Button */}
        <button
          type="button"
          onClick={onTest}
          className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-amber-500/15 hover:border-amber-500/30 text-xs font-bold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/10 transition-colors flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 text-amber-600 dark:text-gold-400" />
          <span className="hidden sm:inline">Test Run</span>
        </button>

        {/* Save Workflow Button */}
        <Button
          onClick={handleSaveClick}
          variant="primary"
          size="sm"
          className="text-xs px-3.5 py-1.5 shadow-sm"
          icon={isSavedRecently ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-950" /> : <Save className="w-3.5 h-3.5" />}
        >
          {isSavedRecently ? 'Saved!' : 'Save'}
        </Button>
      </div>
    </header>
  );
};

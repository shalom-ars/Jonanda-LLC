import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Layers, ChevronDown, Check, Sparkles, Shield, HeartHandshake, Globe } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProjectSwitcher: React.FC = () => {
  const { projects, currentProjectId, setCurrentProjectId } = useProject();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedProject = projects.find(p => p.id === currentProjectId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getProjectIcon = (slug: string) => {
    switch (slug) {
      case 'jonanda-llc':
        return <Globe className="w-4 h-4 text-brand-400" />;
      case 'lozula-cybersecurity':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'equalshare':
        return <HeartHandshake className="w-4 h-4 text-cyan-400" />;
      case 'jonanda-coin':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-100 transition-all text-sm group"
      >
        <div className="flex items-center gap-2">
          {selectedProject ? getProjectIcon(selectedProject.slug) : <Layers className="w-4 h-4 text-brand-400" />}
          <div className="text-left">
            <span className="font-semibold text-xs text-slate-400 uppercase tracking-wider block">Project</span>
            <span className="font-medium text-xs text-white max-w-[150px] truncate block">
              {selectedProject ? selectedProject.name : 'All Ecosystem Projects'}
            </span>
          </div>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 bg-[#0c1322] border border-slate-700 rounded-xl shadow-2xl z-50 py-2 divide-y divide-slate-800">
          <div className="px-3 py-1.5">
            <button
              onClick={() => {
                setCurrentProjectId('all');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                currentProjectId === 'all' ? 'bg-brand-600/20 text-brand-300 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" />
                <span>All Ecosystem Projects</span>
              </div>
              {currentProjectId === 'all' && <Check className="w-3.5 h-3.5 text-brand-400" />}
            </button>
          </div>

          <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Ecosystem Ventures
            </div>
            {projects.map(project => {
              const isSelected = currentProjectId === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    setCurrentProjectId(project.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                    isSelected ? 'bg-brand-600/20 text-brand-300 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getProjectIcon(project.slug)}
                    <div className="text-left truncate">
                      <span className="block truncate text-slate-100">{project.name}</span>
                      {project.domain ? (
                        <span className="text-[10px] text-slate-500 font-mono">{project.domain}</span>
                      ) : (
                        <span className="text-[10px] text-purple-400">No domain active</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge
                      variant={
                        project.status === 'Live'
                          ? 'success'
                          : project.status === 'Active'
                          ? 'info'
                          : project.status === 'Coming Soon'
                          ? 'purple'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {project.status}
                    </Badge>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

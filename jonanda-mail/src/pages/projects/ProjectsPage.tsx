import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { EcosystemProject } from '../../types';
import {
  Boxes,
  Globe,
  Mail,
  ShieldCheck,
  Sparkles,
  Shield,
  HeartHandshake,
  Bot,
  Search,
  Users,
  ShieldAlert,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProjectStatusBadge } from '../../components/common/Badge';

export const ProjectsPage: React.FC = () => {
  const { projects, setCurrentProjectId } = useProject();

  const getProjectIcon = (slug: string) => {
    switch (slug) {
      case 'jonanda-llc':
        return <Globe className="w-6 h-6 text-brand-400" />;
      case 'lozula-cybersecurity':
        return <Shield className="w-6 h-6 text-emerald-400" />;
      case 'equalshare':
        return <HeartHandshake className="w-6 h-6 text-cyan-400" />;
      case 'jonanda-coin':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'jonanda-studio':
        return <Bot className="w-6 h-6 text-purple-400" />;
      case 'jonanda-seo':
        return <Search className="w-6 h-6 text-indigo-400" />;
      case 'jonanda-influencer':
        return <Users className="w-6 h-6 text-pink-400" />;
      case 'jonanda-security-toolkit':
        return <ShieldAlert className="w-6 h-6 text-rose-400" />;
      default:
        return <Boxes className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Ecosystem Projects & Brands</h1>
          <span className="px-2.5 py-0.5 text-xs rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/30 font-mono">
            8 Ecosystem Ventures
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Centralized communication control plane for JONANDA LLC corporate and all incubated ventures. Each project maintains isolated mailboxes, verified domains, audience segments, and deliverability policies.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => {
          const hasDomain = project.hasLiveDomain && project.domain;

          return (
            <Card
              key={project.id}
              className="p-6 flex flex-col justify-between space-y-5 hover:border-slate-700 transition-all group"
            >
              <div className="space-y-4">
                {/* Header Icon + Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                    {getProjectIcon(project.slug)}
                  </div>
                  <ProjectStatusBadge status={project.status} />
                </div>

                {/* Project details */}
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{project.name}</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{project.category}</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{project.description}</p>
                </div>

                {/* Domain & Email Identities */}
                <div className="p-3 rounded-xl bg-[#090e1a] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Domain:</span>
                    {hasDomain ? (
                      <span className="font-mono text-brand-300 font-semibold">{project.domain}</span>
                    ) : (
                      <span className="text-purple-400 font-medium">Coming Soon (Staging)</span>
                    )}
                  </div>

                  <div className="text-xs space-y-1">
                    <span className="text-slate-500 block">Email Identities:</span>
                    <div className="space-y-1">
                      {project.emailIdentities.map((email, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
                          {hasDomain ? (
                            <>
                              <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>{email}</span>
                            </>
                          ) : (
                            <span className="text-slate-500 italic">{email}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  onClick={() => setCurrentProjectId(project.id)}
                  variant={hasDomain ? 'primary' : 'outline'}
                  size="sm"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {hasDomain ? 'Filter Workspace to This Project' : 'View Project Details'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

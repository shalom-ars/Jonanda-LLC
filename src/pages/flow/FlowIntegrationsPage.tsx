import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Plug,
  ShieldCheck,
  Zap,
  Mail,
  Database,
  Globe,
  Bell,
  Layers
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useFlow } from '../../context/FlowContext';
import { IntegrationApp } from '../../types/flow';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  ShieldCheck,
  Sparkles,
  Search,
  Zap,
  Database,
  Globe,
  Bell,
  Layers
};

export const FlowIntegrationsPage: React.FC = () => {
  const { integrations, toggleIntegrationConnect } = useFlow();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = integrations.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="App Integrations Catalog | JONANDA FLOW"
        description="Connect JONANDA MAIL, LOZULA, AI providers, PostgreSQL databases, and webhooks into visual automation pipelines."
        canonicalPath="/flow/integrations"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-3">
              <Plug className="w-3.5 h-3.5" />
              <span>Connected Ecosystem</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Integrations Catalog
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Connect external APIs, databases, AI models, and JONANDA products directly into Flow nodes.
            </p>
          </div>

          <Button href="/flow/credentials" variant="outline" size="md">
            Manage Credentials
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search integrations..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['all', 'ecosystem', 'ai', 'database', 'communication', 'crm', 'dev'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-700 dark:text-gold-300 border border-amber-500/40'
                    : 'bg-white dark:bg-surface/50 text-gray-500 border border-gray-200 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: IntegrationApp) => {
            const IconComp = iconMap[item.iconName] || Plug;

            return (
              <CorporateCard
                key={item.id}
                className="p-6 flex flex-col justify-between h-full space-y-4 hover:border-amber-500/30 transition-all shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-gold-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        item.isConnected
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                          : 'bg-gray-100 dark:bg-white/5 text-gray-500 border-gray-300 dark:border-white/10'
                      }`}
                    >
                      {item.isConnected ? 'Connected' : 'Available'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Capabilities tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Capabilities:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-[10px] font-medium border border-gray-200 dark:border-white/10"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    Auth: {item.authType}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleIntegrationConnect(item.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      item.isConnected
                        ? 'bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-700 dark:text-gold-300 hover:bg-amber-500 hover:text-white border border-amber-500/40'
                    }`}
                  >
                    {item.isConnected ? 'Disconnect' : 'Connect App'}
                  </button>
                </div>
              </CorporateCard>
            );
          })}
        </div>
      </div>
    </>
  );
};

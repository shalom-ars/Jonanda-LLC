import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { SEED_WORKFLOW_TEMPLATES } from '../../data/flowTemplatesData';
import { useFlow } from '../../context/FlowContext';
import { Workflow } from '../../types/flow';

export const FlowTemplatesPage: React.FC = () => {
  const { createFromTemplate } = useFlow();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTemplates = SEED_WORKFLOW_TEMPLATES.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  const handleUseTemplate = (templateId: string) => {
    const created = createFromTemplate(templateId);
    if (created) {
      navigate(`/flow/builder/${created.id}`);
    }
  };

  return (
    <>
      <SEOHead
        title="Workflow Templates Library | JONANDA FLOW"
        description="Instant automation blueprints for institutional partner vetting, creator onboarding, campaign follow-ups, and ecosystem alerts."
        canonicalPath="/flow/templates"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Blueprint Library</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Institutional Workflow Templates
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select an enterprise blueprint to clone and customize in your visual canvas.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {['all', 'partner', 'influencer', 'brand', 'customer', 'ecosystem'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-700 dark:text-gold-300 border border-amber-500/40'
                    : 'bg-white dark:bg-surface/50 text-gray-500 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template: Workflow) => (
            <CorporateCard
              key={template.id}
              className="p-6 flex flex-col justify-between h-full border-gray-200 dark:border-white/10 hover:border-purple-500/40 transition-all shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    {template.category} template
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {template.nodes.length} Steps
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed line-clamp-3">
                    {template.description}
                  </p>
                </div>

                {/* Steps Flow Preview */}
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Execution Graph
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-gray-700 dark:text-gray-300">
                    {template.nodes.map((n, idx) => (
                      <React.Fragment key={n.id}>
                        <span className="px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] truncate max-w-[120px]">
                          {n.title}
                        </span>
                        {idx < template.nodes.length - 1 && (
                          <span className="text-gray-400">&rarr;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-gray-200 dark:border-white/10">
                <Button
                  onClick={() => handleUseTemplate(template.id)}
                  variant="primary"
                  size="md"
                  className="w-full justify-between"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  <span>Use Template</span>
                </Button>
              </div>
            </CorporateCard>
          ))}
        </div>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { useMail } from '../context/MailContext';
import { usePartnersInfluencers } from '../context/PartnersInfluencersContext';
import {
  PARTNERSHIP_PROGRAMS,
  COLLABORATION_PILLARS,
  PartnershipProgram
} from '../data/partnersData';
import {
  Cloud,
  Cpu,
  ShieldCheck,
  Briefcase,
  HeartHandshake,
  Network,
  ArrowRight,
  Handshake,
  CheckCircle2,
  Send,
  AlertCircle,
  Inbox
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Cpu,
  ShieldCheck,
  Briefcase,
  HeartHandshake,
  Network
};

export const PartnersPage: React.FC = () => {
  const { receiveInboundMessage } = useMail();
  const { applyPartner } = usePartnersInfluencers();

  const [partnerForm, setPartnerForm] = useState({
    name: '',
    email: '',
    organization: '',
    category: 'Technology & Cloud Infrastructure',
    proposedScope: '',
    websiteUrl: '',
    honeypot: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [refId, setRefId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartnerForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (partnerForm.honeypot) {
      setFormStatus('success');
      return;
    }

    if (!partnerForm.name.trim() || !partnerForm.email.trim() || !partnerForm.organization.trim() || !partnerForm.proposedScope.trim()) {
      setFormStatus('error');
      setErrorMsg('Please complete all required fields (Name, Email, Organization, and Proposed Scope).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(partnerForm.email.trim())) {
      setFormStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setFormStatus('submitting');
    setTimeout(() => {
      const generated = `JNDA-PTNR-${Math.floor(100000 + Math.random() * 900000)}`;
      setRefId(generated);

      // 1. Add to Partners Review Queue
      applyPartner({
        companyName: partnerForm.organization.trim(),
        contactName: partnerForm.name.trim(),
        email: partnerForm.email.trim(),
        track: partnerForm.category,
        tier: 'Strategic',
        notes: partnerForm.proposedScope.trim()
      });

      // 2. Dispatch real message to JONANDA MAIL & Audience Ledger
      receiveInboundMessage({
        fromName: partnerForm.name.trim(),
        fromEmail: partnerForm.email.trim(),
        subject: `[Partner Application] ${partnerForm.organization.trim()} (${partnerForm.category}) - Ref: ${generated}`,
        body: `ORGANIZATION: ${partnerForm.organization.trim()}\nCONTACT: ${partnerForm.name.trim()}\nCATEGORY: ${partnerForm.category}\nWEBSITE: ${partnerForm.websiteUrl || 'N/A'}\nREFERENCE: ${generated}\n\n-- PROPOSED SCOPE --\n${partnerForm.proposedScope.trim()}`,
        tags: ['Partner Application', partnerForm.category, 'Strategic Partner'],
        sourceForm: 'Partners Application Form'
      });

      setFormStatus('success');
    }, 600);
  };

  return (
    <>
      <SEOHead
        title="Partnerships & Strategic Alliances | JONANDA LLC"
        description="Collaborate with JONANDA LLC across cloud infrastructure, AI systems, defensive cybersecurity, blockchain networks, and enterprise software engineering."
        canonicalPath="/partners"
        keywords="JONANDA LLC partnerships, technology alliances, AI partners, Web3 collaboration, cybersecurity research network, enterprise software partners"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 relative z-10">
        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/30 dark:border-gold-500/30 text-xs font-semibold text-amber-800 dark:text-gold-300 shadow-sm dark:shadow-gold-sm">
            <Handshake className="w-3.5 h-3.5 text-amber-600 dark:text-gold-400" />
            <span className="tracking-widest uppercase">STRATEGIC ALLIANCES & PARTNERSHIPS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            Co-Engineering the Next{' '}
            <span className="text-gradient-gold">
              Digital Economy.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <strong>JONANDA LLC</strong> collaborates with cloud infrastructure providers, AI research teams, cybersecurity analysts, decentralized protocols, and enterprise clients to develop resilient technological architectures.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="#partner-inquiry"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-gold-md"
            >
              Initiate Partnership Discussion
            </Button>

            <Button
              href="/ecosystem"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Our Ecosystem
            </Button>
          </div>
        </section>

        {/* Partnership Programs Grid (6 Categories) */}
        <section className="space-y-12">
          <SectionHeading
            badge="Partnership Categories"
            title="Collaboration"
            highlightedText="Programs"
            description="Explore our specialized partnership programs designed for technology providers, research entities, and enterprise builders."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERSHIP_PROGRAMS.map((prog: PartnershipProgram) => {
              const IconComp = iconMap[prog.iconName] || Cloud;

              return (
                <CorporateCard
                  key={prog.id}
                  className="p-8 flex flex-col justify-between h-full border-gray-200 dark:border-white/[0.08] hover:border-amber-500/30 dark:hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/30 dark:border-gold-500/30 text-amber-600 dark:text-gold-400 flex items-center justify-center shadow-sm">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400">
                        {prog.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-amber-700 dark:text-gold-300 font-medium">
                        {prog.tagline}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-1">
                        {prog.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-200/60 dark:border-white/[0.06]">
                      <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                        Partnership Advantages
                      </span>
                      <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                        {prog.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-gold-400 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-200/60 dark:border-white/[0.06]">
                      <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                        Ideal Partner Profile
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prog.idealFor.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-background/80 border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-200/60 dark:border-white/[0.06]">
                    <a
                      href="#partner-inquiry"
                      className="text-xs font-semibold text-amber-700 dark:text-gold-300 hover:text-amber-800 dark:hover:text-gold-200 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Apply for this Program</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </CorporateCard>
              );
            })}
          </div>
        </section>

        {/* Collaboration Principles & Values */}
        <section className="space-y-12">
          <SectionHeading
            badge="Alignment & Governance"
            title="How We"
            highlightedText="Collaborate"
            description="Our partnership engagements are built on mutual respect, architectural transparency, and shared technical excellence."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COLLABORATION_PILLARS.map((pillar, idx) => (
              <CorporateCard key={idx} className="p-8 space-y-4 border-gray-200 dark:border-white/[0.08] hover:border-amber-500/30 dark:hover:border-gold-500/30 transition-all duration-300">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-gold-400 block font-mono">
                  {pillar.highlight}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </CorporateCard>
            ))}
          </div>
        </section>

        {/* Strategic Partnership Inquiry Form */}
        <section id="partner-inquiry" className="space-y-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/30 dark:border-gold-500/30 text-xs font-semibold text-amber-800 dark:text-gold-300 shadow-sm dark:shadow-gold-sm">
              <Handshake className="w-3.5 h-3.5" />
              <span>Partner Engagement</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Initiate a Strategic Partnership
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Submit your organization's background and proposed collaboration framework. Our alliance coordinators will connect with you.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-surface/80 border border-gray-200 dark:border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-2xl relative backdrop-blur-xl max-w-4xl mx-auto">
            {formStatus === 'success' ? (
              <div className="text-center py-12 space-y-6 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-gold-300 font-bold">
                    Partnership Ref: {refId}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    Partnership Request Recorded & Dispatched
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Thank you for your interest in collaborating with <strong>JONANDA LLC</strong>. Your application is queued in our partner onboarding system, and our alliances team will review your proposal and respond via email at <span className="text-gray-900 dark:text-white font-semibold">{partnerForm.email}</span> within 2 business days.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-background/60 border border-gray-200 dark:border-white/[0.06] text-xs text-gray-600 dark:text-gray-400 text-left space-y-1">
                  <p className="text-gray-900 dark:text-gray-300 font-semibold">Direct Corporate Alliances:</p>
                  <p>You can also reach our partnership office at <a href="mailto:contact@jonanda.com" className="text-amber-700 dark:text-gold-300 font-semibold hover:underline">contact@jonanda.com</a> quoting reference <span className="font-mono text-gray-900 dark:text-white font-bold">{refId}</span>.</p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/mail/inbox"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-gold-300 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/20 transition-colors"
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>View in Webmail Inbox</span>
                  </Link>

                  <Button
                    onClick={() => {
                      setPartnerForm({
                        name: '',
                        email: '',
                        organization: '',
                        category: 'Technology & Cloud Infrastructure',
                        proposedScope: '',
                        websiteUrl: '',
                        honeypot: ''
                      });
                      setFormStatus('idle');
                    }}
                    variant="outline"
                    size="md"
                  >
                    Submit Another Partnership Proposal
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {formStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={partnerForm.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Contact Person Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={partnerForm.name}
                      onChange={handleChange}
                      placeholder="e.g. Jordan Lee"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Corporate / Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={partnerForm.email}
                      onChange={handleChange}
                      placeholder="name@organization.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Organization / Company Name *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={partnerForm.organization}
                      onChange={handleChange}
                      placeholder="e.g. CloudTech Systems Inc."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Organization Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={partnerForm.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Partnership Category / Track *
                  </label>
                  <select
                    name="category"
                    value={partnerForm.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/90 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                  >
                    <option value="Technology & Cloud Infrastructure">Technology & Cloud Infrastructure</option>
                    <option value="AI & Cognitive Systems">AI & Cognitive Systems</option>
                    <option value="Defensive Cybersecurity & Research">Defensive Cybersecurity & Research</option>
                    <option value="Web3 & Blockchain Protocols">Web3 & Blockchain Protocols</option>
                    <option value="Enterprise Solution Client">Enterprise Solution Client</option>
                    <option value="EqualShare Social Impact Initiative">EqualShare Social Impact Initiative</option>
                    <option value="Other Strategic Alignment">Other Strategic Alignment</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                    <span>Proposed Collaboration Scope & Strategic Objectives *</span>
                    <span className="text-[10px] text-gray-500">Provide an overview of mutual value</span>
                  </label>
                  <textarea
                    name="proposedScope"
                    rows={4}
                    value={partnerForm.proposedScope}
                    onChange={handleChange}
                    placeholder="Describe your organization's core focus, how you envision collaborating with JONANDA LLC, and key objectives..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors resize-y"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-white/[0.08]">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
                    🔒 All partnership discussions are conducted under institutional confidentiality protocols.
                  </p>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={formStatus === 'submitting'}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto shadow-gold-md"
                  >
                    {formStatus === 'submitting' ? 'Submitting Proposal...' : 'Submit Partnership Proposal'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

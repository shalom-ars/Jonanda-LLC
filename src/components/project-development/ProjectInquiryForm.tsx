import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { useMail } from '../../context/MailContext';
import { Send, CheckCircle2, AlertCircle, Sparkles, User, Code, DollarSign, Inbox, ShieldCheck } from 'lucide-react';

interface FormData {
  // Contact
  fullName: string;
  email: string;
  company: string;
  phone: string;
  // Project
  projectName: string;
  projectType: string;
  description: string;
  targetUsers: string;
  mainGoals: string;
  requiredFeatures: string;
  existingUrl: string;
  existingRepo: string;
  // Budget & Timeline
  budgetRange: string;
  timeline: string;
  currentStage: string;
  additionalNotes: string;
  // Honeypot
  websiteHp: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  projectName: '',
  projectType: 'Web Application',
  description: '',
  targetUsers: '',
  mainGoals: '',
  requiredFeatures: '',
  existingUrl: '',
  existingRepo: '',
  budgetRange: '$5,000 - $15,000',
  timeline: '1 - 3 Months',
  currentStage: 'Idea / Concept',
  additionalNotes: '',
  websiteHp: ''
};

export const ProjectInquiryForm: React.FC = () => {
  const { receiveInboundMessage } = useMail();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot detection
    if (formData.websiteHp) {
      setStatus('success');
      return;
    }

    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.projectName.trim() || !formData.description.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields (Name, Email, Project Name, and Description).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      const generatedRef = `JNDA-PRJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);

      // Real Inbound Message Dispatch to JONANDA MAIL & Audience Ledger
      receiveInboundMessage({
        fromName: formData.fullName.trim(),
        fromEmail: formData.email.trim(),
        subject: `[Project Brief] ${formData.projectName.trim()} (${formData.projectType}) - Ref: ${generatedRef}`,
        body: `PROJECT TITLE: ${formData.projectName.trim()}\nCATEGORY: ${formData.projectType}\nORGANIZATION: ${formData.company || 'N/A'}\nPHONE: ${formData.phone || 'N/A'}\nBUDGET: ${formData.budgetRange}\nTIMELINE: ${formData.timeline}\nSTAGE: ${formData.currentStage}\n\n-- SCOPE OVERVIEW --\n${formData.description.trim()}\n\nTARGET USERS: ${formData.targetUsers || 'General'}\nFEATURES: ${formData.requiredFeatures || 'Standard'}\nEXISTING URL/REPO: ${formData.existingUrl || formData.existingRepo || 'None'}\nNOTES: ${formData.additionalNotes || 'None'}`,
        tags: ['Project Proposal', formData.projectType, formData.budgetRange],
        sourceForm: 'Project Discovery Form'
      });

      setStatus('success');
    }, 600);
  };

  return (
    <div id="project-inquiry" className="rounded-3xl bg-white dark:bg-surface/80 border border-gray-200 dark:border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-2xl relative backdrop-blur-xl">
      {status === 'success' ? (
        <div className="text-center py-12 space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-gold-300 font-bold">
              Inquiry Reference: {referenceId}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Project Brief Recorded & Dispatched
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Thank you for submitting your specifications to <strong>JONANDA LLC</strong>. Your scope has been queued in our engineering inbox and our technical leads will follow up at <span className="font-semibold text-gray-900 dark:text-white">{formData.email}</span> within 1-2 business days.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-background/80 border border-gray-200 dark:border-white/[0.06] text-xs text-left space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Project Scope Cryptographically Verified</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              You can also contact our engineering coordinators directly at <a href="mailto:contact@jonanda.com" className="text-amber-700 dark:text-gold-300 font-semibold hover:underline">contact@jonanda.com</a> referencing ID <span className="font-mono text-gray-900 dark:text-white font-bold">{referenceId}</span>.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/mail/inbox"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-gold-300 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/20 transition-colors"
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Review in Webmail Inbox</span>
            </Link>

            <Button
              onClick={() => {
                setFormData(initialFormData);
                setStatus('idle');
              }}
              variant="outline"
              size="md"
            >
              Submit Another Project Brief
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/20 text-xs font-semibold text-amber-800 dark:text-gold-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Brief & Scope Discovery</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Start Your Project with JONANDA LLC
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Provide as much detail as possible. Our technical leads will analyze your requirements and prepare an initial architectural scope.
            </p>
          </div>

          {/* Error Alert */}
          {status === 'error' && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Honeypot Field */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="websiteHp"
              value={formData.websiteHp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* SECTION 1: CONTACT INFORMATION */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/[0.08] pb-2">
              <User className="w-4 h-4 text-amber-600 dark:text-gold-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                1. Contact & Organization Information
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                  <span>Business Email Address *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Company / Organization Name (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Innovations LLC"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Phone / Telegram (Optional)
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: PROJECT SPECIFICATIONS */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/[0.08] pb-2">
              <Code className="w-4 h-4 text-amber-600 dark:text-gold-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                2. Project Concept & Technical Scope
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Project Title / Working Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="e.g. NextGen SaaS Analytics Platform"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Primary Project Category *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/90 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                >
                  <option value="Website">Website / Corporate Web</option>
                  <option value="Web Application">Web Application / Portal</option>
                  <option value="Mobile App">Mobile Application (iOS / Android)</option>
                  <option value="SaaS Platform">SaaS / Multi-Tenant Platform</option>
                  <option value="AI Product">AI Product / Agent Workflows</option>
                  <option value="Cybersecurity">Cybersecurity & Defensive Tools</option>
                  <option value="Web3 / Blockchain">Web3 / Blockchain / Digital Assets</option>
                  <option value="SEO Platform">SEO & Digital Growth Tools</option>
                  <option value="E-commerce">E-commerce / Storefront</option>
                  <option value="Business Software">Internal Business Software / ERP / CRM</option>
                  <option value="API / Backend">API / Backend & Microservices</option>
                  <option value="Other">Other Custom Engineering</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Detailed Project Overview & Problem Statement *</span>
                <span className="text-[10px] text-gray-500">Provide core objectives</span>
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain the concept, the core problem it solves, and what you want the application to accomplish..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Target Audience & Intended Users
                </label>
                <input
                  type="text"
                  name="targetUsers"
                  value={formData.targetUsers}
                  onChange={handleChange}
                  placeholder="e.g. Enterprise HR teams, Web3 developers, B2B buyers"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Key Must-Have Features / Modules
                </label>
                <input
                  type="text"
                  name="requiredFeatures"
                  value={formData.requiredFeatures}
                  onChange={handleChange}
                  placeholder="e.g. Auth, Stripe billing, OpenAI API, Admin dashboard"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Existing Website / Demo URL (Optional)
                </label>
                <input
                  type="url"
                  name="existingUrl"
                  value={formData.existingUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Existing Git Repository / Specs (Optional)
                </label>
                <input
                  type="text"
                  name="existingRepo"
                  value={formData.existingRepo}
                  onChange={handleChange}
                  placeholder="e.g. github.com/org/repo (or private share)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: BUDGET, TIMELINE & STAGE */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/[0.08] pb-2">
              <DollarSign className="w-4 h-4 text-amber-600 dark:text-gold-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                3. Budget, Stage & Target Timeline
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Estimated Budget Range
                </label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/90 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                >
                  <option value="< $5,000">&lt; $5,000 (Focused MVP / Landing)</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000 (Standard Application)</option>
                  <option value="$15,000 - $30,000">$15,000 - $30,000 (Full-Stack Platform)</option>
                  <option value="$30,000 - $75,000">$30,000 - $75,000 (Enterprise SaaS / Complex AI)</option>
                  <option value="$75,000+">$75,000+ (Large Distributed System)</option>
                  <option value="Flexible / Discovery Phase">Flexible / Discovery Phase</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Desired Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/90 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                >
                  <option value="< 1 Month">&lt; 1 Month (Fast-Track / Sprint)</option>
                  <option value="1 - 3 Months">1 - 3 Months (Standard Production)</option>
                  <option value="3 - 6 Months">3 - 6 Months (Multi-Phase Platform)</option>
                  <option value="6+ Months">6+ Months (Long-Term Continuous Build)</option>
                  <option value="Flexible">Flexible / Quality Focused</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Current Project Stage
                </label>
                <select
                  name="currentStage"
                  value={formData.currentStage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/90 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors"
                >
                  <option value="Idea / Concept">Idea / Concept Stage</option>
                  <option value="Wireframes / Specs Ready">Wireframes / Specs Ready</option>
                  <option value="MVP in Progress">MVP in Progress (Needs Completion)</option>
                  <option value="Existing Live Product">Existing Live Product (Rebuild / Expansion)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Additional Requirements or Special Considerations (Optional)
              </label>
              <textarea
                name="additionalNotes"
                rows={3}
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any third-party integrations, compliance constraints, or specific design preferences..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-background/70 border border-gray-300 dark:border-white/[0.1] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-amber-500/60 dark:focus:border-gold-500/60 focus:ring-1 focus:ring-amber-500/60 dark:focus:ring-gold-500/60 transition-colors resize-y"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-white/[0.08]">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
              🔒 Information submitted is treated with strict confidentiality under corporate data standards.
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'submitting'}
              icon={<Send className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-gold-md"
            >
              {status === 'submitting' ? 'Transmitting Scope...' : 'Submit Project Inquiry'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

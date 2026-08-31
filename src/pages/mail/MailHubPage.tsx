import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Users,
  Send,
  FileText,
  Zap,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Inbox,
  Sparkles,
  GitBranch,
  Clock,
  Play
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';
import { CorporateCard } from '../../components/common/CorporateCard';
import { useMail } from '../../context/MailContext';

export const MailHubPage: React.FC = () => {
  const { contacts, campaigns, templates, messages } = useMail();

  const totalContacts = contacts.length;
  const activeCampaigns = campaigns.length;
  const totalTemplates = templates.length;

  return (
    <>
      <SEOHead
        title="JONANDA MAIL Suite | Corporate Messaging & Automation"
        description="Official enterprise mail infrastructure, audience management, broadcast campaigns, and automated communication pipelines."
        canonicalPath="/mail"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            <Mail className="w-3.5 h-3.5" />
            <span>JONANDA MAIL • Enterprise Communications</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            Corporate Mail &{' '}
            <span className="text-gradient-gold block sm:inline">
              Audience Communication
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Governed communication layer for JONANDA LLC. Manage audiences, broadcast templated updates, and trigger visual automation pipelines via JONANDA FLOW.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://mail.jonanda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl text-sm px-5 py-2.5 gap-2 bg-gold-gradient text-gray-950 shadow-gold-sm hover:brightness-105"
            >
              <span>Open Webmail (mail.jonanda.com)</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Button href="/flow/new" variant="primary" size="md" icon={<Zap className="w-4 h-4" />}>
              Build Flow Automation
            </Button>

            <Button href="/flow/templates" variant="outline" size="md" icon={<FileText className="w-4 h-4" />}>
              Email Templates Library
            </Button>
          </div>
        </div>

        {/* 4 Feature Module Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/mail/inbox"
            className="p-6 rounded-2xl bg-white dark:bg-[#11111a] border border-gray-200 dark:border-white/10 hover:border-emerald-500/40 transition-all shadow-sm group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Webmail Client
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Review verified incoming correspondence and system notifications.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>{messages.length} Messages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/mail/contacts"
            className="p-6 rounded-2xl bg-white dark:bg-[#11111a] border border-gray-200 dark:border-white/10 hover:border-amber-500/40 transition-all shadow-sm group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-gold-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Audience & Contacts
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Manage partner lists, creator segments, and suppression policies.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-gold-400">
              <span>{totalContacts} Contacts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/mail/campaigns"
            className="p-6 rounded-2xl bg-white dark:bg-[#11111a] border border-gray-200 dark:border-white/10 hover:border-purple-500/40 transition-all shadow-sm group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Broadcast Campaigns
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Launch targeted ecosystem newsletters, brief invites, and reports.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
              <span>{activeCampaigns} Campaigns</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/mail/templates"
            className="p-6 rounded-2xl bg-white dark:bg-[#11111a] border border-gray-200 dark:border-white/10 hover:border-blue-500/40 transition-all shadow-sm group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Dynamic Templates
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Reusable email layouts with dynamic variables and preview tags.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>{totalTemplates} Templates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Section: Email Visual Automation Engine (n8n Concept) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 text-xs font-bold text-amber-700 dark:text-gold-300 border border-amber-500/30 mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Visual Workflow Automation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Automate Email Sequences with JONANDA FLOW
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Connect triggers, conditional branching, webhook payloads, and AI personalization directly into JONANDA MAIL.
              </p>
            </div>

            <Button href="/flow/new" variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
              Open Canvas Builder
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CorporateCard className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-gold-400 flex items-center justify-center">
                  <GitBranch className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  Ready Template
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Partner Intake & Approval Sequence
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Intake Form &rarr; Ops Alert &rarr; Conditional Approval &rarr; Welcome Email &rarr; CRM Tagging.
                </p>
              </div>

              <Button href="/flow/templates" variant="outline" size="sm" className="w-full justify-center">
                Clone to Builder
              </Button>
            </CorporateCard>

            <CorporateCard className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  AI Powered
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  AI Creator Email Personalizer
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Creator Applied &rarr; AI Profile Analysis &rarr; Tailored Talking Points &rarr; Personalized Delivery.
                </p>
              </div>

              <Button href="/flow/templates" variant="outline" size="sm" className="w-full justify-center">
                Clone to Builder
              </Button>
            </CorporateCard>

            <CorporateCard className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                  Multi-Step Delay
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Campaign Brief & Reminder Drip
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Invitation &rarr; Acceptance Check &rarr; 3-Day Delay &rarr; Draft Submission Reminder.
                </p>
              </div>

              <Button href="/flow/templates" variant="outline" size="sm" className="w-full justify-center">
                Clone to Builder
              </Button>
            </CorporateCard>
          </div>
        </div>

        {/* Infrastructure Compliance Banner */}
        <div className="rounded-3xl bg-white dark:bg-[#11111a] border border-gray-200 dark:border-white/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Delivery Infrastructure (mail.jonanda.com)</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Institutional Delivery & Spam Compliance
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              JONANDA MAIL operates with strict cryptographic signing (SPF, DKIM, DMARC), suppression list management, and automated unsubscribe handling. No unsolicited mass communications are dispatched.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button href="/flow/workflows" variant="primary" size="md">
              View Linked Automations
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

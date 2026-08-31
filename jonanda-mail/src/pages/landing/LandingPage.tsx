import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  ShieldCheck,
  Globe,
  Inbox,
  Send,
  Workflow,
  BarChart3,
  Server,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Shield,
  HeartHandshake,
  Bot,
  Search,
  Users,
  ShieldAlert,
  Terminal,
  ExternalLink,
  Download
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge, ProjectStatusBadge } from '../../components/common/Badge';

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const ecosystemVentures = [
    { name: 'JONANDA LLC', status: 'Live' as const, desc: 'Corporate parent & holding enterprise', domain: 'jonanda.com', icon: Globe },
    { name: 'LOZULA Cybersecurity', status: 'Live' as const, desc: 'Defensive cyber diagnostics & security auditing', domain: 'lozula.com', icon: Shield },
    { name: 'EqualShare Foundation', status: 'Active' as const, desc: 'Digital inclusion & community education initiative', domain: 'equalshare.org', icon: HeartHandshake },
    { name: 'Jonanda Coin (JNDA)', status: 'Active' as const, desc: 'Web3 & AI digital asset utility infrastructure', domain: 'Staging', icon: Sparkles },
    { name: 'Jonanda Studio', status: 'Coming Soon' as const, desc: 'Autonomous AI workflow orchestrator', domain: 'Coming Soon', icon: Bot },
    { name: 'Jonanda SEO', status: 'Coming Soon' as const, desc: 'Automated SEO intelligence & website auditing', domain: 'Coming Soon', icon: Search },
    { name: 'Jonanda Influencer', status: 'Coming Soon' as const, desc: 'Enterprise creator collaboration platform', domain: 'Coming Soon', icon: Users },
    { name: 'Jonanda Security Toolkit', status: 'R&D' as const, desc: 'Defensive security assessment toolkit', domain: 'Coming Soon', icon: ShieldAlert },
  ];

  const faqs = [
    {
      q: 'What is JONANDA MAIL?',
      a: 'JONANDA MAIL is the centralized multi-tenant email, webmail, and broadcast communication platform engineered for JONANDA LLC and all portfolio ventures.'
    },
    {
      q: 'How does JONANDA MAIL handle multi-project email identities?',
      a: 'The platform provides a brand/project layer allowing administrators to switch seamlessly between JONANDA LLC (jonanda.com), LOZULA Cybersecurity (lozula.com), EqualShare Foundation (equalshare.org), and future project domains while enforcing strict tenant isolation.'
    },
    {
      q: 'How is email deliverability and anti-spam compliance guaranteed?',
      a: 'JONANDA MAIL requires cryptographic DNS alignment (SPF, 2048-bit DKIM, DMARC p=reject, and MX relays). Broadcasts automatically embed mandatory 1-click unsubscribe headers and cross-reference suppression lists to prevent unsolicited deliveries.'
    },
    {
      q: 'How does JONANDA MAIL connect to real email infrastructure?',
      a: 'The architecture uses a clean provider abstraction layer (EmailProvider, DnsVerifier) supporting direct SMTP/IMAP servers, AWS SES, Postmark, and Cloudflare Email Routing without modifying core application logic.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-brand-500/30 selection:text-brand-200">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 bg-[#070b14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 p-0.5 shadow-lg shadow-brand-500/20">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Mail className="w-5 h-5 text-brand-400" />
              </div>
            </div>
            <div>
              <div className="font-bold text-sm tracking-wider text-white flex items-center gap-1">
                <span>JONANDA</span>
                <span className="text-brand-400">MAIL</span>
              </div>
              <p className="text-[9px] text-slate-400 tracking-wide">mail.jonanda.com</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem Projects</a>
            <a href="#security" className="hover:text-white transition-colors">Security & DNS</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link to="/docs" className="hover:text-cyan-400 transition-colors font-mono">docs</Link>
            <Link to="/status" className="hover:text-emerald-400 transition-colors font-mono">status</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Open Platform
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6 text-center max-w-5xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Centralized Email & Communication Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          One Communication Platform for the <span className="bg-gradient-to-r from-brand-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">JONANDA Ecosystem</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Unifying multi-tenant business email, threaded webmail, verified domain DNS orchestration (SPF, DKIM, DMARC, MX), and broadcast campaign deliverability under a single sovereign control plane.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link to="/dashboard">
            <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Launch Webmail & Control Plane
            </Button>
          </Link>
          <Link to="/download">
            <Button variant="primary" size="lg" leftIcon={<Download className="w-4 h-4" />}>
              Download Desktop Setup
            </Button>
          </Link>
          <Link to="/docs">
            <Button variant="secondary" size="lg" leftIcon={<Terminal className="w-4 h-4" />}>
              REST API Docs
            </Button>
          </Link>
        </div>

        {/* Architecture Pill */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            2048-bit DKIM Cryptography
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            DMARC p=reject Policy Alignment
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Cloudflare Compatible
          </span>
        </div>
      </section>

      {/* Ecosystem Projects Grid */}
      <section id="ecosystem" className="py-16 px-6 max-w-7xl mx-auto space-y-10 border-t border-slate-800/80">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Supported Ecosystem Projects & Brands
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Accurate lifecycle tracking with dedicated domain validation and isolated mailboxes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecosystemVentures.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <Card key={idx} className="p-5 space-y-3 hover:border-slate-700">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ProjectStatusBadge status={proj.status} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{proj.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{proj.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                  {proj.domain}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Platform Features Section */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Comprehensive Communication Architecture
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Everything required to run mission-critical enterprise communications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Inbox className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Threaded Webmail Client</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full-featured webmail with conversation threading, star flagging, custom folders, rich HTML composer, attachments, and draft autosaving.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Automated DNS & Deliverability</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect and verify SPF, DKIM, DMARC, and MX records via DNS-over-HTTPS (DoH) with clear verification states and misconfiguration alerts.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Send className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Campaigns & Audience CRM</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Segment subscribers, schedule broadcasts, dispatch with verified sender identities, and analyze real-time open, click, and bounce rates.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-6 max-w-4xl mx-auto space-y-8 border-t border-slate-800/80">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400">
            Technical and architectural questions about JONANDA MAIL.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="p-4 cursor-pointer" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <div className="flex items-center justify-between text-sm font-semibold text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </div>
              {openFaq === idx && (
                <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#040810] py-12 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">JONANDA MAIL</span>
            <span>•</span>
            <span>A JONANDA LLC Technology Venture</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/legal" className="hover:text-slate-300">Privacy & Terms</Link>
            <Link to="/legal" className="hover:text-slate-300">Anti-Spam Policy</Link>
            <Link to="/docs" className="hover:text-slate-300 font-mono">docs.mail.jonanda.com</Link>
            <Link to="/status" className="hover:text-slate-300 font-mono">status.mail.jonanda.com</Link>
            <a href="https://jonanda.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 flex items-center gap-1">
              <span>jonanda.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

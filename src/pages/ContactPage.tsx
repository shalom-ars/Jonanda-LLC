import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { Mail, Building2, Send, CheckCircle2, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Business Inquiries',
    subject: '',
    message: '',
    botField: '' // Honeypot field for anti-spam
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam honeypot verification
    if (formData.botField) {
      // Quietly succeed if bot filled the hidden honeypot
      setFormStatus('success');
      return;
    }

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please complete all required fields (Name, Email, and Message).');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      setErrorMessage('Please provide a valid work or corporate email address.');
      return;
    }

    setFormStatus('submitting');

    // Simulate clean, deterministic submission feedback
    setTimeout(() => {
      setFormStatus('success');
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      inquiryType: 'Business Inquiries',
      subject: '',
      message: '',
      botField: ''
    });
    setFormStatus('idle');
    setErrorMessage('');
  };

  return (
    <>
      <SEOHead
        title="Contact JONANDA LLC | Corporate & Strategic Inquiries"
        description="Contact JONANDA LLC for corporate inquiries, business partnerships, technology collaboration, and general communications."
        canonicalPath="/contact"
        keywords="Contact JONANDA LLC, JONANDA corporate contact, JONANDA business inquiries, JONANDA technology partnerships"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Page Hero Header */}
        <SectionHeading
          badge="Direct Communications"
          title="Connect with"
          highlightedText="JONANDA LLC"
          description="Initiate business inquiries, technology partnerships, or corporate communications with our executive and engineering teams."
          titleAs="h1"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Corporate Channels */}
          <div className="lg:col-span-5 space-y-6">
            <CorporateCard glow className="space-y-6 border-gold-500/20">
              <div className="space-y-2 border-b border-white/[0.08] pb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-gold-500/10 text-gold-400 text-xs font-semibold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Corporate Headquarters</span>
                </div>
                <h3 className="text-xl font-bold text-white">JONANDA LLC</h3>
                <p className="text-xs text-gray-400">
                  United States Corporate Entity
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-white/[0.04]">
                  <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Corporate Email</span>
                    <a
                      href="mailto:contact@jonanda.com"
                      className="font-mono text-gold-400 hover:text-gold-300 font-semibold transition-colors"
                    >
                      contact@jonanda.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-white/[0.04]">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Jonanda Coin Project</span>
                    <a
                      href="https://jonanda.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-gray-200 hover:text-gold-300 transition-colors"
                    >
                      jonanda.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-white/[0.04]">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">LOZULA Cybersecurity</span>
                    <a
                      href="https://lozula.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-gray-200 hover:text-emerald-300 transition-colors"
                    >
                      lozula.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] text-xs text-gray-400 leading-relaxed">
                We review corporate, partnership, and security inquiries during business operating hours. For security vulnerability disclosures, specify "Security & Compliance" in the inquiry category.
              </div>
            </CorporateCard>
          </div>

          {/* Right Column: Clean Interactive Contact Form UI */}
          <div className="lg:col-span-7">
            <CorporateCard className="p-8 sm:p-10 border-white/[0.08]">
              {formStatus === 'success' ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      Inquiry Received
                    </h3>
                    <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting JONANDA LLC. Your communication has been routed to the appropriate department. Our team will review your inquiry promptly.
                    </p>
                  </div>
                  <Button onClick={handleReset} variant="outline" size="sm">
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Corporate Inquiry Form
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Fill out the details below to route your message to our corporate office.
                    </p>
                  </div>

                  {formStatus === 'error' && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot field for anti-spam (hidden from users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="botField"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.botField}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Full Name <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-background/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Work / Corporate Email <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-background/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Organization Name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-background/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Inquiry Category <span className="text-gold-400">*</span>
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-surface border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                      >
                        <option value="Business Inquiries">Business Inquiries</option>
                        <option value="Technology Partnerships">Technology Partnerships</option>
                        <option value="Corporate Inquiries">Corporate Inquiries</option>
                        <option value="Security & Compliance">Security & Compliance</option>
                        <option value="General Contact">General Contact</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Brief overview of your inquiry"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-background/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all placeholder:text-gray-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Message <span className="text-gold-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide context regarding your inquiry, project scope, or partnership proposal..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-background/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all placeholder:text-gray-600 resize-y"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full shadow-gold-sm"
                    disabled={formStatus === 'submitting'}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {formStatus === 'submitting' ? 'Transmitting Inquiry...' : 'Submit Inquiry'}
                  </Button>
                </form>
              )}
            </CorporateCard>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import { Send, CheckCircle2, Globe, MessageSquare } from 'lucide-react';
import { useMail } from '../../context/MailContext';

export const ContactSection: React.FC = () => {
  const { receiveInboundMessage } = useMail();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    category: 'Software Development',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Deliver into internal mail inbox and contact ledger
    receiveInboundMessage({
      fromName: formData.name,
      fromEmail: formData.email,
      to: 'contact@jonanda.com',
      subject: `Project Inquiry: ${formData.category} [${formData.organization || 'General'}]`,
      body: `Company/Org: ${formData.organization || 'Individual / Startup'}\nFocus: ${formData.category}\n\nRequirements:\n${formData.message}`,
      tags: ['Project Inquiry', formData.category],
      sourceForm: 'Homepage Contact'
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/20 text-xs font-semibold text-amber-800 dark:text-gold-300">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">
            Let&apos;s Build Something
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Tell us what you want to build and we&apos;ll help define the next step.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#10101c] border border-gray-200 dark:border-white/[0.08] shadow-xl relative overflow-hidden">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Message Received
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Thank you for reaching out to JONANDA LLC. Our engineering and project teams will review your inquiry and get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    organization: '',
                    category: 'Software Development',
                    message: ''
                  });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#141424] border border-gray-300 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#141424] border border-gray-300 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Nexus Systems"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#141424] border border-gray-300 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                    Project Focus
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#141424] border border-gray-300 dark:border-white/10 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Web3 & Blockchain">Web3 & Blockchain</option>
                    <option value="Digital Products">Digital Products</option>
                    <option value="Custom Project">Custom Project</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                  Project Details / Requirements *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, timeline, and requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#141424] border border-gray-300 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-gold-400" />
                  <span>Direct inquiries: <span className="font-mono text-gray-700 dark:text-gray-300">contact@jonanda.com</span></span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

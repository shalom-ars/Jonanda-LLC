import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Hero } from '../components/home/Hero';
import { EcosystemPreview } from '../components/home/EcosystemPreview';
import { TechPillarsPreview } from '../components/home/TechPillarsPreview';
import { PartnershipPreview } from '../components/home/PartnershipPreview';
import { CorporateSnapshot } from '../components/home/CorporateSnapshot';
import { CoreValues } from '../components/home/CoreValues';
import { Button } from '../components/common/Button';
import { ArrowRight, Mail, Handshake } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="JONANDA LLC | Building Technology for the Next Digital Economy"
        description="JONANDA LLC is a technology enterprise developing products and services across AI, Web3, cybersecurity, software engineering, and digital infrastructure."
        canonicalPath="/"
      />

      <div className="relative">
        <Hero />
        <EcosystemPreview />
        <TechPillarsPreview />
        <PartnershipPreview />
        <CorporateSnapshot />
        <CoreValues />

        {/* Corporate CTA Inquiries Banner */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto rounded-3xl bg-white dark:bg-[#12121c] border border-amber-500/30 dark:border-gold-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-xl dark:shadow-gold-md">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/10 dark:bg-gold-500/15 blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/20 text-xs font-semibold text-amber-800 dark:text-gold-300">
                <Mail className="w-3.5 h-3.5" />
                <span>Enterprise & Strategic Inquiries</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                Partner with JONANDA LLC
              </h2>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Explore technology partnerships, custom project development, and ecosystem integrations with our engineering teams.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href="/partners"
                  variant="primary"
                  size="lg"
                  icon={<Handshake className="w-4 h-4" />}
                >
                  Explore Partnerships
                </Button>

                <Button
                  href="/project-development"
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

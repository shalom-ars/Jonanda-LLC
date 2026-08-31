import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { EcosystemCard } from '../components/ecosystem/EcosystemCard';
import { ProjectInquiryForm } from '../components/project-development/ProjectInquiryForm';
import { FAQAccordion } from '../components/project-development/FAQAccordion';
import {
  WHAT_WE_BUILD_SERVICES,
  DEVELOPMENT_PROCESS_STEPS,
  TECHNOLOGY_CATEGORIES,
  PROJECT_TYPES_LIST,
  WHY_BUILD_WITH_JONANDA,
  PROJECT_DEVELOPMENT_FAQS
} from '../data/projectDevelopmentData';
import { ECOSYSTEM_PRODUCTS } from '../data/ecosystemData';
import {
  Globe,
  Smartphone,
  Bot,
  Briefcase,
  Shield,
  Coins,
  Search,
  Mail,
  BarChart3,
  ShoppingCart,
  Network,
  Cloud,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Bot,
  Briefcase,
  Shield,
  Coins,
  Search,
  Mail,
  BarChart3,
  ShoppingCart,
  Network,
  Cloud
};

export const ProjectDevelopmentPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Project Development | Custom Software, AI & Web3 Engineering | JONANDA LLC"
        description="JONANDA LLC designs and develops custom websites, applications, SaaS platforms, AI systems, cybersecurity solutions, Web3 products, business tools, and digital infrastructure for businesses, startups, organizations, and entrepreneurs."
        canonicalPath="/project-development"
        keywords="JONANDA LLC project development, custom software development, AI product development, Web3 engineering, SaaS platform development, cybersecurity solutions, corporate web development, digital infrastructure"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-28 relative z-10">
        {/* ========================================================= */}
        {/* HERO SECTION                                              */}
        {/* ========================================================= */}
        <section className="text-center space-y-8 max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/30 dark:border-gold-500/30 text-xs font-semibold text-amber-800 dark:text-gold-300 shadow-sm dark:shadow-gold-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-gold-400" />
            <span className="tracking-widest uppercase">PROJECT DEVELOPMENT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            We Build Digital Products That Turn{' '}
            <span className="text-gradient-gold">
              Ideas Into Reality.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <strong>JONANDA LLC</strong> designs and develops custom websites, applications, SaaS platforms, AI systems, cybersecurity solutions, Web3 products, business tools, and digital infrastructure for businesses, startups, organizations, and entrepreneurs.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="#project-inquiry"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-gold-md"
            >
              Start a Project
            </Button>

            <Button
              href="/technology"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Our Technology
            </Button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 1: WHAT WE BUILD (12 SERVICES)                    */}
        {/* ========================================================= */}
        <section id="services" className="space-y-12">
          <SectionHeading
            badge="Engineering Capabilities"
            title="What We"
            highlightedText="Build"
            description="From focused business applications to complete technology platforms, we develop solutions around real-world requirements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHAT_WE_BUILD_SERVICES.map((service) => {
              const IconComp = iconMap[service.icon] || Globe;

              return (
                <CorporateCard
                  key={service.id}
                  className="p-8 flex flex-col justify-between h-full border-gray-200 dark:border-white/[0.08] hover:border-amber-500/30 dark:hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/30 dark:border-gold-500/30 text-amber-600 dark:text-gold-400 flex items-center justify-center shadow-sm">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400">
                        {service.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-200/60 dark:border-white/[0.06]">
                      <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                        Included Deliverables
                      </span>
                      <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-gold-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-200/60 dark:border-white/[0.06]">
                    <a
                      href="#project-inquiry"
                      className="text-xs font-semibold text-amber-700 dark:text-gold-300 hover:text-amber-800 dark:hover:text-gold-200 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </CorporateCard>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: OUR DEVELOPMENT PROCESS (7 STEPS)              */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <SectionHeading
            badge="Methodology & Delivery"
            title="From Idea to"
            highlightedText="Production"
            description="Our structured 7-stage engineering lifecycle ensures transparency, predictable milestones, and production durability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DEVELOPMENT_PROCESS_STEPS.map((step) => (
              <CorporateCard
                key={step.stepNumber}
                className="p-6 flex flex-col justify-between h-full border-gray-200 dark:border-white/[0.08] hover:border-amber-500/30 dark:hover:border-gold-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold font-mono text-amber-600/80 dark:text-gold-400/80">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08]">
                      Step {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/60 dark:border-white/[0.06] space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                    Key Outputs:
                  </span>
                  {step.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="text-[11px] text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-500 dark:bg-gold-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CorporateCard>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: TECHNOLOGY WE WORK WITH                        */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <SectionHeading
            badge="Technical Competencies"
            title="Technology We"
            highlightedText="Work With"
            description="We select battle-tested, high-performance technologies that are supported by our core in-house engineering expertise."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TECHNOLOGY_CATEGORIES.map((cat, idx) => (
              <CorporateCard key={idx} className="p-7 space-y-5 border-gray-200 dark:border-white/[0.08]">
                <div className="space-y-1 border-b border-gray-200/60 dark:border-white/[0.06] pb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] text-xs font-mono text-gray-800 dark:text-gray-200 hover:border-amber-500/40 dark:hover:border-gold-500/40 hover:text-amber-700 dark:hover:text-gold-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CorporateCard>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: PROJECTS WE CAN DEVELOP (16 CARDS)             */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <SectionHeading
            badge="Project Typologies"
            title="Projects We Can"
            highlightedText="Develop"
            description="From initial prototypes and MVPs to complex enterprise portals, our team structures projects to meet specialized technical demands."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECT_TYPES_LIST.map((prj, pIdx) => (
              <CorporateCard
                key={pIdx}
                className="p-6 flex flex-col justify-between h-full border-gray-200 dark:border-white/[0.08] hover:border-amber-500/30 dark:hover:border-gold-500/30 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 dark:bg-gold-500/10 text-amber-800 dark:text-gold-300 border border-amber-500/20 dark:border-gold-500/20">
                      {prj.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {prj.title}
                  </h3>

                  <p className="text-xs text-amber-700 dark:text-gold-300 font-medium">
                    {prj.subtitle}
                  </p>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {prj.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/60 dark:border-white/[0.06]">
                  <a
                    href="#project-inquiry"
                    className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </CorporateCard>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: WE BUILD OUR OWN PRODUCTS TOO (ECOSYSTEM)       */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <SectionHeading
            badge="Ecosystem Proof of Execution"
            title="We Build Our Own"
            highlightedText="Products Too"
            description="JONANDA LLC develops proprietary products and platforms alongside custom technology projects, ensuring institutional-grade standards across every build."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ECOSYSTEM_PRODUCTS.map((prod) => (
              <EcosystemCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: WHY BUILD WITH JONANDA                         */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <SectionHeading
            badge="The JONANDA Advantage"
            title="Why Build With"
            highlightedText="JONANDA LLC"
            description="We combine product strategy, zero-trust security, and scalable system engineering to build durable software assets."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_BUILD_WITH_JONANDA.map((item, idx) => (
              <CorporateCard key={idx} className="p-8 space-y-4 border-gray-200 dark:border-white/[0.08] hover:border-amber-500/30 dark:hover:border-gold-500/30 transition-all duration-300">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-gold-400 block font-mono">
                  {item.highlight}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </CorporateCard>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: RESPONSIBLE TECHNOLOGY DEVELOPMENT             */}
        {/* ========================================================= */}
        <section className="rounded-3xl bg-white dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.08] p-8 sm:p-12 space-y-6 relative overflow-hidden backdrop-blur-md shadow-sm">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Responsible Engineering Standard</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Responsible Technology Development
            </h2>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong>JONANDA LLC</strong> aims to build secure, reliable, accessible, and responsible technology. Projects involving cybersecurity, AI, blockchain, data processing, or automation are developed with appropriate security, privacy, and architectural considerations.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: FAQ ACCORDION                                  */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <SectionHeading
            badge="Common Inquiries"
            title="Frequently Asked"
            highlightedText="Questions"
            description="Key information regarding our development engagement models, project scopes, and engineering timelines."
          />

          <FAQAccordion items={PROJECT_DEVELOPMENT_FAQS} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: CUSTOM PROJECT INQUIRY FORM                    */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/30 dark:border-gold-500/30 text-xs font-semibold text-amber-800 dark:text-gold-300 shadow-sm dark:shadow-gold-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Engagement</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Have a Project in Mind?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Tell us what you want to build. Our team can help turn the concept into a structured product plan and development roadmap.
            </p>
          </div>

          <ProjectInquiryForm />
        </section>
      </div>
    </>
  );
};

import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Hero } from '../components/home/Hero';
import { WhatWeDoSection } from '../components/home/WhatWeDoSection';
import { ProjectDevelopmentSection } from '../components/home/ProjectDevelopmentSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { TechnologySection } from '../components/home/TechnologySection';
import { AboutSection } from '../components/home/AboutSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="JONANDA LLC | Technology & Project Development"
        description="JONANDA LLC builds digital products, software, AI solutions, cybersecurity technology, Web3 systems, automation and custom technology projects."
        canonicalPath="/"
      />

      <div className="relative">
        <Hero />
        <WhatWeDoSection />
        <ProjectDevelopmentSection />
        <ProcessSection />
        <TechnologySection />
        <AboutSection />
        <ContactSection />
      </div>
    </>
  );
};

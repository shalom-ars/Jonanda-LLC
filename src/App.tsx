import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FlowProvider } from './context/FlowContext';
import { MailProvider } from './context/MailContext';
import { PartnersInfluencersProvider } from './context/PartnersInfluencersContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { TechBackground } from './components/common/TechBackground';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Core Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EcosystemPage } from './pages/EcosystemPage';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { ProjectDevelopmentPage } from './pages/ProjectDevelopmentPage';
import { PartnersPage } from './pages/PartnersPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { CompanyPage } from './pages/CompanyPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Flow Suite Pages
import { FlowDashboardPage } from './pages/flow/FlowDashboardPage';
import { WorkflowsListPage } from './pages/flow/WorkflowsListPage';
import { FlowBuilderPage } from './pages/flow/FlowBuilderPage';
import { FlowTemplatesPage } from './pages/flow/FlowTemplatesPage';
import { FlowLogsPage } from './pages/flow/FlowLogsPage';

// Mail Suite Pages
import { MailHubPage } from './pages/mail/MailHubPage';
import { MailInboxPage } from './pages/mail/MailInboxPage';
import { MailContactsPage } from './pages/mail/MailContactsPage';
import { MailCampaignsPage } from './pages/mail/MailCampaignsPage';
import { MailTemplatesPage } from './pages/mail/MailTemplatesPage';

// Partners Hub Pages
import { PartnerApplicationsPage } from './pages/partners/PartnerApplicationsPage';
import { PartnerDirectoryPage } from './pages/partners/PartnerDirectoryPage';

// Influencers Hub Pages
import { InfluencerApplicationsPage } from './pages/influencers/InfluencerApplicationsPage';
import { InfluencerDirectoryPage } from './pages/influencers/InfluencerDirectoryPage';
import { InfluencerCampaignsPage } from './pages/influencers/InfluencerCampaignsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <FlowProvider>
        <MailProvider>
          <PartnersInfluencersProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col bg-background text-gray-900 dark:text-gray-100 relative transition-colors duration-300">
                <ScrollToTop />
                <TechBackground />
                <Navbar />

                <main className="flex-grow">
                  <Routes>
                    {/* Core Corporate Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/ecosystem" element={<EcosystemPage />} />
                    <Route path="/coming-soon" element={<ComingSoonPage />} />
                    <Route path="/project-development" element={<ProjectDevelopmentPage />} />
                    <Route path="/technology" element={<TechnologyPage />} />
                    <Route path="/company" element={<CompanyPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* JONANDA FLOW Automation Suite */}
                    <Route path="/flow" element={<FlowDashboardPage />} />
                    <Route path="/flow/workflows" element={<WorkflowsListPage />} />
                    <Route path="/flow/new" element={<FlowBuilderPage />} />
                    <Route path="/flow/builder/:id" element={<FlowBuilderPage />} />
                    <Route path="/flow/templates" element={<FlowTemplatesPage />} />
                    <Route path="/flow/executions" element={<FlowLogsPage />} />
                    <Route path="/flow/logs" element={<FlowLogsPage />} />

                    {/* JONANDA MAIL Suite */}
                    <Route path="/mail" element={<MailHubPage />} />
                    <Route path="/mail/inbox" element={<MailInboxPage />} />
                    <Route path="/mail/contacts" element={<MailContactsPage />} />
                    <Route path="/mail/campaigns" element={<MailCampaignsPage />} />
                    <Route path="/mail/templates" element={<MailTemplatesPage />} />

                    {/* Partners Hub */}
                    <Route path="/partners" element={<PartnersPage />} />
                    <Route path="/partners/applications" element={<PartnerApplicationsPage />} />
                    <Route path="/partners/directory" element={<PartnerDirectoryPage />} />
                    <Route path="/partners/automations" element={<Navigate to="/flow/workflows" replace />} />

                    {/* Influencers & Creators Hub */}
                    <Route path="/influencers" element={<InfluencerDirectoryPage />} />
                    <Route path="/influencers/applications" element={<InfluencerApplicationsPage />} />
                    <Route path="/influencers/directory" element={<InfluencerDirectoryPage />} />
                    <Route path="/influencers/campaigns" element={<InfluencerCampaignsPage />} />
                    <Route path="/influencers/automations" element={<Navigate to="/flow/workflows" replace />} />

                    {/* Legal Policies */}
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsConditionsPage />} />
                    <Route path="/cookies" element={<CookiePolicyPage />} />

                    {/* 404 Catch-All */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>

                <Footer />
              </div>
            </BrowserRouter>
          </PartnersInfluencersProvider>
        </MailProvider>
      </FlowProvider>
    </ThemeProvider>
  );
};

export default App;

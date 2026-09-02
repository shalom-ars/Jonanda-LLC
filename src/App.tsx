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
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-gray-900 dark:text-gray-100 relative transition-colors duration-300">
      <ScrollToTop />
      <TechBackground />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Main Single Corporate Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Legal Compliance Pages */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />

          {/* Legacy & Internal Route Graceful Redirects */}
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/project-development" element={<Navigate to="/#project-development" replace />} />
          <Route path="/technology" element={<Navigate to="/#technology" replace />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/company" element={<Navigate to="/#about" replace />} />
          <Route path="/ecosystem" element={<Navigate to="/" replace />} />
          <Route path="/coming-soon" element={<Navigate to="/" replace />} />
          <Route path="/services" element={<Navigate to="/#what-we-do" replace />} />
          <Route path="/partners/*" element={<Navigate to="/" replace />} />
          <Route path="/influencers/*" element={<Navigate to="/" replace />} />
          <Route path="/flow/*" element={<Navigate to="/" replace />} />
          <Route path="/mail/*" element={<Navigate to="/" replace />} />
          <Route path="/admin/*" element={<Navigate to="/" replace />} />

          {/* 404 Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <FlowProvider>
        <MailProvider>
          <PartnersInfluencersProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </PartnersInfluencersProvider>
        </MailProvider>
      </FlowProvider>
    </ThemeProvider>
  );
};

export default App;

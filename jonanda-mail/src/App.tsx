import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { MailProvider } from './context/MailContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { MailPage } from './pages/mail/MailPage';
import { CampaignsPage } from './pages/campaigns/CampaignsPage';
import { TemplatesPage } from './pages/templates/TemplatesPage';
import { AutomationsPage } from './pages/automations/AutomationsPage';
import { ContactsPage } from './pages/contacts/ContactsPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { DomainsPage } from './pages/domains/DomainsPage';
import { MailboxesPage } from './pages/mailboxes/MailboxesPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { AdminPage } from './pages/admin/AdminPage';
import { DocsPage } from './pages/docs/DocsPage';
import { StatusPage } from './pages/status/StatusPage';
import { LegalPage } from './pages/legal/LegalPage';
import { DownloadPage } from './pages/download/DownloadPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Admin Guard
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (user?.role !== 'Super Admin' && user?.role !== 'Organization Admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <MailProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/status" element={<StatusPage />} />

              {/* Protected Platform Dashboard Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/mail" element={<MailPage />} />
                <Route path="/mail/:folder" element={<MailPage />} />
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/automations" element={<AutomationsPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/domains" element={<DomainsPage />} />
                <Route path="/mailboxes" element={<MailboxesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                
                {/* Super Admin Section */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  }
                />
              </Route>

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </MailProvider>
      </ProjectProvider>
    </AuthProvider>
  );
};

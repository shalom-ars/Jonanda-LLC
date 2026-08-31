import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Organization, Role } from '../types';
import { StorageService } from '../services/storageService';

interface AuthContextType {
  user: User | null;
  organization: Organization;
  isAuthenticated: boolean;
  login: (email: string, pass: string, twoFactorCode?: string) => Promise<{ success: boolean; requires2FA?: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string, orgName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  verify2FA: (code: string) => Promise<boolean>;
  switchRole: (role: Role) => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPass: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => StorageService.getUser());
  const [organization, setOrganization] = useState<Organization>(() => StorageService.getOrganization());

  useEffect(() => {
    const storedUser = StorageService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, _pass: string, twoFactorCode?: string) => {
    // Simulated credential check
    if (email.toLowerCase().includes('fail')) {
      return { success: false, error: 'Invalid email or password' };
    }

    if (user?.is2faEnabled && !twoFactorCode) {
      return { success: true, requires2FA: true };
    }

    if (user?.is2faEnabled && twoFactorCode && twoFactorCode !== '123456' && twoFactorCode.length !== 6) {
      return { success: false, error: 'Invalid 2FA verification code' };
    }

    const updatedUser: User = {
      id: user?.id || `usr_${Date.now()}`,
      orgId: organization.id,
      email,
      name: user?.name || (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
      role: user?.role || 'Super Admin',
      status: 'active',
      is2faEnabled: true,
      createdAt: user?.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    StorageService.setUser(updatedUser);
    StorageService.setAuthToken(`jwt_${Date.now()}_sig`);
    StorageService.logAction('USER_LOGIN_SUCCESS', 'AUTH', updatedUser.id, `User ${email} signed in successfully`);
    setUser(updatedUser);

    return { success: true, requires2FA: false };
  };

  const signup = async (name: string, email: string, _pass: string, orgName: string) => {
    const newOrg: Organization = {
      id: `org_${Date.now()}`,
      name: orgName || 'New Enterprise Org',
      slug: (orgName || 'new-org').toLowerCase().replace(/\s+/g, '-'),
      plan: 'Business',
      status: 'active',
      createdAt: new Date().toISOString(),
      allowedDomains: 10,
      allowedMailboxes: 25,
      allowedCampaigns: 100
    };

    const newUser: User = {
      id: `usr_${Date.now()}`,
      orgId: newOrg.id,
      email,
      name,
      role: 'Organization Admin',
      status: 'active',
      is2faEnabled: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    StorageService.setUser(newUser);
    StorageService.setAuthToken(`jwt_${Date.now()}_sig`);
    StorageService.logAction('USER_SIGNUP', 'AUTH', newUser.id, `New organization ${orgName} and admin ${email} registered`);

    setUser(newUser);
    setOrganization(newOrg);
    return { success: true };
  };

  const logout = () => {
    if (user) {
      StorageService.logAction('USER_LOGOUT', 'AUTH', user.id, `User ${user.email} signed out`);
    }
    StorageService.setUser(null);
    StorageService.setAuthToken(null);
    setUser(null);
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    if (code === '123456' || code.length === 6) {
      if (user) {
        StorageService.logAction('2FA_VERIFIED', 'AUTH', user.id, '2FA challenge passed');
      }
      return true;
    }
    return false;
  };

  const switchRole = (role: Role) => {
    if (user) {
      const updated = { ...user, role };
      StorageService.setUser(updated);
      setUser(updated);
      StorageService.logAction('ROLE_SWITCHED', 'AUTH', user.id, `Switched view role to ${role}`);
    }
  };

  const forgotPassword = async (email: string) => {
    StorageService.logAction('PASSWORD_RESET_REQUESTED', 'AUTH', 'sys', `Password reset link dispatched to ${email}`);
    return true;
  };

  const resetPassword = async (_token: string, _newPass: string) => {
    StorageService.logAction('PASSWORD_RESET_COMPLETED', 'AUTH', 'sys', 'Password successfully updated');
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        organization,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        verify2FA,
        switchRole,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

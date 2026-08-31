import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Mail, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-brand-400">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-300">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested email route, domain, or mailbox does not exist in this JONANDA MAIL workspace.
        </p>
        <Link to="/dashboard">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

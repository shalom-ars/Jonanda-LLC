import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="404 Page Not Found | JONANDA LLC"
        description="The requested page could not be found on JONANDA LLC corporate website."
      />

      <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mx-auto font-mono text-2xl font-bold shadow-gold-sm">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
            <p className="text-sm text-gray-400">
              The corporate resource or page you are looking for does not exist or has been relocated within the JONANDA ecosystem.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
            <Button href="/contact" variant="secondary" size="md">
              Contact Corporate Support
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

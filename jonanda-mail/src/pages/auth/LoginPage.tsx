import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@jonanda.com');
  const [password, setPassword] = useState('password123');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await login(email, password, requires2FA ? twoFactorCode : undefined);
    setIsLoading(false);

    if (res.requires2FA) {
      setRequires2FA(true);
      return;
    }

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickDemoFill = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('password123');
    setTwoFactorCode('123456');
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#050811] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 p-0.5 shadow-lg shadow-brand-500/20">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Mail className="w-5 h-5 text-brand-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              JONANDA <span className="text-brand-400">MAIL</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400">
            Sign in to your centralized ecosystem communication platform
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 space-y-6 border-slate-800 bg-[#090e1a]/90 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!requires2FA ? (
              <>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="admin@jonanda.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-[11px] text-brand-400 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>2FA Active. Enter your 6-digit TOTP code (or demo default: 123456).</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    2FA Verification Code
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      value={twoFactorCode}
                      onChange={e => setTwoFactorCode(e.target.value)}
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm font-mono tracking-widest text-center text-white focus:outline-none focus:border-brand-500"
                      required
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full shadow-lg shadow-brand-600/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {requires2FA ? 'Verify 2FA & Enter Platform' : 'Sign In to JONANDA MAIL'}
            </Button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block text-center">
              Quick Role Evaluation Logins
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('admin@jonanda.com')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-left truncate"
              >
                <div className="font-bold text-amber-400">Super Admin</div>
                <div className="text-[10px] text-slate-500 truncate">admin@jonanda.com</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('support@lozula.com')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-left truncate"
              >
                <div className="font-bold text-emerald-400">LOZULA Admin</div>
                <div className="text-[10px] text-slate-500 truncate">support@lozula.com</div>
              </button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          <span>Need an enterprise account? </span>
          <Link to="/signup" className="text-brand-400 hover:underline font-medium">
            Register Organization
          </Link>
        </div>
      </div>
    </div>
  );
};

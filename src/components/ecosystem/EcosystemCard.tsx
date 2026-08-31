import React from 'react';
import { ExternalLink, ArrowRight, Sparkles, Shield, Bot, Search, Users, ShieldAlert, Cpu, Layers, Mail, HeartHandshake, CheckCircle2, Clock } from 'lucide-react';
import { EcosystemProduct } from '../../data/ecosystemData';
import { CorporateCard } from '../common/CorporateCard';
import { Button } from '../common/Button';

interface EcosystemCardProps {
  product: EcosystemProduct;
  featured?: boolean;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Shield,
  Bot,
  Search,
  Users,
  ShieldAlert,
  Cpu,
  Layers,
  Mail,
  HeartHandshake
};

export const EcosystemCard: React.FC<EcosystemCardProps> = ({
  product,
  className = ''
}) => {
  const isComingSoon = product.status === 'Coming Soon';
  const isCurrent = product.tier === 'current';
  const IconComponent = product.iconName ? iconMap[product.iconName] || Cpu : Cpu;

  return (
    <CorporateCard
      className={`flex flex-col justify-between h-full border-white/[0.08] transition-all duration-300 ${
        isComingSoon ? 'hover:border-purple-500/30' : 'hover:border-gold-500/30'
      } ${className}`}
    >
      <div className="space-y-5">
        {/* Top Meta Row: Category & Status Badge */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.04] pb-3">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-gray-400 truncate">
            {product.category}
          </span>

          {/* Status Badge (Never truncates) */}
          <div className="shrink-0">
            {product.status === 'Live & Operational' && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live & Operational
              </span>
            )}
            {product.status === 'Active Platform' && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Active Platform
              </span>
            )}
            {product.status === 'Coming Soon' && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-purple-500/15 text-purple-200 border border-purple-500/30 shadow-sm whitespace-nowrap">
                <Clock className="w-3 h-3 text-purple-300 shrink-0" />
                <span>COMING SOON</span>
              </span>
            )}
            {product.status === 'Ecosystem Initiative' && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-gold-500/15 text-gold-300 border border-gold-500/30 whitespace-nowrap">
                <HeartHandshake className="w-3 h-3 text-gold-400" />
                <span>Ecosystem Initiative</span>
              </span>
            )}
            {product.status === 'Incubation & Research' && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-blue-500/15 text-blue-300 border border-blue-500/30 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Incubation & Research
              </span>
            )}
          </div>
        </div>

        {/* Project Branding & Title Row */}
        <div className="flex items-center gap-3">
          {product.logoUrl ? (
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center p-2 shrink-0 ${
                product.id === 'jonanda-coin'
                  ? 'bg-gold-500/10 border border-gold-500/30 shadow-gold-sm'
                  : 'bg-emerald-500/10 border border-emerald-500/30'
              }`}
            >
              <img
                src={product.logoUrl}
                alt={`${product.name} Logo`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                isComingSoon
                  ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300 shadow-sm'
                  : product.status === 'Ecosystem Initiative'
                  ? 'bg-gold-500/10 border border-gold-500/30 text-gold-400'
                  : 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </div>
          )}

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {product.name}
            </h3>
            {product.tagline && (
              <p className="text-[11px] text-gray-400 line-clamp-1">
                {product.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {product.description}
        </p>

        {/* Capabilities List */}
        <div className="space-y-2 pt-2 border-t border-white/[0.06]">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
            Capabilities & Focus
          </span>
          <ul className="space-y-1.5 text-xs text-gray-300">
            {product.capabilities.slice(0, 4).map((cap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                    isComingSoon
                      ? 'text-purple-400'
                      : isCurrent
                      ? 'text-gold-400'
                      : 'text-blue-400'
                  }`}
                />
                <span>{cap}</span>
              </li>
            ))}
            {product.capabilities.length > 4 && (
              <li className="text-[11px] text-gray-400 italic pl-5">
                +{product.capabilities.length - 4} additional modules in development
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Card Action / CTA */}
      <div className="pt-5 mt-5 border-t border-white/[0.06]">
        {isComingSoon ? (
          <div className="w-full py-2 px-3.5 rounded-lg bg-surface/80 border border-purple-500/20 text-purple-200 text-xs font-semibold flex items-center justify-between cursor-default select-none">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Coming Soon</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
              In Development
            </span>
          </div>
        ) : product.ctaLink ? (
          <Button
            href={product.ctaLink}
            isExternal={product.isExternal}
            variant={product.id === 'jonanda-coin' ? 'primary' : 'secondary'}
            size="md"
            className="w-full justify-between"
          >
            <span>{product.ctaText}</span>
            {product.isExternal ? (
              <ExternalLink className="w-4 h-4 opacity-70" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Button>
        ) : (
          <div className="w-full py-2.5 px-4 rounded-lg bg-surface text-gray-400 text-xs font-semibold text-center cursor-default">
            {product.ctaText}
          </div>
        )}
      </div>
    </CorporateCard>
  );
};

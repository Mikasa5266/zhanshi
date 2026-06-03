import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Landmark, Building2 } from 'lucide-react';
import { SlideLayoutProps } from './SlideLayout';

type PartnerCategory = 'military-research' | 'testing-agency' | 'enterprise';

interface Partner {
  id: string;
  cnName: string;
  enName: string;
  category: PartnerCategory;
  logo: string;
  logoConfidence: string;
}

interface PartnersPayload {
  partners: Partner[];
}

const CATEGORY_META: Record<PartnerCategory, {
  label: string;
  eyebrow: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  'military-research': {
    label: '军工科研',
    eyebrow: 'DEFENSE & RESEARCH',
    icon: ShieldCheck,
  },
  'testing-agency': {
    label: '测评机构',
    eyebrow: 'EVALUATION LABS',
    icon: Landmark,
  },
  enterprise: {
    label: '企业用户',
    eyebrow: 'ENTERPRISE',
    icon: Building2,
  },
};

const CATEGORY_ORDER: PartnerCategory[] = ['military-research', 'testing-agency', 'enterprise'];

const CONFIDENCE_PRIORITY: Record<string, number> = {
  official: 0,
  'official-related': 1,
  'official-likely': 2,
  group: 3,
  'text-fallback': 4,
};

function getInitials(partner: Partner) {
  if (partner.enName) {
    return partner.enName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }
  return partner.cnName.slice(0, 2);
}

const LogoTile: React.FC<{
  partner: Partner;
  index: number;
  accentColor: string;
}> = ({ partner, index, accentColor }) => {
  const [imageFailed, setImageFailed] = useState(!partner.logo);
  const isTextFallback = partner.logoConfidence === 'text-fallback';
  const showImage = !imageFailed && !isTextFallback;

  return (
    <motion.div
      className="group relative flex h-[68px] items-center justify-center overflow-hidden rounded-xl border border-stone-200/60 bg-white/70 px-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.02, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      title={partner.cnName}
    >
      {showImage ? (
        <img
          src={partner.logo}
          alt={partner.cnName}
          className="max-h-[30px] w-auto max-w-full object-contain transition-all duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex w-full min-w-0 items-center gap-2">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-black text-white"
            style={{ backgroundColor: accentColor }}
          >
            {getInitials(partner)}
          </span>
          <span className="min-w-0 truncate text-[12px] font-bold text-neutral-700">
            {partner.cnName}
          </span>
        </div>
      )}
    </motion.div>
  );
};

const CategorySection: React.FC<{
  category: PartnerCategory;
  partners: Partner[];
  accentColor: string;
  sectionIndex: number;
}> = ({ category, partners, accentColor, sectionIndex }) => {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + sectionIndex * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Category header with accent line */}
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-[14px] font-black text-neutral-900">{meta.label}</span>
        <span className="font-mono text-[10px] tracking-[0.15em] text-stone-400">{meta.eyebrow}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="font-mono text-[11px] font-bold text-stone-400">{partners.length}</span>
        </div>
      </div>

      {/* Logo grid */}
      <div className="grid grid-cols-3 gap-2 overflow-hidden sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {partners.map((partner, index) => (
          <LogoTile
            key={partner.id}
            partner={partner}
            index={index}
            accentColor={accentColor}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function PartnersLayout({ exhibit }: SlideLayoutProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let ignore = false;
    fetch('/partners/partners.json')
      .then(r => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<PartnersPayload>;
      })
      .then(data => {
        if (ignore) return;
        const sorted = [...(data.partners || [])].sort((a, b) => {
          const cd = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
          if (cd !== 0) return cd;
          return (CONFIDENCE_PRIORITY[a.logoConfidence] ?? 9) - (CONFIDENCE_PRIORITY[b.logoConfidence] ?? 9);
        });
        setPartners(sorted);
        setLoadState('ready');
      })
      .catch(() => { if (!ignore) setLoadState('error'); });
    return () => { ignore = true; };
  }, []);

  const grouped = useMemo(() =>
    CATEGORY_ORDER.map(cat => ({
      category: cat,
      partners: partners.filter(p => p.category === cat),
    })),
    [partners]
  );

  return (
    <section className="relative flex w-full max-w-7xl flex-col items-center gap-6">
      {/* Decorative accent stripes */}
      <div className="pointer-events-none absolute -left-8 top-0 h-full w-px opacity-[0.06]" style={{ backgroundColor: exhibit.accentColor }} />
      <div className="pointer-events-none absolute -right-8 top-0 h-full w-px opacity-[0.06]" style={{ backgroundColor: exhibit.accentColor }} />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.04] blur-[80px]"
        style={{ backgroundColor: exhibit.accentColor }}
      />

      {/* Header */}
      <motion.header
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3 py-1 font-mono text-[10px] tracking-[0.25em] text-stone-500 shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: exhibit.accentColor }} />
          {exhibit.englishTag}
        </div>
        <h2 className="font-display text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
          {exhibit.name}
        </h2>
        <p className="mt-1.5 max-w-lg text-sm font-medium text-stone-500">
          {exhibit.subtitle}
        </p>

        {/* Stats */}
        <motion.div
          className="mt-4 flex items-center divide-x divide-stone-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {CATEGORY_ORDER.map(cat => {
            const count = partners.filter(p => p.category === cat).length;
            const meta = CATEGORY_META[cat];
            return (
              <div key={cat} className="flex items-center gap-2 px-5 first:pl-0 last:pr-0">
                <span className="font-mono text-xl font-black" style={{ color: exhibit.accentColor }}>
                  {count}
                </span>
                <span className="text-[11px] font-medium text-stone-500">{meta.label}</span>
              </div>
            );
          })}
        </motion.div>
      </motion.header>

      {/* Content */}
      {loadState === 'loading' && (
        <div className="flex justify-center py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
        </div>
      )}

      {loadState === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-center text-sm font-semibold text-red-700">
          数据加载失败
        </div>
      )}

      {loadState === 'ready' && (
        <div className="flex w-full flex-col gap-7">
          {grouped.map(({ category, partners: catPartners }, idx) => (
            <CategorySection
              key={category}
              category={category}
              partners={catPartners}
              accentColor={exhibit.accentColor}
              sectionIndex={idx}
            />
          ))}
        </div>
      )}
    </section>
  );
}
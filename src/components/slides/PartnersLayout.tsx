import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Building2, Landmark, ShieldCheck } from 'lucide-react';
import { SlideLayoutProps } from './SlideLayout';

type PartnerCategory = 'military-research' | 'testing-agency' | 'enterprise';

interface Partner {
  id: string;
  cnName: string;
  enName: string;
  category: PartnerCategory;
  logo: string;
  logoConfidence: string;
  features?: string[];
}

interface PartnersPayload {
  partners: Partner[];
}

const CATEGORY_META: Record<PartnerCategory, {
  label: string;
  eyebrow: string;
  icon: React.ComponentType<{ className?: string }>;
  maxItems: number;
}> = {
  'military-research': {
    label: '军工科研',
    eyebrow: 'Research Units',
    icon: ShieldCheck,
    maxItems: 8,
  },
  'testing-agency': {
    label: '测评机构',
    eyebrow: 'Evaluation Labs',
    icon: Landmark,
    maxItems: 13,
  },
  enterprise: {
    label: '企业用户',
    eyebrow: 'Enterprise Clients',
    icon: Building2,
    maxItems: 15,
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

const PartnerLogoCard: React.FC<{
  partner: Partner;
  index: number;
  accentColor: string;
}> = ({ partner, index, accentColor }) => {
  const [imageFailed, setImageFailed] = useState(!partner.logo);
  const isTextFallback = partner.logoConfidence === 'text-fallback';
  const showImage = !imageFailed && !isTextFallback;
  const highlight = partner.logoConfidence === 'official' || partner.logoConfidence === 'official-related';

  return (
    <motion.article
      className="group relative min-h-[96px] rounded-lg border border-stone-200/80 bg-white/78 backdrop-blur-md px-3 py-2.5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 + index * 0.018, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      title={`${partner.cnName} / ${partner.enName}`}
    >
      {highlight && (
        <div
          className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <div className="flex h-[42px] items-center justify-center">
        {showImage ? (
          <img
            src={partner.logo}
            alt={partner.cnName}
            className="max-h-[38px] max-w-full object-contain"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex w-full items-center justify-center gap-2">
            <span
              className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[12px] font-black tracking-wide text-white"
              style={{ backgroundColor: accentColor }}
            >
              {getInitials(partner)}
            </span>
            <span className="min-w-0 truncate text-sm font-extrabold text-neutral-900">
              {partner.cnName}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 min-h-[32px] text-center">
        <div className="truncate text-[12px] font-bold text-neutral-800">{partner.cnName}</div>
        <div className="truncate font-mono text-[10px] uppercase tracking-wide text-stone-400">
          {partner.enName}
        </div>
      </div>
    </motion.article>
  );
};

export default function PartnersLayout({ exhibit }: SlideLayoutProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let ignore = false;

    fetch('/partners/partners.json')
      .then(response => {
        if (!response.ok) throw new Error(`partners.json ${response.status}`);
        return response.json() as Promise<PartnersPayload>;
      })
      .then(data => {
        if (ignore) return;
        const sorted = [...(data.partners || [])].sort((a, b) => {
          const categoryDelta = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
          if (categoryDelta !== 0) return categoryDelta;
          return (CONFIDENCE_PRIORITY[a.logoConfidence] ?? 9) - (CONFIDENCE_PRIORITY[b.logoConfidence] ?? 9);
        });
        setPartners(sorted);
        setLoadState('ready');
      })
      .catch(() => {
        if (!ignore) setLoadState('error');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const groupedPartners = useMemo(() => {
    return CATEGORY_ORDER.map(category => ({
      category,
      partners: partners.filter(partner => partner.category === category),
    }));
  }, [partners]);

  const trustedLogoCount = partners.filter(partner => partner.logoConfidence !== 'text-fallback').length;
  const pendingLogoCount = partners.length - trustedLogoCount;

  return (
    <section className="flex w-full max-w-7xl flex-col items-center justify-center gap-5 px-2 md:px-4">
      <motion.header
        className="w-full max-w-5xl text-center"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/75 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.28em] text-stone-500 shadow-sm">
          <BadgeCheck className="h-3.5 w-3.5" style={{ color: exhibit.accentColor }} />
          {exhibit.englishTag}
        </div>
        <h2 className="font-display text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">
          {exhibit.name}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm font-medium text-stone-600 md:text-base">
          {exhibit.subtitle}
        </p>
      </motion.header>

      {loadState === 'loading' && (
        <div className="rounded-lg border border-stone-200 bg-white/80 px-5 py-3 text-sm text-stone-500">
          正在读取合作客户数据...
        </div>
      )}

      {loadState === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700">
          合作客户数据暂未加载，请检查 /partners/partners.json。
        </div>
      )}

      {loadState === 'ready' && (
        <>
          <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-[0.95fr_1.15fr_1.25fr]">
            {groupedPartners.map(({ category, partners: categoryPartners }) => {
              const meta = CATEGORY_META[category];
              const Icon = meta.icon;

              return (
                <motion.div
                  key={category}
                  className="rounded-xl border border-stone-200/85 bg-white/50 p-3 shadow-[0_18px_42px_rgba(15,23,42,0.06)] backdrop-blur-md"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.5 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm"
                        style={{ backgroundColor: exhibit.accentColor }}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-neutral-900">{meta.label}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                          {meta.eyebrow}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-sm font-bold text-stone-500">
                      {categoryPartners.length}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                    {categoryPartners.slice(0, meta.maxItems).map((partner, index) => (
                      <PartnerLogoCard
                        key={partner.id}
                        partner={partner}
                        index={index}
                        accentColor={exhibit.accentColor}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 text-[12px] font-medium text-stone-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.45 }}
          >
            <span className="rounded-full border border-stone-200 bg-white/70 px-3 py-1">
              已接入 {partners.length} 家合作客户
            </span>
            <span className="rounded-full border border-stone-200 bg-white/70 px-3 py-1">
              可展示 logo {trustedLogoCount} 个
            </span>
            {pendingLogoCount > 0 && (
              <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-red-700">
                {pendingLogoCount} 个待替换正式 logo
              </span>
            )}
          </motion.div>
        </>
      )}
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SlideLayoutProps } from './SlideLayout';

interface Partner {
  id: string;
  cnName: string;
  enName: string;
  category: string;
  logo: string;
  logoConfidence: string;
}

const CONFIDENCE_PRIORITY: Record<string, number> = {
  'official': 0,
  'official-related': 1,
  'official-likely': 2,
  'group': 3,
  'text-fallback': 4,
};

const CATEGORY_LABELS: Record<string, string> = {
  'enterprise': '企业合作',
  'military-research': '军工科研',
  'testing-agency': '检测机构',
};

export default function PartnersLayout({ exhibit }: SlideLayoutProps) {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch('/partners/partners.json')
      .then(r => r.json())
      .then(data => {
        const sorted = [...data.partners].sort(
          (a: Partner, b: Partner) =>
            (CONFIDENCE_PRIORITY[a.logoConfidence] ?? 5) - (CONFIDENCE_PRIORITY[b.logoConfidence] ?? 5)
        );
        setPartners(sorted);
      })
      .catch(() => {});
  }, []);

  const logoPartners = partners.filter(p => p.logoConfidence !== 'text-fallback');
  const textPartners = partners.filter(p => p.logoConfidence === 'text-fallback');

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight font-display">
          {exhibit.name}
        </h2>
        <div className="mt-2.5 h-1 w-16 mx-auto rounded-full" style={{ backgroundColor: exhibit.accentColor }} />
        <p className="text-sm md:text-base text-stone-700 mt-3 font-sans font-medium">
          {exhibit.subtitle}
        </p>
      </motion.div>

      {/* Logo Partners Grid */}
      {logoPartners.length > 0 && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 md:gap-3">
            {logoPartners.map((partner, i) => (
              <motion.div
                key={partner.id}
                className="bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-xl p-3 shadow-xs flex flex-col items-center justify-center gap-1.5 aspect-square hover:shadow-md hover:border-stone-300 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.03, duration: 0.4 }}
                title={partner.cnName}
              >
                <img
                  src={partner.logo}
                  alt={partner.cnName}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  loading="lazy"
                />
                <span className="text-[10px] md:text-[11px] text-stone-600 text-center leading-tight font-medium line-clamp-2">
                  {partner.cnName}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Text-only Partners */}
      {textPartners.length > 0 && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {textPartners.map((partner, i) => (
              <motion.div
                key={partner.id}
                className="bg-white/60 backdrop-blur-sm border border-stone-200/70 rounded-lg px-3 py-1.5 shadow-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.03, duration: 0.3 }}
              >
                <span className="text-[11px] md:text-xs text-stone-500 font-medium whitespace-nowrap">
                  {partner.cnName}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category summary */}
      <motion.div
        className="flex items-center gap-4 mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const count = partners.filter(p => p.category === key).length;
          if (count === 0) return null;
          return (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exhibit.accentColor }} />
              <span className="text-xs text-stone-500 font-mono">{label} {count}+</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

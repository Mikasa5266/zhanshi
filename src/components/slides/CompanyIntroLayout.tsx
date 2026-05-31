import React from 'react';
import { motion } from 'motion/react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function CompanyIntroLayout({ exhibit }: SlideLayoutProps) {
  const directions = [
    { x: -30, y: 0 },
    { x: -10, y: -20 },
    { x: 10, y: -20 },
    { x: 30, y: 0 },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-5 w-full max-w-4xl mx-auto">
      {/* Hero */}
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
        <p className="text-[10px] md:text-xs text-stone-500 mt-1.5 font-sans tracking-wide">
          军民融合 / 国内首创 / 自主可控
        </p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 w-full mt-1">
        {exhibit.keywords.map((kw, i) => {
          const IconComponent = ICON_MAP[kw.icon];
          return (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-xl p-3 md:p-4 shadow-xs flex flex-col items-center gap-1.5 text-center"
              initial={{ opacity: 0, x: directions[i].x, y: directions[i].y }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                  {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                </div>
                {kw.statValue && (
                  <span className="text-xl md:text-2xl font-black text-neutral-900 font-display">
                    {kw.statValue}
                  </span>
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold text-neutral-800 block">{kw.label}</span>
                <span className="text-[9px] text-stone-500 block">{kw.sublabel}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Core Capabilities */}
      {exhibit.coreCapabilities && (
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-2.5 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {exhibit.coreCapabilities.map((cap, i) => {
            const IconComponent = ICON_MAP[cap.icon];
            return (
              <motion.div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-stone-200/80 rounded-full shadow-xs"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${exhibit.accentColor}12`, color: exhibit.accentColor }}>
                  {IconComponent && <IconComponent className="w-3 h-3" />}
                </div>
                <span className="text-[10px] md:text-[11px] font-semibold text-neutral-700">{cap.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Certifications */}
      {exhibit.certifications && (
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.85, duration: 0.5 }}
        >
          {exhibit.certifications.map((cert, i) => (
            <span key={i} className="text-[9px] md:text-[10px] font-mono text-stone-500 tracking-wide">
              {cert}
            </span>
          ))}
        </motion.div>
      )}

      {/* English Tag */}
      <motion.span
        className="text-[9px] md:text-[10px] font-mono text-stone-400 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {exhibit.englishTag}
      </motion.span>
    </div>
  );
}

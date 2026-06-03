import React from 'react';
import { motion } from 'motion/react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';
import ImageCarousel from '../ImageCarousel';
import PlayVideoButton from '../PlayVideoButton';

export default function WebRunnerLayout({ exhibit, onPlayVideo }: SlideLayoutProps) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      {/* Speed lines - radial burst background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) + 15;
          const delay = i * 0.15;
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 h-[1px] origin-left"
              style={{
                width: '35%',
                rotate: `${angle}deg`,
                background: `linear-gradient(90deg, transparent 60%, ${exhibit.accentColor}20 80%, ${exhibit.accentColor}40 100%)`,
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 0.4, 0], scaleX: [0.3, 1, 0.3] }}
              transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[13px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ color: exhibit.accentColor, backgroundColor: `${exhibit.accentColor}10` }}>
              WebRunner
            </span>
            <motion.div
              className="w-5 h-[1px]"
              style={{ background: `linear-gradient(90deg, ${exhibit.accentColor}, transparent)` }}
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[13px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ color: exhibit.accentColor, backgroundColor: `${exhibit.accentColor}10` }}>
              GUIRunner
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
            {exhibit.name}
          </h2>
          <p className="text-[13px] font-mono text-stone-400 tracking-widest mt-0.5">{exhibit.englishTag}</p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex w-full gap-5 items-stretch">
          {/* Left: Description + Highlights */}
          <motion.div
            className="flex-1 flex flex-col gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Description */}
            <p className="text-[14px] text-stone-600 leading-relaxed">
              {exhibit.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-col gap-2">
              {exhibit.highlights?.map((hl, i) => {
                const IconComponent = ICON_MAP[hl.icon];
                return (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2.5 bg-white/80 border border-stone-200/80 rounded-xl px-3 py-2.5"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${exhibit.accentColor}12`, color: exhibit.accentColor }}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[14px] font-bold text-neutral-900 block">{hl.title}</span>
                      <span className="text-[13px] text-stone-500">{hl.desc}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Screenshot carousel */}
          <motion.div
            className="w-[45%] shrink-0 hidden md:flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative flex-1 rounded-xl overflow-hidden">
              {/* Animated border beam */}
              <motion.div
                className="absolute -inset-[2px] rounded-xl overflow-hidden"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, ${exhibit.accentColor} 80%, transparent 90%, transparent 100%)`,
                }}
              />
              <div className="absolute inset-[1px] rounded-xl bg-white/90 backdrop-blur-sm" />
              <div className="relative m-[3px] rounded-lg overflow-hidden h-[calc(100%-6px)]">
                <ImageCarousel
                  images={exhibit.screenshots || []}
                  accentColor={exhibit.accentColor}
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Keywords bar */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-4 flex-wrap"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {exhibit.keywords.map((kw, i) => (
            <motion.div
              key={i}
              className="relative px-3 py-1 rounded-full overflow-hidden"
              style={{ border: `1px solid ${exhibit.accentColor}30` }}
              variants={{
                hidden: { opacity: 0, x: 40, scale: 0.8 },
                visible: { opacity: 1, x: 0, scale: 1 },
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 opacity-15"
                style={{ background: `linear-gradient(90deg, transparent, ${exhibit.accentColor}, transparent)` }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
              />
              <span className="relative text-[13px] font-bold font-mono" style={{ color: exhibit.accentColor }}>
                {kw.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Play video button */}
        {exhibit.videoUrl && (
          <div className="mt-3 z-10">
            <PlayVideoButton
              label={exhibit.videoLabel || `一分钟看懂 ${exhibit.name}`}
              accentColor={exhibit.accentColor}
              onClick={() => onPlayVideo?.()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

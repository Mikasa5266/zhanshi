import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function MilitaryDataLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      {/* Header: left-aligned with security badge */}
      <motion.div
        className="flex items-center gap-3 w-full max-w-5xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="w-2 h-8 rounded-full"
          style={{ backgroundColor: exhibit.accentColor }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        <div>
          <h2 className="text-lg md:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
            {exhibit.name}
          </h2>
          <span className="text-[9px] font-mono text-stone-400 tracking-widest">{exhibit.englishTag}</span>
        </div>
      </motion.div>

      {/* 2x2 Grid: video takes top-left, keywords fill the rest */}
      <motion.div
        className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-3 w-full max-w-5xl"
        style={{ aspectRatio: '16/9' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Video cell - spans top-left, larger */}
        <motion.div
          className="row-span-2 rounded-xl overflow-hidden bg-stone-900/95 flex items-center justify-center border"
          style={{ borderColor: `${exhibit.accentColor}40` }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {exhibit.videoUrl ? (
            <video
              src={exhibit.videoUrl}
              className="w-full h-full object-cover"
              muted autoPlay playsInline
              onEnded={onVideoEnd}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-stone-400">
              <PlayCircle className="w-10 h-10 md:w-14 md:h-14 opacity-40" />
              <span className="text-[10px] md:text-xs font-mono opacity-60">视频待接入</span>
            </div>
          )}
        </motion.div>

        {/* Right column: 2 keyword panels stacked */}
        {[0, 1].map((row) => (
          <motion.div
            key={row}
            className="bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-xl p-3 md:p-4 flex flex-col justify-center gap-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + row * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {exhibit.keywords.slice(row * 2, row * 2 + 2).map((kw, i) => {
              const IconComponent = ICON_MAP[kw.icon];
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-neutral-900 block">{kw.label}</span>
                    <span className="text-[9px] text-stone-500 block">{kw.sublabel}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function WebRunnerLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  const leftKeywords = exhibit.keywords.slice(0, 2);
  const rightKeywords = exhibit.keywords.slice(2, 4);

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg md:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
          {exhibit.name}
        </h2>
        <span className="text-[9px] md:text-[10px] font-mono text-stone-400 tracking-widest">
          {exhibit.englishTag}
        </span>
      </motion.div>

      <motion.div
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-stone-200/80 shadow-xl bg-stone-900/95 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            <PlayCircle className="w-12 h-12 md:w-16 md:h-16 opacity-40" />
            <span className="text-xs md:text-sm font-mono opacity-60">视频待接入</span>
          </div>
        )}
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded-full border"
          style={{ color: exhibit.accentColor, borderColor: `${exhibit.accentColor}40` }}>
          WebRunner
        </span>
        {leftKeywords.map((kw, i) => {
          const IconComponent = ICON_MAP[kw.icon];
          return (
            <div key={`l-${i}`} className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-full px-3 py-1.5 shadow-xs">
              <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                {IconComponent && <IconComponent className="w-3 h-3" />}
              </div>
              <span className="text-[11px] font-semibold text-neutral-800">{kw.label}</span>
            </div>
          );
        })}

        <div className="w-px h-4 bg-stone-300/80 hidden md:block" />

        <span className="text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded-full border"
          style={{ color: exhibit.accentColor, borderColor: `${exhibit.accentColor}40` }}>
          GUIRunner
        </span>
        {rightKeywords.map((kw, i) => {
          const IconComponent = ICON_MAP[kw.icon];
          return (
            <div key={`r-${i}`} className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-full px-3 py-1.5 shadow-xs">
              <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                {IconComponent && <IconComponent className="w-3 h-3" />}
              </div>
              <span className="text-[11px] font-semibold text-neutral-800">{kw.label}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

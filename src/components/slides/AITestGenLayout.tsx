import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function AITestGenLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-lg md:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
          {exhibit.name}
        </h2>
        <p className="text-[10px] md:text-xs text-stone-500 mt-0.5">{exhibit.subtitle}</p>
      </motion.div>

      <motion.div
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-violet-200/80 shadow-xl bg-stone-900/95 flex items-center justify-center"
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
        className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {exhibit.keywords.map((kw, i) => {
          const IconComponent = ICON_MAP[kw.icon];
          return (
            <motion.div
              key={i}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-xl px-3 py-2 shadow-xs flex-1 min-w-0"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-neutral-900 block truncate">{kw.label}</span>
                <span className="text-[9px] text-stone-500 block truncate">{kw.sublabel}</span>
              </div>
              <span className="text-[8px] font-mono text-stone-300 ml-auto shrink-0">0{i + 1}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

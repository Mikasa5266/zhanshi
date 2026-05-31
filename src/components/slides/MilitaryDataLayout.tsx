import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function MilitaryDataLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      <motion.div
        className="text-left w-full max-w-5xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-lg md:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
          {exhibit.name}
        </h2>
        <span className="text-[9px] font-mono text-stone-400 tracking-widest">{exhibit.englishTag}</span>
      </motion.div>

      {/* Video with security border */}
      <motion.div
        className="relative w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl border-2"
          style={{ borderColor: `${exhibit.accentColor}50` }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="m-1.5 aspect-video rounded-xl overflow-hidden bg-stone-900/95 flex items-center justify-center">
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
        </div>
      </motion.div>

      {/* Bottom keyword grid */}
      <motion.div
        className="grid grid-cols-4 gap-2 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {exhibit.keywords.map((kw, i) => {
          const IconComponent = ICON_MAP[kw.icon];
          return (
            <motion.div
              key={i}
              className="bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-lg p-2.5 flex items-center gap-2 shadow-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
            >
              <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-neutral-900 block truncate">{kw.label}</span>
                <span className="text-[8px] text-stone-500 block truncate">{kw.sublabel}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

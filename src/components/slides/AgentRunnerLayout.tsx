import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle, Bot } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function AgentRunnerLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${exhibit.accentColor}15`, border: `1.5px solid ${exhibit.accentColor}40` }}
          animate={{ boxShadow: [`0 0 0px ${exhibit.accentColor}00`, `0 0 20px ${exhibit.accentColor}30`, `0 0 0px ${exhibit.accentColor}00`] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bot className="w-4 h-4 md:w-5 md:h-5" style={{ color: exhibit.accentColor }} />
        </motion.div>
        <div>
          <h2 className="text-lg md:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
            {exhibit.name}
          </h2>
          <span className="text-[9px] md:text-[10px] font-mono text-stone-400 tracking-widest">
            {exhibit.englishTag}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-xl bg-stone-900/95 flex items-center justify-center"
        style={{ border: `1.5px solid ${exhibit.accentColor}40` }}
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
        {exhibit.keywords.map((kw, i) => {
          const IconComponent = ICON_MAP[kw.icon];
          return (
            <motion.div
              key={i}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-full px-3 py-1.5 shadow-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                {IconComponent && <IconComponent className="w-3 h-3" />}
              </div>
              <span className="text-[11px] font-semibold text-neutral-800">{kw.label}</span>
              <span className="text-[9px] text-stone-400">{kw.sublabel}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle, Bot } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function AgentRunnerLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      {/* Top: AI badge + title inline */}
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

      {/* Center: Video with orbital keyword pills floating around it */}
      <div className="relative w-full max-w-4xl">
        {/* Video */}
        <motion.div
          className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-stone-900/95 flex items-center justify-center"
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

        {/* Floating keyword pills - positioned around the video */}
        <motion.div
          className="absolute -top-3 left-4 md:left-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <KeywordPill kw={exhibit.keywords[0]} color={exhibit.accentColor} />
        </motion.div>
        <motion.div
          className="absolute -top-3 right-4 md:right-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <KeywordPill kw={exhibit.keywords[1]} color={exhibit.accentColor} />
        </motion.div>
        <motion.div
          className="absolute -bottom-3 left-4 md:left-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <KeywordPill kw={exhibit.keywords[2]} color={exhibit.accentColor} />
        </motion.div>
        <motion.div
          className="absolute -bottom-3 right-4 md:right-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <KeywordPill kw={exhibit.keywords[3]} color={exhibit.accentColor} />
        </motion.div>
      </div>

      <motion.p
        className="text-[10px] md:text-xs text-stone-500 mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {exhibit.subtitle}
      </motion.p>
    </div>
  );
}

function KeywordPill({ kw, color }: { kw: { icon: string; label: string; sublabel: string }; color: string }) {
  const IconComponent = ICON_MAP[kw.icon];
  return (
    <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-full px-2.5 py-1 shadow-md">
      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15`, color }}>
        {IconComponent && <IconComponent className="w-2.5 h-2.5" />}
      </div>
      <span className="text-[10px] font-semibold text-neutral-800">{kw.label}</span>
    </div>
  );
}

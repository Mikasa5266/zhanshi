import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function DBBenchmarkLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
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

      {/* Main content: gauge left + video right */}
      <div className="flex items-center gap-4 md:gap-6 w-full max-w-5xl">
        {/* Left: Gauge + keywords */}
        <motion.div
          className="flex flex-col items-center gap-3 shrink-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* TPC Gauge */}
          <motion.div className="relative w-28 h-28 md:w-36 md:h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke={`${exhibit.accentColor}15`} strokeWidth="6" />
              <motion.circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke={exhibit.accentColor}
                strokeWidth="6"
                strokeDasharray="264"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 66 }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-2xl md:text-3xl font-black font-mono"
                style={{ color: exhibit.accentColor }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                75%
              </motion.span>
              <span className="text-[8px] md:text-[9px] text-stone-400 font-mono">TPC-E Score</span>
            </div>
          </motion.div>

          {/* Stacked keyword pills */}
          <div className="flex flex-col gap-1.5 w-full">
            {exhibit.keywords.map((kw, i) => {
              const IconComponent = ICON_MAP[kw.icon];
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-lg px-2.5 py-1.5 shadow-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                >
                  <div className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                    {IconComponent && <IconComponent className="w-3 h-3" />}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-900">{kw.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right: Video */}
        <motion.div
          className="relative flex-1 aspect-video rounded-2xl overflow-hidden border border-cyan-200/60 shadow-xl bg-stone-900/95 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
      </div>
    </div>
  );
}

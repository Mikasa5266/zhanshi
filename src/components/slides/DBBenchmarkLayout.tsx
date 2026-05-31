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

      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-5xl">
        {/* Video area */}
        <motion.div
          className="relative flex-1 w-full aspect-video rounded-2xl overflow-hidden border border-cyan-200/80 shadow-xl bg-stone-900/95 flex items-center justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
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

        {/* Right panel - benchmark metrics */}
        <motion.div
          className="flex flex-col gap-2 md:w-[200px] shrink-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* TPC badge */}
          <div className="flex items-center justify-center gap-2 py-2">
            <motion.div
              className="relative w-16 h-16 md:w-20 md:h-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke={`${exhibit.accentColor}30`}
                  strokeWidth="3"
                />
                <motion.circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke={exhibit.accentColor}
                  strokeWidth="4"
                  strokeDasharray="264"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 66 }}
                  transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[9px] md:text-[10px] font-black font-mono" style={{ color: exhibit.accentColor }}>TPC-E</span>
                <span className="text-[7px] text-stone-400">/</span>
                <span className="text-[9px] md:text-[10px] font-black font-mono" style={{ color: exhibit.accentColor }}>TPC-DS</span>
              </div>
            </motion.div>
          </div>

          {/* Keyword cards */}
          {exhibit.keywords.map((kw, i) => {
            const IconComponent = ICON_MAP[kw.icon];
            return (
              <motion.div
                key={i}
                className="bg-white/85 backdrop-blur-md border border-stone-200/90 rounded-lg p-2 shadow-xs flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                  {IconComponent && <IconComponent className="w-3 h-3" />}
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
    </div>
  );
}

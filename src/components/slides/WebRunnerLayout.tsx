import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { SlideLayoutProps } from './SlideLayout';

export default function WebRunnerLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      {/* Speed lines - radial burst from center */}
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
                background: `linear-gradient(90deg, transparent 60%, ${exhibit.accentColor}30 80%, ${exhibit.accentColor}60 100%)`,
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 0.6, 0], scaleX: [0.3, 1, 0.3] }}
              transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}
      </div>

      {/* Orbiting dot around video area */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[70%] aspect-video pointer-events-none"
        style={{ transform: 'translate(-50%, -55%)' }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: exhibit.accentColor,
            boxShadow: `0 0 12px ${exhibit.accentColor}, 0 0 24px ${exhibit.accentColor}80`,
            offsetPath: 'path("M0,0 h600 v340 h-600 Z")',
          }}
          animate={{ offsetDistance: ['0%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Main video with animated border beam */}
      <div className="relative w-full max-w-4xl z-10">
        {/* Rotating conic gradient border */}
        <motion.div
          className="absolute -inset-[2px] rounded-2xl overflow-hidden"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, ${exhibit.accentColor} 80%, transparent 90%, transparent 100%)`,
          }}
        />
        <div className="absolute inset-[1px] rounded-2xl bg-white/90 backdrop-blur-sm" />

        {/* Video */}
        <motion.div
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-stone-900/95 m-[3px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Keywords flying in from right with stagger + spring */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-5 flex-wrap max-w-3xl z-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {exhibit.keywords.map((kw, i) => (
          <motion.div
            key={i}
            className="relative px-3 py-1.5 rounded-full overflow-hidden"
            style={{ border: `1px solid ${exhibit.accentColor}30` }}
            variants={{
              hidden: { opacity: 0, x: 60, scale: 0.8 },
              visible: { opacity: 1, x: 0, scale: 1 },
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Inner glow sweep */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{ background: `linear-gradient(90deg, transparent, ${exhibit.accentColor}, transparent)` }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            />
            <span className="relative text-[10px] md:text-[11px] font-bold font-mono" style={{ color: exhibit.accentColor }}>
              {kw.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Dual product line + title */}
      <motion.div
        className="flex flex-col items-center gap-1 mt-3 z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: exhibit.accentColor, backgroundColor: `${exhibit.accentColor}10` }}>
            WebRunner
          </span>
          <motion.div
            className="w-6 h-[1px]"
            style={{ background: `linear-gradient(90deg, ${exhibit.accentColor}, transparent)` }}
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: exhibit.accentColor, backgroundColor: `${exhibit.accentColor}10` }}>
            GUIRunner
          </span>
        </div>
        <h2 className="text-base md:text-xl font-extrabold text-neutral-900 tracking-tight font-display">
          {exhibit.name}
        </h2>
        <span className="text-[9px] font-mono text-stone-400 tracking-widest">{exhibit.englishTag}</span>
      </motion.div>
    </div>
  );
}

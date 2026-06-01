import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

export default function DBBackupLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      {/* Top timeline nodes */}
      <motion.div
        className="flex items-center justify-center gap-2 md:gap-3 w-full max-w-4xl"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {exhibit.keywords.slice(0, 2).map((kw, i) => {
          const IconComponent = ICON_MAP[kw.icon];
          return (
            <React.Fragment key={i}>
              <motion.div
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-full px-3 py-2 shadow-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                  {IconComponent && <IconComponent className="w-3 h-3" />}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-neutral-900">{kw.label}</span>
                  <span className="text-[9px] text-stone-400 ml-1.5">{kw.sublabel}</span>
                </div>
              </motion.div>
              {i === 0 && (
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <div className="w-6 md:w-10 h-0.5 rounded-full" style={{ backgroundColor: `${exhibit.accentColor}40` }} />
                  <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px]"
                    style={{ borderLeftColor: `${exhibit.accentColor}60` }} />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>

      {/* Center: compact video with title overlay */}
      <div className="relative w-full max-w-3xl">
        <motion.div
          className="aspect-video rounded-2xl overflow-hidden border shadow-xl bg-stone-900/95 flex items-center justify-center"
          style={{ borderColor: `${exhibit.accentColor}30` }}
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
        {/* Floating title badge */}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-stone-200/90 rounded-full px-4 py-1.5 shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="text-xs md:text-sm font-extrabold text-neutral-900 font-display">{exhibit.name}</span>
        </motion.div>
      </div>

      {/* Bottom timeline nodes */}
      <motion.div
        className="flex items-center justify-center gap-2 md:gap-3 w-full max-w-4xl mt-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {exhibit.keywords.slice(2, 4).map((kw, i) => {
          const IconComponent = ICON_MAP[kw.icon];
          return (
            <React.Fragment key={i}>
              <motion.div
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-full px-3 py-2 shadow-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.12, duration: 0.4 }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${exhibit.accentColor}15`, color: exhibit.accentColor }}>
                  {IconComponent && <IconComponent className="w-3 h-3" />}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-neutral-900">{kw.label}</span>
                  <span className="text-[9px] text-stone-400 ml-1.5">{kw.sublabel}</span>
                </div>
              </motion.div>
              {i === 0 && (
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <div className="w-6 md:w-10 h-0.5 rounded-full" style={{ backgroundColor: `${exhibit.accentColor}40` }} />
                  <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px]"
                    style={{ borderLeftColor: `${exhibit.accentColor}60` }} />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>

      <motion.span
        className="text-[9px] md:text-[10px] font-mono text-stone-400 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {exhibit.englishTag}
      </motion.span>
    </div>
  );
}

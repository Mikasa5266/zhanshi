import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';
import ImageCarousel from '../ImageCarousel';
import PlayVideoButton from '../PlayVideoButton';

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return <>{count.toLocaleString()}</>;
}

const DB_RANKINGS = [
  { rank: 1, name: '达梦 DM8', score: 12847, delta: '+3.2%' },
  { rank: 2, name: 'OceanBase', score: 11203, delta: '+1.8%' },
  { rank: 3, name: 'GaussDB', score: 9631, delta: '+2.1%' },
  { rank: 4, name: 'TiDB', score: 8920, delta: '+0.9%' },
];

export default function DBBenchmarkLayout({ exhibit, onPlayVideo }: SlideLayoutProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Racing stripe background - animated */}
      <div className="absolute inset-0 opacity-[0.02]">
        {[20, 40, 60, 80].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px h-full"
            style={{ left: `${pos}%`, backgroundColor: exhibit.accentColor }}
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [1, 1.02, 1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: exhibit.accentColor,
              left: `${15 + i * 18}%`,
              top: `${20 + i * 12}%`,
              opacity: 0.15,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          />
        ))}
      </div>

      <div className="relative flex w-full max-w-[90%] xl:max-w-6xl h-[70vh] px-4 gap-4">
        {/* Left: Live Leaderboard */}
        <motion.div
          className="flex flex-col w-[28%] min-w-[220px] max-w-[320px] shrink-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title with trophy */}
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${exhibit.accentColor}15` }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <Trophy className="w-5 h-5" style={{ color: exhibit.accentColor }} />
            </motion.div>
            <div>
              <h2 className="text-lg font-black text-neutral-900 tracking-tight leading-none">
                {exhibit.name}
              </h2>
              <span className="text-[13px] font-mono text-stone-400 tracking-[0.15em]">
                国内唯一 · 国家标准制定者
              </span>
            </div>
          </div>

          {/* Live ranking table */}
          <motion.div
            className="flex-1 bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Table header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800">
              <span className="text-[14px] font-mono text-stone-500 uppercase tracking-wider">TPC-E Live Rankings</span>
              <motion.div
                className="flex items-center gap-1"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-ring" />
                </div>
                <span className="text-[13px] font-mono text-red-400">LIVE</span>
              </motion.div>
            </div>

            {/* Rankings */}
            <div className="flex-1 flex flex-col justify-center px-3 py-2 gap-1.5">
              {DB_RANKINGS.map((db, i) => (
                <motion.div
                  key={i}
                  className="relative flex items-center gap-2 rounded-lg px-2.5 py-2 overflow-hidden"
                  style={{ backgroundColor: i === 0 ? `${exhibit.accentColor}12` : 'transparent' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                  whileHover={{ scale: 1.02, backgroundColor: `${exhibit.accentColor}18` }}
                >
                  {/* Animated progress bar background */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-lg opacity-[0.06]"
                    style={{ backgroundColor: exhibit.accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(db.score / 13000) * 100}%` }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className={`relative w-5 h-5 rounded flex items-center justify-center text-[14px] font-black ${i === 0 ? 'text-red-400' : i === 1 ? 'text-stone-300' : i === 2 ? 'text-red-700' : 'text-stone-500'}`}>
                    {i === 0 ? <Crown className="w-3.5 h-3.5" /> : `#${db.rank}`}
                  </div>
                  <span className="relative text-[15px] font-semibold text-stone-200 flex-1">{db.name}</span>
                  <motion.span
                    className="relative text-xs font-mono font-bold"
                    style={{ color: exhibit.accentColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.15 }}
                  >
                    <AnimatedCounter target={db.score} duration={1500 + i * 300} />
                  </motion.span>
                  <motion.span
                    className="relative text-[13px] font-mono text-red-300"
                    animate={i === 0 ? { opacity: [0.7, 1, 0.7] } : undefined}
                    transition={i === 0 ? { duration: 2, repeat: Infinity } : undefined}
                  >
                    {db.delta}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="px-4 py-2 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[13px] font-mono text-stone-600">Powered by 迎风聚智 TPC Engine</span>
              <span className="text-[13px] font-mono text-stone-600">v5.0</span>
            </div>
          </motion.div>

          {/* Capability pills below leaderboard */}
          <motion.div
            className="flex flex-wrap gap-1.5 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {exhibit.keywords.map((kw, i) => {
              const IconComponent = ICON_MAP[kw.icon];
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-1.5 bg-white/80 border border-stone-200/80 rounded-full px-2.5 py-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.08 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${exhibit.accentColor}12`, color: exhibit.accentColor }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {IconComponent && <IconComponent className="w-2.5 h-2.5" />}
                  </motion.div>
                  <span className="text-[13px] font-bold text-neutral-800">{kw.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right: Screenshot Carousel */}
        <motion.div
          className="relative flex-1 rounded-2xl overflow-hidden bg-stone-100 flex flex-col items-center justify-center border border-stone-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageCarousel
            images={exhibit.screenshots || []}
            accentColor={exhibit.accentColor}
            className="w-full h-full"
          />

          {/* Overlay: animated score counter */}
          <motion.div
            className="absolute top-4 right-4 bg-black/70 backdrop-blur-md rounded-xl px-4 py-3 border border-stone-700 overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />
            <div className="relative text-[13px] font-mono text-stone-400 mb-0.5">CURRENT SCORE</div>
            <motion.div
              className="relative text-2xl font-black font-mono animate-count-glow"
              style={{ color: exhibit.accentColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <AnimatedCounter target={12847} duration={2200} />
            </motion.div>
            <div className="relative text-[12px] font-mono text-red-300 mt-0.5">TPC-E tpmE</div>
          </motion.div>

          {/* Bottom: standard badge */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="text-[13px] font-mono text-stone-300">《数据库基准测试通用技术规范》制定者</span>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-[13px] font-mono text-stone-300">总装校准通过</span>
            </div>
          </motion.div>

          {/* Play video button */}
          {exhibit.videoUrl && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
              <PlayVideoButton
                label={exhibit.videoLabel || `一分钟看懂 ${exhibit.name}`}
                accentColor={exhibit.accentColor}
                onClick={() => onPlayVideo?.()}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

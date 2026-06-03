import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';
import ImageCarousel from '../ImageCarousel';
import PlayVideoButton from '../PlayVideoButton';

const DB_RANKINGS = [
  { rank: 1, name: '达梦 DM8', score: 12847, delta: '+3.2%' },
  { rank: 2, name: 'OceanBase', score: 11203, delta: '+1.8%' },
  { rank: 3, name: 'GaussDB', score: 9631, delta: '+2.1%' },
  { rank: 4, name: 'TiDB', score: 8920, delta: '+0.9%' },
];

export default function DBBenchmarkLayout({ exhibit, onPlayVideo }: SlideLayoutProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Racing stripe background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-0 left-[20%] w-px h-full" style={{ backgroundColor: exhibit.accentColor }} />
        <div className="absolute top-0 left-[40%] w-px h-full" style={{ backgroundColor: exhibit.accentColor }} />
        <div className="absolute top-0 left-[60%] w-px h-full" style={{ backgroundColor: exhibit.accentColor }} />
        <div className="absolute top-0 left-[80%] w-px h-full" style={{ backgroundColor: exhibit.accentColor }} />
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
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-[13px] font-mono text-red-400">LIVE</span>
              </motion.div>
            </div>

            {/* Rankings */}
            <div className="flex-1 flex flex-col justify-center px-3 py-2 gap-1.5">
              {DB_RANKINGS.map((db, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2"
                  style={{ backgroundColor: i === 0 ? `${exhibit.accentColor}12` : 'transparent' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-[14px] font-black ${i === 0 ? 'text-red-400' : i === 1 ? 'text-stone-300' : i === 2 ? 'text-red-700' : 'text-stone-500'}`}>
                    {i === 0 ? <Crown className="w-3.5 h-3.5" /> : `#${db.rank}`}
                  </div>
                  <span className="text-[15px] font-semibold text-stone-200 flex-1">{db.name}</span>
                  <span className="text-xs font-mono font-bold" style={{ color: exhibit.accentColor }}>{db.score.toLocaleString()}</span>
                  <span className="text-[13px] font-mono text-red-300">{db.delta}</span>
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
                >
                  <div className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${exhibit.accentColor}12`, color: exhibit.accentColor }}>
                    {IconComponent && <IconComponent className="w-2.5 h-2.5" />}
                  </div>
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
            className="absolute top-4 right-4 bg-black/70 backdrop-blur-md rounded-xl px-4 py-3 border border-stone-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="text-[13px] font-mono text-stone-400 mb-0.5">CURRENT SCORE</div>
            <motion.div
              className="text-2xl font-black font-mono"
              style={{ color: exhibit.accentColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              12,847
            </motion.div>
            <div className="text-[12px] font-mono text-red-300 mt-0.5">TPC-E tpmE</div>
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

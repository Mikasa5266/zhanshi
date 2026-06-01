import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle, Layers, ArrowDown } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

const PIPELINE_STAGES = [
  { label: '原始数据', desc: '日志/文本/图像/视频', color: '#dc2626' },
  { label: '统一分类', desc: '自然语言理解信息', color: '#ea580c' },
  { label: '质量评估', desc: '多维度数据打分', color: '#d97706' },
  { label: 'AI就绪', desc: '高质量训练数据集', color: '#059669' },
];

export default function MilitaryDataLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      <div className="relative flex w-full max-w-6xl h-[72vh] max-h-[540px] px-4 gap-5">
        {/* Left: Data Refinery Pipeline */}
        <motion.div
          className="flex flex-col w-[260px] shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <div className="mb-3">
            <motion.h2
              className="text-lg font-black text-neutral-900 tracking-tight"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {exhibit.name}
            </motion.h2>
            <motion.p
              className="text-[10px] text-stone-500 mt-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              从原始数据到AI就绪 · 全链路数据炼制
            </motion.p>
          </div>

          {/* Vertical pipeline: data refinery stages */}
          <div className="flex-1 flex flex-col justify-center gap-1">
            {PIPELINE_STAGES.map((stage, i) => (
              <React.Fragment key={i}>
                <motion.div
                  className="relative bg-white/90 border rounded-xl px-3 py-2.5 flex items-center gap-2.5"
                  style={{ borderColor: `${stage.color}30`, borderLeftWidth: '3px', borderLeftColor: stage.color }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                    style={{ backgroundColor: stage.color }}>
                    {i + 1}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-900 block">{stage.label}</span>
                    <span className="text-[9px] text-stone-400">{stage.desc}</span>
                  </div>
                  {i === PIPELINE_STAGES.length - 1 && (
                    <motion.div
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: stage.color }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-[8px] text-white font-bold">✓</span>
                    </motion.div>
                  )}
                </motion.div>
                {i < PIPELINE_STAGES.length - 1 && (
                  <motion.div
                    className="flex justify-center py-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                  >
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <ArrowDown className="w-3 h-3 text-stone-300" />
                    </motion.div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Security keywords */}
          <motion.div
            className="mt-3 grid grid-cols-2 gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {exhibit.keywords.map((kw, i) => {
              const IconComponent = ICON_MAP[kw.icon];
              return (
                <div key={i} className="flex items-center gap-1.5 bg-stone-50 rounded-lg px-2 py-1.5">
                  <div className="w-4 h-4 rounded flex items-center justify-center"
                    style={{ color: exhibit.accentColor }}>
                    {IconComponent && <IconComponent className="w-3 h-3" />}
                  </div>
                  <span className="text-[9px] font-semibold text-neutral-700">{kw.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right: Video with data visualization overlay */}
        <div className="relative flex-1 flex flex-col gap-3">
          {/* Video main area */}
          <motion.div
            className="relative flex-1 rounded-2xl overflow-hidden bg-stone-900 flex items-center justify-center"
            style={{ border: `1px solid ${exhibit.accentColor}25` }}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {exhibit.videoUrl ? (
              <video
                src={exhibit.videoUrl}
                className="w-full h-full object-cover"
                muted autoPlay playsInline
                onEnded={onVideoEnd}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-stone-500">
                <PlayCircle className="w-16 h-16 opacity-20" />
                <span className="text-xs font-mono opacity-50">视频待接入</span>
              </div>
            )}

            {/* Data flow particles overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: exhibit.accentColor,
                    left: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: ['-10%', '110%'],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>

            {/* Top-right: classification badge */}
            <motion.div
              className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Layers className="w-3 h-3" style={{ color: exhibit.accentColor }} />
              <span className="text-[9px] font-mono text-stone-300">多密级数据治理</span>
            </motion.div>
          </motion.div>

          {/* Bottom stats bar */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { label: '数据源', value: '日志/文本/视频/图像' },
              { label: '安全等级', value: '等保三级+' },
              { label: '适配', value: '飞腾/龙芯/鲲鹏' },
            ].map((stat, i) => (
              <div key={i} className="flex-1 bg-white/80 border border-stone-200/80 rounded-lg px-3 py-2 text-center">
                <div className="text-[9px] text-stone-400">{stat.label}</div>
                <div className="text-[10px] font-bold text-neutral-800 mt-0.5">{stat.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

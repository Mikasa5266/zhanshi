import React from 'react';
import { motion } from 'motion/react';
import { Clock, Undo2 } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';
import ImageCarousel from '../ImageCarousel';
import PlayVideoButton from '../PlayVideoButton';

const TIMELINE_POINTS = [
  { time: '09:00', label: '全量备份', size: 'lg' },
  { time: '10:30', label: '增量 #1', size: 'sm' },
  { time: '12:00', label: '增量 #2', size: 'sm' },
  { time: '14:15', label: '增量 #3', size: 'sm' },
  { time: '16:00', label: '增量 #4', size: 'sm' },
  { time: '18:00', label: '全量备份', size: 'lg' },
];

export default function DBBackupLayout({ exhibit, onPlayVideo }: SlideLayoutProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Subtle clock pattern */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full border opacity-[0.03]"
        style={{ borderColor: exhibit.accentColor }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative flex flex-col w-full max-w-[90%] xl:max-w-6xl h-[70vh] px-4">
        {/* Header row */}
        <motion.div
          className="flex items-center justify-between mb-2"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${exhibit.accentColor}10`, border: `1.5px solid ${exhibit.accentColor}30` }}
            >
              <Clock className="w-5 h-5" style={{ color: exhibit.accentColor }} />
            </motion.div>
            <div>
              <h2 className="text-lg font-black text-neutral-900 tracking-tight">{exhibit.name}</h2>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-2 bg-red-50 border border-red-200/60 rounded-full px-3 py-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Undo2 className="w-3.5 h-3.5 text-red-600" />
            <span className="text-[14px] font-bold text-red-700">秒级恢复</span>
          </motion.div>
        </motion.div>

        {/* Timeline visualization */}
        <motion.div
          className="relative bg-stone-50 border border-stone-200/80 rounded-2xl px-5 py-3 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Timeline track */}
          <div className="relative flex items-start justify-between pt-4 pb-1">
            {/* Background line */}
            <motion.div
              className="absolute top-4 left-0 right-0 h-0.5 rounded-full"
              style={{ backgroundColor: `${exhibit.accentColor}20` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            {/* Progress fill */}
            <motion.div
              className="absolute top-4 left-0 h-0.5 rounded-full"
              style={{ backgroundColor: exhibit.accentColor, width: '70%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Points */}
            {TIMELINE_POINTS.map((point, i) => (
              <motion.div
                key={i}
                className="relative flex flex-col items-center z-10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
              >
                <div
                  className={`rounded-full border-2 bg-white ${point.size === 'lg' ? 'w-4 h-4' : 'w-2.5 h-2.5'}`}
                  style={{ borderColor: exhibit.accentColor }}
                />
                <span className="text-[12px] font-mono text-stone-400 mt-1">{point.time}</span>
                <span className="text-[12px] font-semibold text-stone-600">{point.label}</span>
              </motion.div>
            ))}
          </div>
          {/* Restore arrow indicator */}
          <motion.div
            className="absolute top-0 right-[32%] flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="text-[12px] font-mono px-1.5 py-0.5 rounded text-white"
              style={{ backgroundColor: exhibit.accentColor }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑ 恢复到此处
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main content: video + feature cards side by side */}
        <div className="flex gap-3 flex-1 min-h-0">
          {/* Screenshot Carousel */}
          <motion.div
            className="relative flex-1 rounded-2xl overflow-hidden bg-stone-100 flex items-center justify-center border"
            style={{ borderColor: `${exhibit.accentColor}25` }}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageCarousel
              images={exhibit.screenshots || []}
              accentColor={exhibit.accentColor}
              className="w-full h-full"
            />

            {/* Resource usage indicator */}
            <motion.div
              className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="text-[12px] font-mono text-stone-400 mb-1">资源占用</div>
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-[14px] font-bold text-red-300">CPU 2.3%</div>
                  <div className="w-16 h-1 bg-stone-700 rounded-full mt-0.5">
                    <motion.div
                      className="h-full bg-red-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '2.3%' }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                      style={{ minWidth: '3px' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-bold text-red-300">MEM 48MB</div>
                  <div className="w-16 h-1 bg-stone-700 rounded-full mt-0.5">
                    <motion.div
                      className="h-full bg-red-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '6%' }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                      style={{ minWidth: '4px' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Feature cards stacked */}
          <motion.div
            className="flex flex-col gap-2 w-[18%] min-w-[160px] max-w-[200px] shrink-0 justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {exhibit.keywords.map((kw, i) => {
              const IconComponent = ICON_MAP[kw.icon];
              return (
                <motion.div
                  key={i}
                  className="bg-white border border-stone-200/80 rounded-xl px-3 py-3 flex items-center gap-2.5"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, borderColor: `${exhibit.accentColor}40` }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${exhibit.accentColor}10`, color: exhibit.accentColor }}>
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-[15px] font-bold text-neutral-900 block">{kw.label}</span>
                    <span className="text-[13px] text-stone-400">{kw.sublabel}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Play video button */}
        {exhibit.videoUrl && (
          <div className="flex justify-center mt-3">
            <PlayVideoButton
              label={exhibit.videoLabel || `一分钟看懂 ${exhibit.name}`}
              accentColor={exhibit.accentColor}
              onClick={() => onPlayVideo?.()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

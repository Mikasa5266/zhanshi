import React from 'react';
import { motion } from 'motion/react';
import { Droplets } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';
import ImageCarousel from '../ImageCarousel';
import PlayVideoButton from '../PlayVideoButton';

const AGENTS = [
  { id: 'supervisor', name: '监管总管', angle: -90, radius: 38 },
  { id: 'dosing', name: '加药', angle: -18, radius: 38 },
  { id: 'uf', name: '超滤', angle: 54, radius: 38 },
  { id: 'ro', name: '反渗透', angle: 126, radius: 38 },
  { id: 'pump', name: '泵组', angle: 198, radius: 38 },
];

const PHASES = ['检测', '分析', '派发', '诊断', '执行', '操控', '恢复'];

export default function WaterPlantLayout({ exhibit, onPlayVideo }: SlideLayoutProps) {
  const accent = exhibit.accentColor;

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Subtle water ripple rings in background */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border pointer-events-none"
          style={{
            width: `${ring * 30 + 20}%`,
            height: `${ring * 30 + 20}%`,
            borderColor: `${accent}${8 - ring * 2}`,
          }}
          animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 4 + ring, repeat: Infinity, delay: ring * 1.2 }}
        />
      ))}

      <div className="relative flex w-full max-w-[92%] xl:max-w-6xl h-[72vh] px-4 gap-6">
        {/* Left column: Orbital Agent Map + Phase Ring */}
        <motion.div
          className="relative w-[340px] shrink-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title above orbital */}
          <div className="absolute top-0 left-0 right-0">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accent}12` }}
              >
                <Droplets className="w-5 h-5" style={{ color: accent }} />
              </motion.div>
              <div>
                <h2 className="text-lg font-black text-neutral-900 tracking-tight">{exhibit.name}</h2>
                <span className="text-[12px] font-mono text-stone-400 tracking-[0.12em]">
                  DIGITAL TWIN · MULTI-AGENT
                </span>
              </div>
            </div>
          </div>

          {/* Orbital diagram container */}
          <div className="relative w-[280px] h-[280px]">
            {/* Orbital track */}
            <div
              className="absolute inset-[15%] rounded-full border-2 border-dashed"
              style={{ borderColor: `${accent}18` }}
            />

            {/* Phase arc indicators around the orbit */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280">
              <circle
                cx="140" cy="140" r="120"
                fill="none"
                stroke={`${accent}10`}
                strokeWidth="18"
              />
              {PHASES.map((_, i) => {
                const startAngle = (i * 360) / PHASES.length - 90;
                const endAngle = startAngle + 360 / PHASES.length - 4;
                const r = 120;
                const x1 = 140 + r * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 140 + r * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 140 + r * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 140 + r * Math.sin((endAngle * Math.PI) / 180);
                return (
                  <path
                    key={i}
                    d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                    fill="none"
                    stroke={i === 3 ? accent : `${accent}30`}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}
              {/* Animated pulse dot traveling around */}
              <motion.circle
                cx="140" cy="20" r="4"
                fill={accent}
                animate={{
                  cx: [140, 256, 256, 140, 24, 24, 140],
                  cy: [20, 80, 200, 260, 200, 80, 20],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                opacity={0.8}
              />
            </svg>

            {/* Center node - screenshot thumbnail */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full overflow-hidden border-[3px] shadow-lg z-10"
              style={{ borderColor: `${accent}60` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <img
                src={exhibit.screenshots?.[0] || ''}
                alt=""
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `0 0 0 2px ${accent}40` }}
                animate={{ boxShadow: [`0 0 0 2px ${accent}40`, `0 0 0 8px ${accent}00`] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Agent nodes on orbital path */}
            {AGENTS.map((agent, i) => {
              const rad = (agent.angle * Math.PI) / 180;
              const x = 50 + agent.radius * Math.cos(rad);
              const y = 50 + agent.radius * Math.sin(rad);
              const isSuper = agent.id === 'supervisor';

              return (
                <motion.div
                  key={agent.id}
                  className="absolute flex flex-col items-center z-10"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, type: 'spring' }}
                >
                  <motion.div
                    className={`rounded-full flex items-center justify-center bg-white border-2 shadow-md ${isSuper ? 'w-11 h-11' : 'w-9 h-9'}`}
                    style={{ borderColor: `${accent}${isSuper ? '80' : '40'}` }}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
                  >
                    <Droplets
                      className={isSuper ? 'w-5 h-5' : 'w-3.5 h-3.5'}
                      style={{ color: accent }}
                    />
                  </motion.div>
                  <span className="text-[11px] font-bold text-neutral-700 mt-1 whitespace-nowrap">
                    {agent.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Phase legend below orbital */}
          <motion.div
            className="flex flex-wrap justify-center gap-1 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {PHASES.map((phase, i) => (
              <div
                key={phase}
                className="text-[11px] px-2 py-0.5 rounded-full border font-medium"
                style={{
                  borderColor: i === 3 ? accent : `${accent}25`,
                  color: i === 3 ? accent : '#78716c',
                  backgroundColor: i === 3 ? `${accent}08` : 'transparent',
                }}
              >
                {phase}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Main viewport with stacked presentation */}
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Screenshot main area */}
          <motion.div
            className="relative flex-1 rounded-2xl overflow-hidden bg-stone-50 border border-stone-200/80"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageCarousel
              images={exhibit.screenshots || []}
              accentColor={accent}
              className="w-full h-full"
            />

            {/* Floating process indicator overlay - top left */}
            <motion.div
              className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-stone-100"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accent }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[12px] font-mono text-stone-500">
                  3D Digital Twin · Live
                </span>
              </div>
            </motion.div>

            {/* Bottom: flowing data bar */}
            <motion.div
              className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white/80 to-transparent flex items-end justify-center pb-1.5 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-3">
                {['异常检测', '智能诊断', '自动处置', '状态恢复'].map((step, i) => (
                  <React.Fragment key={step}>
                    <span className="text-[11px] font-bold text-stone-500">{step}</span>
                    {i < 3 && (
                      <motion.div
                        className="w-4 h-[2px] rounded-full"
                        style={{ backgroundColor: `${accent}60` }}
                        animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {exhibit.videoUrl && (
              <div className="absolute top-3 right-3">
                <PlayVideoButton
                  label={exhibit.videoLabel || `一分钟看懂 ${exhibit.name}`}
                  accentColor={accent}
                  onClick={() => onPlayVideo?.()}
                />
              </div>
            )}
          </motion.div>

          {/* Bottom: highlight cards row */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {exhibit.highlights?.map((h, i) => {
              const Icon = ICON_MAP[h.icon];
              return (
                <motion.div
                  key={i}
                  className="flex-1 bg-white/80 border border-stone-200/80 rounded-xl px-3 py-2.5 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: `${accent}10`, color: accent }}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-[13px] font-bold text-neutral-800">{h.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">{h.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
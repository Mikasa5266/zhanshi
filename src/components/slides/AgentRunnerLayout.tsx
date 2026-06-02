import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle, Bot } from 'lucide-react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';

const AGENT_NODES = [
  { id: 'design', label: '测试设计', top: '8%', left: '25%' },
  { id: 'script', label: '脚本生成', top: '8%', left: '62%' },
  { id: 'execute', label: '执行调度', top: '62%', left: '25%' },
  { id: 'report', label: '文档输出', top: '62%', left: '62%' },
];

export default function AgentRunnerLayout({ exhibit, onVideoEnd }: SlideLayoutProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      <div className="relative flex w-full max-w-6xl h-[72vh] max-h-[540px] px-4 gap-4">
        {/* Left: Agent Constellation */}
        <motion.div
          className="relative w-[340px] shrink-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              className="relative w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${exhibit.accentColor}12` }}
            >
              <Bot className="w-5 h-5" style={{ color: exhibit.accentColor }} />
            </motion.div>
            <div>
              <h2 className="text-lg font-black text-neutral-900 tracking-tight">{exhibit.name}</h2>
              <span className="text-[13px] font-mono text-stone-400 tracking-[0.12em]">多智能体协同 · 端到端自动化</span>
            </div>
          </div>

          {/* Constellation area */}
          <div className="relative flex-1">
            {/* Dashed orbital ring */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-dashed"
              style={{ borderColor: `${exhibit.accentColor}20` }}
            />

            {/* Central brain node */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10"
              style={{ backgroundColor: `${exhibit.accentColor}12`, border: `2px solid ${exhibit.accentColor}35` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            >
              <div className="text-center">
                <Bot className="w-5 h-5 mx-auto" style={{ color: exhibit.accentColor }} />
                <span className="text-[11px] font-bold block mt-0.5" style={{ color: exhibit.accentColor }}>协调中心</span>
              </div>
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${exhibit.accentColor}40` }}
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Agent nodes at fixed positions */}
            {AGENT_NODES.map((node, i) => {
              const kw = exhibit.keywords[i];
              const IconComponent = kw ? ICON_MAP[kw.icon] : null;
              return (
                <motion.div
                  key={node.id}
                  className="absolute flex flex-col items-center z-10"
                  style={{ top: node.top, left: node.left }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.4, type: 'spring' }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 shadow-md"
                    style={{ borderColor: `${exhibit.accentColor}40` }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" style={{ color: exhibit.accentColor }} />}
                  </motion.div>
                  <span className="text-[13px] font-bold text-neutral-700 mt-1.5 whitespace-nowrap">{node.label}</span>
                  {kw && <span className="text-[12px] text-stone-400">{kw.sublabel}</span>}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right: Video */}
        <motion.div
          className="relative flex-1 rounded-2xl overflow-hidden bg-stone-900 flex items-center justify-center border"
          style={{ borderColor: `${exhibit.accentColor}20` }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Architecture layers overlay */}
          <motion.div
            className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="text-[12px] font-mono text-stone-400 mb-1">PLATFORM STACK</div>
            <div className="flex flex-col gap-0.5">
              {['统一门户与协同层', '核心能力服务层', '工具与智能体适配层', '国产基础资源层'].map((layer, i) => (
                <div
                  key={i}
                  className="text-[12px] font-mono px-1.5 py-0.5 rounded text-white/80"
                  style={{ backgroundColor: `${exhibit.accentColor}${30 + i * 12}` }}
                >
                  {layer}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom: GJB compliance badge */}
          <motion.div
            className="absolute bottom-3 left-3 right-3 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="text-[13px] font-mono text-stone-300">GJB438C 合规文档自动生成</span>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: exhibit.accentColor }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[13px] font-mono text-stone-300">4 Agents Active</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

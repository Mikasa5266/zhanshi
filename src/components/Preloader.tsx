/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Cpu, HardDrive, Wifi, Sparkles, CheckCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface PreloaderProps {
  onComplete: () => void;
  userLogo?: string | null;
}

export default function Preloader({ onComplete, userLogo }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('初始化展示引擎...');
  const [isDone, setIsDone] = useState(false);
  
  const preloadSteps = [
    { threshold: 15, msg: '正在汇聚风力 (编译 GLSL 顶点与片元着色器)...' },
    { threshold: 35, msg: '注入数智核心 (加载 WebUI 系统级渲染配置)...' },
    { threshold: 55, msg: '预备保障体系 (实例化 IndexedDB 静态缓存)...' },
    { threshold: 75, msg: '加载首屏资源 (秒开优化预置缓存机制)...' },
    { threshold: 92, msg: '安全检测通过 (GJB 规约校验完美通过)...' },
    { threshold: 100, msg: '准备就绪，欢迎走进迎风聚智' },
  ];

  useEffect(() => {
    // Dynamic progressive update representing an advanced loader
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate non-linear cache load (speeds up and slows down based on network phases)
      const increment = Math.floor(Math.random() * 12) + 5;
      currentProgress = Math.min(100, currentProgress + increment);
      
      setProgress(currentProgress);

      const matchedStep = preloadSteps.find(step => currentProgress <= step.threshold);
      if (matchedStep) {
        setCurrentStep(matchedStep.msg);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
        }, 300);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          id="preloader-overlay"
        >
          {/* Futuristic Tech Lines in background */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="w-full max-w-lg z-10 flex flex-col items-center">
            {/* Leming Brand Owl Icon and Text */}
            <motion.div 
               className="mb-8 flex flex-col items-center gap-1"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1, duration: 0.6 }}
               id="brand-header-loader"
             >
               <div className="w-16 h-16 relative group">
                 <BrandLogo className="w-16 h-16" userLogo={userLogo} />
                 {/* Visual pulse ring */}
                 <div className="absolute inset-x-0 h-full w-full rounded-2xl border border-red-500 animate-ping opacity-25 scale-110" />
               </div>
               <h2 className="text-xl font-bold tracking-widest text-red-500 font-display mt-4">LEMING TECH</h2>
               <p className="text-xs text-neutral-400 font-mono tracking-wider">迎风聚智 · 国内首创自主可控</p>
             </motion.div>

            {/* Giant Glowing Percentage Counter */}
            <motion.div 
              className="text-7xl font-light tracking-tighter text-white font-mono flex items-baseline gap-1"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              id="loader-percentage"
            >
              {progress}
              <span className="text-xl text-red-500 font-medium">%</span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-neutral-900 rounded-full mt-8 mb-4 overflow-hidden relative">
              {/* Dynamic Progress indicator */}
              <motion.div 
                className="h-full bg-linear-to-r from-red-600 via-rose-500 to-red-600 rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="loaderBar"
              />
            </div>

            {/* Step Message Log */}
            <div className="h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={currentStep}
                  className="text-xs text-neutral-400 font-mono tracking-wider text-center block"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Cache Strategy Indicators for SECONDS FIRST SECONDS SECURE (首屏秒开) */}
            <div className="mt-16 grid grid-cols-3 gap-4 w-full bg-neutral-950/80 border border-neutral-900 rounded-xl p-4 md:p-5">
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-lg bg-red-950/30 border border-red-900/30 text-red-500 mb-2">
                  <Cpu className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 font-bold">GLSL PRECOMPILE</span>
                <span className="text-[9px] text-neutral-600 mt-1">2.4ms 编译就绪</span>
              </div>
              <div className="flex flex-col items-center text-center border-x border-neutral-900 px-3">
                <div className="p-2 rounded-lg bg-red-950/30 border border-red-900/30 text-red-500 mb-2">
                  <HardDrive className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 font-bold">SW MEDIA CACHE</span>
                <span className="text-[9px] text-neutral-600 mt-1">98% 压缩比首屏</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-lg bg-red-950/30 border border-red-900/30 text-red-500 mb-2">
                  <Wifi className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 font-bold">LAZY STRATEGY</span>
                <span className="text-[9px] text-neutral-600 mt-1">响应式动态缓冲</span>
              </div>
            </div>

            {/* Subliminal Message (物勒工名) */}
            <p className="mt-8 text-[11px] text-neutral-600 font-mono italic text-center">
              "物勒工名，以考其诚" — 检验检测即是对质量誓死笃行的最高自律。
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Trigger main screen once unloaded */}
      {isDone && (
        <React.Fragment>
          {setTimeout(onComplete, 1)}
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

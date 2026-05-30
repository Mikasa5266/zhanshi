/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Sparkles, 
  HardDrive, 
  Wifi, 
  Eye, 
  RefreshCw, 
  Zap, 
  Check, 
  AlertCircle,
  Camera,
  Upload,
  Trash2
} from 'lucide-react';
import { CacheLog } from '../types';
import BrandLogo from './BrandLogo';

interface CacheManagerProps {
  userLogo: string | null;
  onLogoChange: (logo: string | null) => void;
}

export default function CacheManager({ userLogo, onLogoChange }: CacheManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cacheSize, setCacheSize] = useState(148.4); // MB
  const [chunkSize, setChunkSize] = useState(1.5); // MB
  const [isWarmingUp, setIsWarmingUp] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState('5G (45 Mbps)');
  const [latency, setLatency] = useState(12); // ms
  const [cacheEfficacy, setCacheEfficacy] = useState(99.6); // %
  const [logs, setLogs] = useState<CacheLog[]>([
    { timestamp: '14:32:01', message: 'Leming SW Engine: 注册成功。检测到 ServiceWorker v1.2.', type: 'info' },
    { timestamp: '14:32:02', message: 'Cache API: 成功预缓存首屏视频分片 (Slide1_Placeholder_1080p).', type: 'success' },
    { timestamp: '14:32:02', message: 'IndexedDB: 正在预热 AGI 驱动测试多级模型指标...', type: 'info' },
    { timestamp: '14:32:03', message: 'Performance Audit: 首屏首次可交互时间 (TTI) 达到 0.42 秒！秒开达成！', type: 'success' }
  ]);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  const addLog = (message: string, type: 'info' | 'success' | 'warn') => {
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });
    setLogs(prev => [...prev.slice(-20), { timestamp: time, message, type }]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleWarmup = () => {
    if (isWarmingUp) return;
    setIsWarmingUp(true);
    addLog('Cache Warmup: 开始对后续场景 (2 至 6) 视频资源实施预加载...', 'info');
    
    setTimeout(() => {
      setChunkSize(4.0);
      setCacheSize(prev => +(prev + 42.5).toFixed(1));
      addLog('Buffers Allocated: 42.5 MB 后续视频分片存储成功 (Blob BlobURL).', 'success');
    }, 1000);

    setTimeout(() => {
      setLatency(6);
      setCacheEfficacy(99.9);
      addLog('Latency Optimized: 视频流线程预热就绪，渲染管道时滞由 12ms 缩减至 6ms！', 'success');
      setIsWarmingUp(false);
    }, 2000);
  };

  const handleClear = () => {
    setCacheSize(0);
    setChunkSize(0);
    setCacheEfficacy(0);
    setLatency(120);
    addLog('System Warning: 已清空缓存及 IndexedDB 镜像。下次加载将产生远程流时延。', 'warn');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      addLog('Branding Error: Logo 文件过大 (请限制在 3MB 以内)。', 'warn');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onLogoChange(base64);
      addLog('Branding Success: 成功注入并更新自定义公司 Logo！全站应用。', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleLogoClear = () => {
    onLogoChange(null);
    addLog('Branding Reset: 成功还原为勒名官方‘迎风聚智’高科技鹰眼盾徽。', 'info');
  };

  return (
    <div className="relative z-40" id="smart-cache-manager-root">
      {/* Floating Trigger Switch */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-805 text-xs text-neutral-300 font-mono transition-all hover:border-red-500/40 select-none shadow-lg shadow-black/50 cursor-pointer"
        title="首屏秒开视频缓存与品牌智能智核控制中心"
        id="cache-trigger-btn"
      >
        <Zap className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        <span className="hidden sm:inline">秒开整备中心</span>
        <span className="bg-red-500/15 text-red-400 border border-red-500/30 text-[9px] px-1.5 py-0.2 rounded-full font-bold">
          {userLogo ? "自订品牌" : cacheSize > 0 ? "已预热" : "未加载"}
        </span>
      </button>

      {/* Drawer Overlay Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-neutral-950/98 border-l border-neutral-900 shadow-2xl z-50 flex flex-col backdrop-blur-md"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            id="cache-panel-drawer"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-650/10 border border-red-600/30 text-red-500">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display select-none">视频缓存与品牌智设终端</h4>
                  <p className="text-[10px] text-neutral-400 font-mono tracking-wider">LEMING ENGINE & BRAND INJECTOR</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-white font-mono text-lg px-2 rounded-md hover:bg-neutral-900 cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Dashboard Contents Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
              {/* Architecture Statement */}
              <div className="bg-red-950/10 border border-red-900/20 rounded-lg p-3.5 text-[11px] text-neutral-350 leading-relaxed">
                为了实现在移动端的<strong className="text-red-400 font-semibold">首屏秒开</strong>与<strong className="text-red-400 font-semibold">丝滑切换</strong>，本系统集成了 CDN 预备推送、Service Worker 静态劫持与 IndexedDB 视频分片二级缓存策略。同时，支持实时导入自定义品牌 logo，加速视觉本地化交付。
              </div>

              {/* Branding Customizer Section */}
              <div className="bg-neutral-900/40 border border-neutral-850 rounded-xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 border-b border-neutral-800/85 pb-2">
                  <Camera className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold text-white font-display">
                    品牌视觉自订智能模块 (Brand Customizer)
                  </span>
                </div>
                
                <p className="text-[10px] text-neutral-400 leading-relaxed">
                  通过拖入或选择任意图片，一键替换全站标志（包含主标题、页眉徽标、页脚索引、开屏加载器等），完美适配个性化业务汇报需求。
                </p>

                <div className="flex items-center gap-4">
                  {/* Miniature brand preview using new component */}
                  <BrandLogo className="w-16 h-16 shrink-0" userLogo={userLogo} />
                  
                  <div className="flex-1 space-y-1.5">
                    <div className="flex gap-2">
                      <label className="flex-1 py-1.5 px-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500/40 text-[10px] font-bold text-neutral-300 hover:text-white cursor-pointer transition-all text-center flex items-center justify-center gap-1.5 select-none">
                        <Upload className="w-3.5 h-3.5 text-neutral-400" />
                        <span>选择 Logo 图片</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoUpload} 
                          className="hidden" 
                        />
                      </label>
                      
                      {userLogo && (
                        <button 
                          onClick={handleLogoClear}
                          className="p-1.5 rounded-lg border border-neutral-800 hover:border-red-650 hover:text-white text-neutral-400 transition-all cursor-pointer"
                          title="恢复官方默认徽标"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-[9px] text-neutral-500">
                      支持 PNG, JPEG, SVG。建议在 3MB 内。
                    </p>
                  </div>
                </div>
              </div>

              {/* Gauges & Interactive Specs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-3">
                  <span className="text-[10px] text-neutral-500 font-mono block">CACHE STACK SIZE</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-white">{cacheSize}</span>
                    <span className="text-xs text-neutral-400">MB</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-red-650 transition-all duration-500" style={{ width: `${Math.min(100, (cacheSize / 250) * 100)}%` }} />
                  </div>
                </div>

                <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-3">
                  <span className="text-[10px] text-neutral-500 font-mono block">EFFICACY RATIO</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-red-500">{cacheEfficacy}</span>
                    <span className="text-xs text-neutral-450">%</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${cacheEfficacy}%` }} />
                  </div>
                </div>

                <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-3">
                  <span className="text-[10px] text-neutral-500 font-mono block">NETWORK SIMULATION</span>
                  <span className="text-xs font-semibold text-neutral-300 font-mono mt-1 block">{networkSpeed}</span>
                  <span className="text-[9px] text-neutral-600 font-mono">智能自适应信道开启</span>
                </div>

                <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-3">
                  <span className="text-[10px] text-neutral-500 font-mono block">VIDEO INTERPLAY COHERENCE</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs font-bold font-mono text-emerald-400">{latency} ms</span>
                  </div>
                  <span className="text-[9px] text-neutral-600 font-mono">画质无缝衔接响应期</span>
                </div>
              </div>

              {/* Slider for Chunk Tuning */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-400">自适应切片缓存粒度 (Tuning)</span>
                  <span className="text-white font-bold">{chunkSize} MB</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="10" 
                  step="0.5" 
                  value={chunkSize} 
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setChunkSize(val);
                    addLog(`Tuning Buffer Size: 修改每个视频分片切块大小为 ${val} MB`, 'info');
                  }}
                  className="w-full accent-red-650 bg-neutral-800 rounded-lg appearance-none cursor-pointer h-1.5"
                />
                <p className="text-[9px] text-neutral-500 leading-tight">
                  针对移动4G/5G信道特征选择最佳切片粒度。极小片(0.5M)优先首字节极速开屏，普通宽带片(4.0M+ )支撑后台缓冲持久流畅播。
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleWarmup}
                  disabled={isWarmingUp}
                  className="flex-1 py-2 rounded-lg bg-red-650 hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-xs font-bold text-white transition-all font-sans flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isWarmingUp ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Zap className="w-3.5 h-3.5" />
                  )}
                  {isWarmingUp ? "正在加载分片..." : "一键预加载场景视频"}
                </button>
                <button 
                  onClick={handleClear}
                  className="py-2 px-3 rounded-lg border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all text-xs cursor-pointer"
                  title="清除本地分片存储"
                >
                  重置
                </button>
              </div>

              {/* Live Terminal Log */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase block">
                    SW 智网整备系统调试仿真
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div 
                  ref={logContainerRef}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg p-3.5 font-mono text-[10px] space-y-2 h-[150px] overflow-y-auto no-scrollbar shadow-inner"
                >
                  {logs.map((log, listIndex) => (
                    <div key={listIndex} className="flex gap-2 items-start leading-relaxed">
                      <span className="text-neutral-500 shrink-0">{log.timestamp}</span>
                      <span className={`
                        ${log.type === 'success' ? 'text-emerald-400' : ''}
                        ${log.type === 'warn' ? 'text-rose-450' : ''}
                        ${log.type === 'info' ? 'text-cyan-400' : ''}
                      `}>
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer Credits */}
            <div className="p-4 border-t border-neutral-900 bg-neutral-900/30 text-center">
              <p className="text-[9px] text-neutral-500 font-mono">
                LEMING BRAND ENGINE V1.3 · 全国重难系统高安全诊断架构
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

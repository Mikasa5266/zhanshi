/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ExternalLink, 
  Cpu, 
  History, 
  Award, 
  Phone, 
  MapPin, 
  Mail, 
  FileText, 
  Terminal, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  Clock, 
  ArrowUpRight,
  Shield,
  Layers,
  FileCheck,
  Server,
  Zap,
  Users
} from 'lucide-react';
import { SlideData } from '../types';
import { PRODUCTS_LIST, PARTNERS_LIST, PROJECTS_LIST } from '../data';
import logoChineseGraphic from '@/assets/中文+图形.png';

interface ScenicSlidesProps {
  activeSlide: number;
}

export default function ScenicSlides({ activeSlide }: ScenicSlidesProps) {
  // Slide 1: Product Array Interactive Tab Core
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [isSimulatingTest, setIsSimulatingTest] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [stressProgress, setStressProgress] = useState(0);
  const selectedProduct = PRODUCTS_LIST[selectedProductIndex];

  // Slide 2: AgentRunner AI orchestration
  const [agentStep, setAgentStep] = useState(0);
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);

  // Slide 3: Contrast Slider drag ratio
  const [revealRatio, setRevealRatio] = useState(50); // 0 to 100 percentage
  const [isDraggingContrast, setIsDraggingContrast] = useState(false);

  // Slide 4: Selected medal index
  const [selectedHonorTab, setSelectedHonorTab] = useState(0);

  // Slide 5: Form submission
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    category: '性能测试专项',
    message: ''
  });

  // Simulator loop for Slide 1 (stress tests)
  const runStressTest = () => {
    if (isSimulatingTest) return;
    setIsSimulatingTest(true);
    setStressProgress(0);
    setSimulationLogs([`[INFO] 初始化 ${selectedProduct.name} 运行环境...`]);

    const logPhrases = [
      `[CONFIG] 分配集群虚拟节点 (vUsers: 15,000)...`,
      `[BOUND] 发起 TCP 并发握手，测试带宽开销...`,
      `[MONITOR] 检测系统背板负载 (CPU: 32%, Mem: 1.4GB)...`,
      `[ANALYZE] 抓取微秒级时点响应延迟 (P99: 14ms)`,
      `[SUCCESS] 导出检验检测数据集，验证 GJB 标准完美贴合！`
    ];

    let currentProgress = 0;
    let logIndex = 0;

    const timer = setInterval(() => {
      currentProgress += 10;
      setStressProgress(currentProgress);

      if (currentProgress % 20 === 0 && logIndex < logPhrases.length) {
        setSimulationLogs(prev => [...prev, logPhrases[logIndex]]);
        logIndex++;
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsSimulatingTest(false);
        }, 1000);
      }
    }, 200);
  };

  // AgentRunner Simulation on Slide 2
  const runAgentTest = () => {
    if (isAgentRunning) return;
    setIsAgentRunning(true);
    setAgentStep(1);
    setAgentLogs(['[Agent Core] 调起大模型场景解析深度神经网络...']);

    const steps = [
      { step: 1, delay: 1000, log: '[Agent Specs] 读取GJB需求，共解析出5个硬核检验条件。' },
      { step: 2, delay: 2200, log: '[Agent Codegen] 智能生成测试脚本成功 (APIRunner DSL)。' },
      { step: 3, delay: 3500, log: '[Agent Exec] 无闪烁驱动客户端执行，多维断言完成率 100%。' },
      { step: 4, delay: 4800, log: '[Agent Export] 编译完全符合 GJB438C 要求的软件测试文档。进度顺利交付。' }
    ];

    steps.forEach(({ step, delay, log }) => {
      setTimeout(() => {
        setAgentStep(step);
        setAgentLogs(prev => [...prev, log]);
        if (step === 4) {
          setIsAgentRunning(false);
        }
      }, delay);
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', company: '', category: '性能测试专项', message: '' });
    }, 4000);
  };

  // Contrast Slider Touch and Drag support
  const handleContrastMove = (clientX: number, rectWidth: number, rectLeft: number) => {
    const x = clientX - rectLeft;
    const ratio = Math.max(0, Math.min(100, (x / rectWidth) * 100));
    setRevealRatio(ratio);
  };

  return (
    <div className="relative w-full h-full text-white overflow-hidden py-16 md:py-20 flex items-center justify-center" id="scenic-canvas-content">
      <AnimatePresence mode="wait">
        {activeSlide === 0 && (
          <motion.div 
            key="slide0"
            className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            id="slide0-container"
          >
            {/* Visual Column Left: Heavy Bold Typography & Presentation metadata */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/20 text-xs font-mono text-red-500 tracking-wider bg-glow-red"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                id="slide0-tag"
              >
                <Sparkles className="w-3 h-3 text-red-500" />
                军民融合 · 国内首创 · 自主可控
              </motion.div>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="mb-1"
                >
                  <img src={logoChineseGraphic} alt="迎风聚智" className="h-16 md:h-20 w-auto object-contain" />
                </motion.div>

                <div className="space-y-2">
                  <p className="text-xs uppercase text-neutral-500 font-mono tracking-[0.25em]">
                    WIND GATHER INTELLIGENCE / LEMING TECH
                  </p>
                  <h3 className="text-xl md:text-2xl font-light text-red-500 font-display">
                    基础软件检验检测技术研发先锋
                  </h3>
                </div>
              </div>

              <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl font-sans">
                武汉迎风聚智科技有限公司创立于2013年，是专业从事软件性能、安全可信度量与国家数据库基准性能评测的高精尖技术企业。打破国外技术壁垒，我们秉承‘物勒工名’的敬畏信念，为国家信息长城筑牢自主根基。
              </p>

              {/* PDF Cultural Quotes (物勒工名) */}
              <div className="border-l-2 border-red-600 pl-4 py-2 bg-red-950/5 rounded-r-lg max-w-lg">
                <p className="text-sm italic font-display text-neutral-300">
                  “物勒工名，以考其诚，工有不当，必行其罪，以究其情。”
                </p>
                <span className="text-[10px] text-neutral-500 font-mono block mt-1">——《礼记 · 月令篇》· 迎风聚智卓越文化宪章</span>
              </div>

              {/* Quick Call to Actions or indicators */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-mono text-neutral-400">适配国产芯片与操作系统</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-mono text-neutral-400">承载37项国家级重大科研课题</span>
                </div>
              </div>
            </div>

            {/* Visual Column Right: Floating Stats & Interaction Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800 backdrop-blur-xs relative group hover:border-red-500/20 transition-all">
                <div className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-950/20 text-red-500">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-neutral-550 block">FOUNDATION</span>
                <span className="text-xs font-bold text-neutral-300 font-mono mt-1 block">成立于 2013 年 (武汉)</span>
                <p className="text-[11px] text-neutral-400 mt-2">
                  十年深耕核心软硬件底层，构建高标软件诊断“医院”。
                </p>
              </div>

              <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800 backdrop-blur-xs hover:border-red-550/20 transition-all">
                <span className="text-[10px] font-mono text-neutral-550 block">PROJECTS</span>
                <span className="text-2xl font-bold font-mono text-red-500 block mt-1">37+项</span>
                <p className="text-[10px] text-neutral-400 mt-1">
                  主持或参与的国家重大工程与省部级核心项目。
                </p>
              </div>

              <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800 backdrop-blur-xs hover:border-red-550/20 transition-all">
                <span className="text-[10px] font-mono text-neutral-550 block">PATENTS</span>
                <span className="text-2xl font-bold font-mono text-red-550 block mt-1">27项</span>
                <p className="text-[10px] text-neutral-400 mt-1">
                  核心发明专利与超过50项自主软硬件著作权。
                </p>
              </div>

              <div className="col-span-2 bg-neutral-950/80 p-4 border border-neutral-900 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-sm bg-red-650/15 flex items-center justify-center text-red-550">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-mono">STANDARDS BUILDER</span>
                    <span className="text-xs font-semibold text-white">主导制定国家级软件基准测试规范</span>
                  </div>
                </div>
                <Award className="w-5 h-5 text-neutral-600" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Slide 1: Fully Interactive Testing Matrix & Product suites */}
        {activeSlide === 1 && (
          <motion.div 
            key="slide1"
            className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            id="slide1-container"
          >
            {/* Visual Column Left: Selection List */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-mono text-red-500 tracking-wider block mb-1">LEMING PRODUCT SUITE</span>
                <h2 className="text-2xl md:text-3.5xl font-extrabold text-white tracking-tight font-display">
                  全场景自动化检验工具
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  高可信系统质量保障，多维数据监控与混沌注入协同。
                </p>
              </div>

              {/* Interactive Vert-list tabs */}
              <div className="space-y-2 mt-4">
                {PRODUCTS_LIST.map((prod, index) => (
                  <button 
                    key={prod.id}
                    onClick={() => {
                      setSelectedProductIndex(index);
                      setIsSimulatingTest(false);
                      setStressProgress(0);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                      selectedProductIndex === index 
                        ? 'bg-red-950/20 border-red-500/40 text-white' 
                        : 'bg-neutral-900/30 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block">{prod.name}</span>
                      <span className="text-[10px] opacity-80 block tracking-tight font-mono">{prod.type}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedProductIndex === index ? 'translate-x-1 text-red-500' : 'opacity-30'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Column Right: Active Tab Data & Live Simulator console */}
            <div className="lg:col-span-7 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 md:p-6 backdrop-blur-xs flex flex-col justify-between h-full min-h-[420px]">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-neutral-800/80 mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">{selectedProduct.name}</h3>
                    <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-950/30 border border-emerald-900/30 text-emerald-400 text-glow-cyan">
                      自主源码国产替代率 100%
                    </span>
                  </div>
                  <span className="text-xs font-mono text-red-500 font-bold">{selectedProduct.specs}</span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {selectedProduct.desc}
                </p>

                {/* Simulated product efficiency charts */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 text-center">
                    <span className="text-[9px] text-neutral-550 font-mono block">ACCURACY RATE</span>
                    <span className="text-lg font-bold text-white font-mono">{selectedProduct.metrics.accuracy}%</span>
                  </div>
                  <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 text-center">
                    <span className="text-[9px] text-neutral-550 font-mono block">DEPLOY SPEED</span>
                    <span className="text-lg font-bold text-white font-mono">提升 {selectedProduct.metrics.speedUp} 倍</span>
                  </div>
                  <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 text-center">
                    <span className="text-[9px] text-neutral-550 font-mono block">RELIABILITY</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">{selectedProduct.metrics.reliability}%</span>
                  </div>
                </div>
              </div>

              {/* Simulation Screen Block */}
              <div className="bg-neutral-950/80 border border-neutral-900 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-900">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-neutral-400">勒名系统检验终端调试仿真</span>
                  </div>
                  <button 
                    onClick={runStressTest}
                    disabled={isSimulatingTest}
                    className="flex items-center gap-1.5 text-[9px] font-mono px-2 py-1 rounded-sm bg-red-650/15 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Activity className="w-3 h-3" />
                    {isSimulatingTest ? "正在监测量测量..." : "一键开始自动化体检"}
                  </button>
                </div>

                <div className="font-mono text-[10px] text-zinc-500 space-y-1 h-[72px] overflow-y-auto no-scrollbar scroll-smooth">
                  {simulationLogs.length === 0 ? (
                    <span className="text-neutral-600 block italic">等待向测试核心发出调度指令...</span>
                  ) : (
                    simulationLogs.map((log, logIdx) => (
                      <div key={logIdx} className={`${log.startsWith('[SUCCESS]') ? 'text-emerald-400' : log.startsWith('[ERROR]') ? 'text-red-400' : 'text-neutral-400'}`}>
                        {log}
                      </div>
                    ))
                  )}
                </div>

                {/* Stress bar */}
                {isSimulatingTest && (
                  <div className="w-full mt-3">
                    <div className="flex justify-between text-[8.5px] font-mono text-neutral-500 mb-1">
                      <span>并发承压负荷率: {stressProgress}%</span>
                      <span>已连接 WebRunner API 端点</span>
                    </div>
                    <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-red-600 to-amber-500" style={{ width: `${stressProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Slide 2: AgentRunner AI Orchestrator */}
        {activeSlide === 2 && (
          <motion.div 
            key="slide2"
            className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            id="slide2-container"
          >
            {/* Visual Column Left: Copywrite info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider block mb-1">INTELLIGENT AGENT RUNNER</span>
                <h2 className="text-2.5xl md:text-4xl font-extrabold text-white tracking-tight font-display">
                  AgentRunner 智体平台
                </h2>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  传统软件测试中人机效率严重脱节，且军工级文档繁冗、合规要求高。AgentRunner 深度运用人工智能模型与多模态感知，彻底重构整个高可靠产品软件测试闭环。
                </p>
              </div>

              {/* Major pillars */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-850 flex gap-3">
                  <div className="p-1 rounded-sm bg-cyan-600/10 text-cyan-400 h-fit shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">自适应自动化用例录制</h4>
                    <p className="text-[10.5px] text-neutral-400">自学捕获多端交互轨迹，免代码维护极低崩毁损。</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-850 flex gap-3">
                  <div className="p-1 rounded-sm bg-cyan-600/10 text-cyan-400 h-fit shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">GJB438C 规约文档一键化合成</h4>
                    <p className="text-[10.5px] text-neutral-400">将测试结果、接口分析一键导出为完全合规的标准军品文档。</p>
                  </div>
                </div>
              </div>

              <div>
                <button 
                  onClick={runAgentTest}
                  disabled={isAgentRunning}
                  className="w-full sm:w-auto py-2.5 px-5 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-sans font-bold text-xs text-white transition-all shadow-md shadow-cyan-900/20 disabled:bg-neutral-800 disabled:text-neutral-500 float-left"
                >
                  {isAgentRunning ? "AgentRunner 深度适配中..." : "一键派单：体验 AI 智体自动测试设计"}
                </button>
              </div>
            </div>

            {/* Visual Column Right: Workflow interactive graph */}
            <div className="lg:col-span-7 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 md:p-6 backdrop-blur-xs flex flex-col justify-between min-h-[400px]">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase block mb-4 pb-2 border-b border-neutral-800/80">
                AgentRunner AGI 核心调度链仿真
              </span>

              {/* Workflow Nodes */}
              <div className="grid grid-cols-4 gap-2 relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-800 -translate-y-1/2 z-0" />
                
                {[
                  { step: 1, label: '01 需求智析', desc: 'GJB需求语义抽取' },
                  { step: 2, label: '02 用例代写', desc: '多级测试脚本智能生成' },
                  { step: 3, label: '03 回放测试', desc: '真机环境无死角监测' },
                  { step: 4, label: '04 GJB编译', desc: '一键生成《测试计划》' }
                ].map((node) => {
                  const isActive = agentStep >= node.step;
                  const isCurrent = agentStep === node.step;
                  return (
                    <div key={node.step} className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-mono text-xs font-bold transition-all duration-300 ${
                        isCurrent 
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-400 shadow-lg shadow-cyan-500/20 animate-pulse'
                          : isActive 
                            ? 'bg-cyan-600 border-cyan-500 text-white' 
                            : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                      }`}>
                        {isActive && agentStep > node.step ? <Check className="w-4 h-4" /> : node.step}
                      </div>
                      <span className={`text-[10px] font-bold mt-2 text-center block ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                        {node.label}
                      </span>
                      <span className="text-[8.5px] text-neutral-550 text-center block mt-0.5">{node.desc}</span>
                    </div>
                  );
                })}
              </div>

              {/* Terminal Panel underneath */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 mt-6">
                <div className="flex items-center gap-1 ml-0.5 pb-2 border-b border-neutral-900 mb-2">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span className="text-[9.5px] font-mono text-neutral-400">Agent Runner Trace Log</span>
                </div>
                <div className="font-mono text-[10px] text-neutral-350 space-y-1.5 min-h-[96px] max-h-[120px] overflow-y-auto no-scrollbar">
                  {agentLogs.length === 0 ? (
                    <span className="text-neutral-600 block italic leading-relaxed">等待触发AI测试设计代理...</span>
                  ) : (
                    agentLogs.map((log, index) => (
                      <div key={index} className="flex gap-2 items-start leading-relaxed animate-fade-in">
                        <span className="text-cyan-500 shrink-0">⚛</span>
                        <span>{log}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Slide 3: Contrast Slider drag ratio (WebRunner vs LoadRunner) */}
        {activeSlide === 3 && (
          <motion.div 
            key="slide3"
            className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            id="slide3-container"
          >
            {/* Left intro Copywrite */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-red-500 tracking-wider block mb-1">DOMESTIC INNOVATION & ALTERNATIVE</span>
                <h2 className="text-2.5xl md:text-3.5xl font-extrabold text-white tracking-tight font-display">
                  信创替代 原始创新
                </h2>
                <p className="text-xs text-neutral-450 mt-2 leading-relaxed">
                  以往大型核心系统测试高度被国外 LoadRunner 垄断，采购费用高昂、存在严重源代码泄露风险。
                </p>
                <p className="text-xs text-neutral-400 mt-2 font-medium">
                  Leming WebRunner 历经近十年技术自研攻坚，是国内极少具备全面替换 LoadRunner、对数据库底板进行通用极限承压验证能力的自主产品。
                </p>
              </div>

              {/* Comp table summary */}
              <div className="bg-neutral-900/30 border border-neutral-850 rounded-xl p-3.5 space-y-2">
                <span className="text-[9px] text-neutral-500 font-mono tracking-wider block">COMPLIANCE TEST DATA</span>
                
                <div className="grid grid-cols-3 text-[10px] pb-1 border-b border-neutral-800 text-neutral-400 font-semibold">
                  <span>维度</span>
                  <span>国外 LoadRunner</span>
                  <span className="text-red-500">勒名 WebRunner</span>
                </div>
                
                <div className="grid grid-cols-3 text-[9.5px] py-1 border-b border-neutral-850/50 text-neutral-300">
                  <span>自主源码率</span>
                  <span className="text-neutral-500">0% (闭源套壳)</span>
                  <span className="font-bold text-red-500">100% (完全自主)</span>
                </div>

                <div className="grid grid-cols-3 text-[9.5px] py-1 border-b border-neutral-850/50 text-neutral-300">
                  <span>安全资质</span>
                  <span className="text-neutral-500">无军工适配认证</span>
                  <span className="font-bold text-red-500">特种装备资质、GJB认证</span>
                </div>

                <div className="grid grid-cols-3 text-[9.5px] pt-1 text-neutral-300">
                  <span>国产信创兼容</span>
                  <span className="text-neutral-500">不兼容华为飞腾/达梦</span>
                  <span className="font-bold text-red-500">广泛兼容全信创生态</span>
                </div>
              </div>
            </div>

            {/* Visual Column Right: Contrast interactive slider */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono text-neutral-500 block">
                拖动滑块：查看两代系统的研发蓝图 (Drag handle to verify contrast)
              </span>

              {/* Slider Panel Box */}
              <div 
                className="relative w-full h-[280px] bg-neutral-950 rounded-2xl border border-neutral-850 overflow-hidden select-none pointer-events-auto"
                onPointerDown={(e) => {
                  setIsDraggingContrast(true);
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleContrastMove(e.clientX, rect.width, rect.left);
                }}
                onPointerMove={(e) => {
                  if (!isDraggingContrast) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleContrastMove(e.clientX, rect.width, rect.left);
                }}
                onPointerUp={() => setIsDraggingContrast(false)}
                onPointerLeave={() => setIsDraggingContrast(false)}
                id="interactive-drag-slider-container"
              >
                {/* Traditional System (Left Representation) */}
                <div className="absolute inset-0 bg-neutral-950 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-neutral-600 font-mono text-[10px]">FOREIGN TRADITIONAL MODULES</span>
                    <h4 className="text-lg font-bold text-neutral-600 mt-1">LoadRunner V12.00</h4>
                    <p className="text-[10.5px] text-neutral-500 max-w-sm mt-2">
                      闭源黑盒软件，并发探针模块受知识产权制约、数据收集可能被第三方云上传，核心网安全备受隐患。
                    </p>
                  </div>
                  <div className="p-3 border border-neutral-900 rounded bg-neutral-950/40 text-neutral-600 font-mono text-[9px] max-w-sm">
                    {`[LR TRACE] Blocked proprietary ports (TC: 423).\nLicensing check failed on high cluster. Purchase required.`}
                  </div>
                </div>

                {/* WebRunner System Overlay (Right Representation, reveals dynamically) */}
                <div 
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-red-950/90 to-red-900/80 border-r border-red-500 border-glow-red p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-shadow"
                  style={{ width: `${revealRatio}%` }}
                >
                  <div className="min-w-[420px]">
                    <span className="text-red-400 font-mono text-[10px] tracking-wider block">DOMESTIC POWERED NATIVE</span>
                    <h4 className="text-xl font-extrabold text-white mt-1 font-display">Leming WebRunner V6.0</h4>
                    <p className="text-xs text-neutral-200 max-w-sm mt-2">
                      100% 国产自研检验引擎。原生高度契合多级军事国防检验环境，通过国家软件评测、中国工信部等一等资质认证。
                    </p>
                  </div>
                  
                  <div className="p-3 border border-red-500/20 rounded bg-black/60 text-red-400 font-mono text-[9px] max-w-sm min-w-[320px]">
                    {`[WEBRUNNER_AGENT_LIVE] GJB compliance: Verified.\nDatabase: OceanBase / Dameng fully loaded. Scale: 12GBps.`}
                  </div>
                </div>

                {/* Physical slider handle line */}
                <div 
                  className="absolute inset-y-0 h-full w-[2px] bg-red-400 pointer-events-none select-none z-20"
                  style={{ left: `${revealRatio}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-650 border border-red-400 flex items-center justify-center text-white text-[10px] shadow-lg shadow-red-900/30 select-none">
                    ↔
                  </div>
                </div>
              </div>

              {/* Explaining caption */}
              <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                <span>← 传统国外闭源系统 (不透明，昂贵)</span>
                <span>勒名 WebRunner (自强安全，全面替换) →</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Slide 4: Major government projects & Honors */}
        {activeSlide === 4 && (
          <motion.div 
            key="slide4"
            className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            id="slide4-container"
          >
            {/* Visual Column Left: Copy info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-500 tracking-wider block mb-1">NATIONAL SPECIAL RESEARCH PROJECTS</span>
                <h2 className="text-2.5xl md:text-3.5xl font-extrabold text-white tracking-tight font-display">
                  矢志国防 · 荣誉见证
                </h2>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  武汉迎风聚智是国内极少数具备特种空天、中船科研、海关重大枢纽质量检验资质的民品企业。我们在数据库底层研发技术上，始终站在最核心位置。
                </p>
              </div>

              {/* Medals and honors highlights */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setSelectedHonorTab(0)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedHonorTab === 0 
                      ? 'bg-amber-950/20 border-amber-500/30' 
                      : 'bg-neutral-900/30 border-neutral-850 hover:border-neutral-800'
                  }`}
                >
                  <Award className="w-5 h-5 text-amber-500 mb-1" />
                  <h4 className="text-[10.5px] font-bold text-white">湖北省科技一等奖等级</h4>
                  <p className="text-[9px] text-neutral-500 mt-0.5">中小企业创新大奖，全省仅15席</p>
                </button>

                <button 
                  onClick={() => setSelectedHonorTab(1)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedHonorTab === 1 
                      ? 'bg-amber-950/20 border-amber-500/30' 
                      : 'bg-neutral-900/30 border-neutral-850 hover:border-neutral-800'
                  }`}
                >
                  <Shield className="w-5 h-5 text-amber-500 mb-1" />
                  <h4 className="text-[10.5px] font-bold text-white">总装检验校准证书</h4>
                  <p className="text-[9px] text-neutral-500 mt-0.5">首家通过国防装备部基准测试</p>
                </button>
              </div>

              <p className="text-[10.5px] italic text-neutral-500 leading-normal border-l border-neutral-800 pl-3">
                “我们用近两万条测试沉淀数据、300个中大型被测系统，支撑起信息测试主权的一片天。”
              </p>
            </div>

            {/* Visual Column Right: Completed major tasks timeline */}
            <div className="lg:col-span-7 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 md:p-6 backdrop-blur-xs">
              <div className="flex justify-between items-center pb-3 border-b border-neutral-805 mb-4">
                <span className="text-[10.5px] font-mono text-amber-500 uppercase">
                  勒名承担代表性重难课题
                </span>
                <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/20 px-2 py-0.5 rounded">
                  多项填补国家空白
                </span>
              </div>

              {/* Timeline Cards */}
              <div className="space-y-3">
                {PROJECTS_LIST.map((proj, idx) => (
                  <div key={idx} className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-850 flex items-start gap-3.5 hover:border-red-500/10 transition-all">
                    <div className="w-6 h-6 rounded bg-amber-600/15 flex items-center justify-center shrink-0 text-amber-500 text-[10px] font-bold font-mono">
                      0{idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-white truncate">{proj.title}</span>
                        <span className="text-[8.5px] shrink-0 font-mono text-amber-400 bg-amber-950/15 border border-amber-900/20 px-1 py-0.2 rounded">
                          {proj.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono">
                        <span>分类: {proj.category}</span>
                        <span>下达机构: {proj.client}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Slide 5: Software Hospital concept & Custom Contact form */}
        {activeSlide === 5 && (
          <motion.div 
            key="slide5"
            className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            id="slide5-container"
          >
            {/* Left elements: Software Hospital Concept & Phone */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-red-500 tracking-wider block mb-1">IT DIAGNOSIS & SOFTWARE HOSPITAL</span>
                <h2 className="text-2.5xl md:text-3.5xl font-extrabold text-white tracking-tight font-display">
                  软件保障 “软件医院”
                </h2>
                <p className="text-xs text-neutral-450 mt-2 leading-relaxed">
                  正如人体需要医疗保健，复杂的分布式基础软硬件、大模型AI应用也需要一个精密的“软件医院”提供端到端的健康保障。
                </p>
              </div>

              {/* Three Stages of Hospital */}
              <div className="space-y-2.5">
                {[
                  { step: 'A', name: '挂号体检 (性能盘查)', desc: 'WebRunner/ServerCloud，多维负荷极限性能压力体测' },
                  { step: 'B', name: '问诊开药 (故障剖析)', desc: 'APM 动态链路探头与 ReliRunner 混沌极温故障注入，精确根因诊断' },
                  { step: 'C', name: '康复保健 (全面安御)', desc: '配置持续监测、对标 GJB 规范安全调优，为长效系统保驾护航' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 bg-neutral-900/20 p-2.5 rounded-lg border border-neutral-850 max-w-md">
                    <span className="w-5 h-5 rounded bg-red-650/15 flex items-center justify-center shrink-0 text-red-500 text-[10px] font-bold font-mono">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-none mb-1">{item.name}</h4>
                      <p className="text-[9.5px] text-neutral-550 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact meta */}
              <div className="space-y-1.5 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4.5 h-4.5 text-red-500 shrink-0" />
                  <span>国家基地: 湖北省武汉市武昌区中北路122号</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4.5 h-4.5 text-red-500 shrink-0" />
                  <span>协作专线: 027-87113061</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4.5 h-4.5 text-red-500 shrink-0" />
                  <span>机要邮箱: security_detect@leming_tech.com</span>
                </div>
              </div>
            </div>

            {/* Right elements: Beautiful Contact Booking Form */}
            <div className="lg:col-span-7 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 md:p-6 backdrop-blur-xs relative overflow-hidden">
              <div className="mb-4 pb-2 border-b border-neutral-850">
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
                  高安全系统 性能检测 / 适配仿真一键派单 (Inquiry Desk)
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-4 pointer-events-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 uppercase font-mono block">委托方姓名</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="例如: 孙主任" 
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 uppercase font-mono block">协作专线 (国内专号)</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="例如: 138-xxxx-xxxx"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 uppercase font-mono block">委托企业 / 军研单位名称</label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="例如: 中国航天科工测评中心 / 武汉大学软件国家重点实验室" 
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 uppercase font-mono block">委任服务专项类别</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                      >
                        <option value="性能测试专项">WebRunner/LoadRunner 国产替换压测设计</option>
                        <option value="混沌与可靠性混沌体系搭建">ReliRunner 系统混沌弹性故障植入</option>
                        <option value="大模型与AIGC评估">DeepRunner 智能系统合规性体检</option>
                        <option value="信创基础软硬件合规认证">国家行业标准多源数据库 TPC 统一跑分</option>
                        <option value="一站式保姆IT体检">软件医院全景日常保姆监控服务</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 uppercase font-mono block">简述检验安全条件需求 (Optional)</label>
                      <textarea 
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="简述系统环境、并发峰值规模或需要适配的芯片(如华为飞腾)..." 
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 resize-none h-[52px]"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-all shadow-md shadow-red-900/20 font-sans"
                    >
                      提交委托申请，即刻开启系统保密测评
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    key="success-form"
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                      <Check className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-sm font-bold text-white">委托检验单 成功投递至军工协作密网</span>
                    <p className="text-xs text-neutral-400 max-w-sm mt-2">
                      专属技术总监丁教授/丁江锋将在一小时内与您对接，评估自主可控测试方案与首屏测试试用包。
                    </p>
                    <div className="bg-neutral-950 p-3 border border-neutral-850 text-left font-mono text-[9px] text-emerald-400 rounded-lg mt-6 max-w-md w-full">
                      {`[SECURE TRACE SUCCESS]\nCipher Handshake: SHA-256 success\nDest: query_leming@wuhan_lemingtech.gov\nStatus: ROUTED`}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

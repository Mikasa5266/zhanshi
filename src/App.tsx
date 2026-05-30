/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCENES_DATA } from './data';
import ShaderCanvas from './components/ShaderCanvas';
import Preloader from './components/Preloader';
import CacheManager from './components/CacheManager';
import ScenicSlides from './components/ScenicSlides';
import BrandLogo from './components/BrandLogo';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Activity, 
  PhoneCall, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [userLogo, setUserLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('leming_user_logo');
    } catch {
      return null;
    }
  });

  const handleLogoChange = (newLogo: string | null) => {
    setUserLogo(newLogo);
    try {
      if (newLogo) {
        localStorage.setItem('leming_user_logo', newLogo);
      } else {
        localStorage.removeItem('leming_user_logo');
      }
    } catch (e) {
      console.error("Storage error:", e);
    }
  };
  
  const lastTransitionTime = useRef(0);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);


  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < SCENES_DATA.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  // Listeners: MouseWheel standard swipe logic
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastTransitionTime.current < 850) return; // Cooldown budget of 850ms to ensure non-linear transition curves match smoothly

    if (e.deltaY > 15) {
      nextSlide();
      lastTransitionTime.current = now;
    } else if (e.deltaY < -15) {
      prevSlide();
      lastTransitionTime.current = now;
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastTransitionTime.current < 850) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextSlide();
        lastTransitionTime.current = now;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
        lastTransitionTime.current = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Touch Swipe navigation (Horizontal and Vertical)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTransitionTime.current < 850) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = touchStartY.current - touchEndY;
    const diffX = touchStartX.current - touchEndX;

    // Use absolute differences to choose dominant direction
    if (Math.abs(diffY) > 40 && Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      lastTransitionTime.current = now;
    } else if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      lastTransitionTime.current = now;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none" id="app-root-container">
      {/* 1. Global Asset Preload Layer */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {isLoaded && (
        <div 
          className="w-full h-full relative z-15 flex flex-col justify-between"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          id="immersive-showroom"
        >
          {/* 2. Interactive GLSL Custom Shader Background (Transitions with indexed slides) */}
          <ShaderCanvas activeSlide={currentSlide} />

          {/* 3. Global Static Header (Matches PDF: Owl emblem / Wuhan / Leming Branding) */}
          <header className="fixed top-0 inset-x-0 z-30 px-6 py-4 md:px-12 md:py-5 flex items-center justify-between backdrop-blur-md bg-linear-to-b from-white/80 via-white/40 to-transparent pointer-events-auto border-b border-stone-200/10" id="main-showroom-header">
            {/* Left Column Symbol badge (Owl style insignia) */}
            <div className="flex items-center gap-3">
              <motion.div 
                onClick={() => setCurrentSlide(0)}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Wuhan Leming Tech"
              >
                <BrandLogo className="w-9 h-9" userLogo={userLogo} />
              </motion.div>
              
              <div className="select-none">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold tracking-widest text-neutral-900 font-display">迎风聚智</span>
                  <span className="text-[10px] text-red-650 font-mono font-bold tracking-tight">LEMING</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[9px] text-neutral-600 font-mono">
                  <span>中国 · 武汉</span>
                  <span>|</span>
                  <span className="text-neutral-500 font-medium">自主研发 / 国内有数 / 安全可控</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Center Menu */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-800 font-display">
              {SCENES_DATA.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative py-1.5 uppercase transition-colors hover:text-red-600 ${
                    currentSlide === idx ? 'text-red-600 font-bold' : 'text-neutral-500'
                  }`}
                >
                  {scene.subtitle.split(' · ')[0]}
                  {currentSlide === idx && (
                    <motion.div 
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-red-600"
                      layoutId="activeNavIndicator"
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Quick Action Controllers */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <CacheManager userLogo={userLogo} onLogoChange={handleLogoChange} />
              
              <button 
                onClick={() => setCurrentSlide(5)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-neutral-900 text-xs font-bold text-white transition-all shadow-sm hover:shadow-md"
                id="header-cta-btn"
              >
                <span>预约测评</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Slide controller drawer menu */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 px-2.5 bg-white hover:bg-stone-50 rounded-lg border border-stone-200 lg:hidden text-neutral-800 transition-all cursor-pointer"
                id="mobile-drawer-toggle"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* 4. Mobile Drawer Overlay Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="fixed inset-0 z-20 bg-white/98 pt-20 px-6 flex flex-col justify-start lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                id="mobile-navbar-drawer"
              >
                <div className="space-y-4 py-8">
                  <span className="text-[10px] text-neutral-500 font-mono tracking-widest block">章节索引 SHOWROOM DIRECTORY</span>
                  {SCENES_DATA.map((scene, idx) => (
                    <button
                      key={scene.id}
                      onClick={() => {
                        setCurrentSlide(idx);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2.5 border-b border-neutral-100 flex justify-between items-center"
                    >
                      <div>
                        <span className="text-sm font-extrabold text-neutral-900 block">{scene.title}</span>
                        <span className="text-xs text-neutral-500 font-mono block">{scene.subtitle}</span>
                      </div>
                      <span className={`text-xs font-mono font-bold ${currentSlide === idx ? 'text-red-650' : 'text-neutral-400'}`}>
                        0{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    setCurrentSlide(5);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-red-600 font-bold text-xs text-white text-center mt-6 shadow-md shadow-red-600/15"
                >
                  向检验中心申请免费跑分
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5. Main Fullscreen Content Viewer (Parallax scroll structure) */}
          <main className="flex-1 w-full relative z-10 flex items-center justify-center">
            <ScenicSlides activeSlide={currentSlide} userLogo={userLogo} />
          </main>

          {/* 6. Static Sticky Footer Controller */}
          <footer className="fixed bottom-0 inset-x-0 z-35 px-6 py-4 md:px-12 md:py-5 flex items-center justify-between bg-linear-to-t from-white/90 via-white/50 to-transparent pointer-events-none" id="main-showroom-footer">
            {/* Left: Dynamic Active slide coordinates indicators */}
            <div className="flex items-center gap-1.5 font-mono text-[10.5px]">
              <span className="font-bold text-red-600">0{currentSlide + 1}</span>
              <span className="text-neutral-450">/</span>
              <span className="text-neutral-400">06</span>
              <span className="hidden sm:inline text-neutral-500 ml-4 font-normal">
                {SCENES_DATA[currentSlide].englishTitle}
              </span>
            </div>

            {/* Center Swipe direction guidance indicator */}
            <div className="hidden md:flex items-center gap-1.5 text-[10.5px] font-mono text-neutral-500 tracking-wider">
              <span className="animate-bounce text-red-650 font-bold">↓</span>
              <span>滚动鼠标或滑动屏幕以深入章节</span>
            </div>

            {/* Right: Dot Navigation Indexers and Scroll Up/Down controls */}
            <div className="flex items-center gap-4 pointer-events-auto">
              <div className="flex items-center gap-1 cursor-pointer">
                {SCENES_DATA.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => setCurrentSlide(idx)}
                    className="p-1 px-1.5 focus:outline-hidden cursor-pointer"
                    title={scene.title}
                  >
                    <div className={`transition-all duration-300 rounded-full h-1.5 ${
                      currentSlide === idx ? 'w-5 bg-red-600' : 'w-1.5 bg-neutral-300 hover:bg-neutral-500'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Slider quick arrow controls */}
              <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-full p-0.5 shadow-sm">
                <button 
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-neutral-650 hover:text-red-650 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="上一章"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <div className="h-4 w-[1px] bg-stone-200" />
                <button 
                  onClick={nextSlide}
                  disabled={currentSlide === SCENES_DATA.length - 1}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-neutral-650 hover:text-red-650 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer animate-pulse"
                  title="下一章"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

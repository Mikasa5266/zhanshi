import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCENES_DATA, EXHIBIT_LIST } from './data';
import ShaderCanvas from './components/ShaderCanvas';
import Preloader from './components/Preloader';
import ScenicSlides from './components/ScenicSlides';
import BrandLogo from './components/BrandLogo';
import VideoPlayerModal from './components/VideoPlayerModal';
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Pause,
  Play
} from 'lucide-react';

const AUTOPLAY_INTERVAL = 8000;

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const autoplay = params.get('autoplay');
  const slide = params.get('slide');
  return {
    autoplay: autoplay === null ? true : autoplay !== '0' && autoplay !== 'false',
    fixedSlide: slide !== null ? Math.max(0, Math.min(parseInt(slide, 10) - 1, SCENES_DATA.length - 1)) : null,
  };
}

export default function App() {
  const urlParams = useRef(getUrlParams());
  const [currentSlide, setCurrentSlide] = useState(urlParams.current.fixedSlide ?? 0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(urlParams.current.autoplay && urlParams.current.fixedSlide === null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const [userLogo, setUserLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('leming_user_logo') || '/logo.png';
    } catch {
      return '/logo.png';
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
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = SCENES_DATA.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
    if (isAutoPlaying) {
      autoPlayTimer.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      }, AUTOPLAY_INTERVAL);
    }
  }, [isAutoPlaying, totalSlides]);

  const handlePlayVideo = useCallback(() => {
    setVideoModalOpen(true);
  }, []);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [resetAutoPlay]);

  const handleManualNav = useCallback((action: () => void) => {
    action();
    resetAutoPlay();
  }, [resetAutoPlay]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastTransitionTime.current < 850) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        handleManualNav(nextSlide);
        lastTransitionTime.current = now;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handleManualNav(prevSlide);
        lastTransitionTime.current = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleManualNav, nextSlide, prevSlide]);


  return (
    <div className="w-full h-full relative overflow-hidden select-none" id="app-root-container">
      <Preloader onComplete={() => setIsLoaded(true)} />

      {isLoaded && (
        <div
          className="w-full h-full relative z-15 flex flex-col justify-between"
          id="immersive-showroom"
        >
          <ShaderCanvas activeSlide={currentSlide} />

          {/* Header */}
          <header className="fixed top-0 inset-x-0 z-30 px-6 py-4 md:px-12 md:py-5 flex items-center justify-between backdrop-blur-md bg-linear-to-b from-white/80 via-white/40 to-transparent pointer-events-auto border-b border-stone-200/10">
            <div className="flex items-center gap-3">
              <motion.div
                onClick={() => handleManualNav(() => goToSlide(0))}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BrandLogo className="w-9 h-9" userLogo={userLogo} />
              </motion.div>

              <div className="select-none">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold tracking-widest text-neutral-900 font-display">迎风聚智</span>
                  <span className="text-[13px] text-red-650 font-mono font-bold tracking-tight">LEMING</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[13px] text-neutral-600 font-mono">
                  <span>中国 · 武汉</span>
                  <span>|</span>
                  <span className="text-neutral-500 font-medium">军民融合 / 国内首创 / 自主可控</span>
                </div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-4 text-[15px] font-semibold text-neutral-800 font-display">
              {SCENES_DATA.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => handleManualNav(() => goToSlide(idx))}
                  className={`relative py-1.5 transition-colors hover:text-red-600 cursor-pointer ${
                    currentSlide === idx ? 'text-red-600 font-bold' : 'text-neutral-500'
                  }`}
                >
                  {scene.title}
                  {currentSlide === idx && (
                    <motion.div
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-red-600"
                      layoutId="activeNavIndicator"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 pointer-events-auto">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 px-2.5 bg-white hover:bg-stone-50 rounded-lg border border-stone-200 lg:hidden text-neutral-800 transition-all cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* Mobile drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="fixed inset-0 z-20 bg-white/98 pt-20 px-6 flex flex-col justify-start lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="space-y-4 py-8">
                  <span className="text-[14px] text-neutral-500 font-mono tracking-widest block">展品索引 EXHIBIT DIRECTORY</span>
                  {SCENES_DATA.map((scene, idx) => (
                    <button
                      key={scene.id}
                      onClick={() => {
                        handleManualNav(() => goToSlide(idx));
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content */}
          <main className="flex-1 w-full relative z-10 overflow-y-auto">
            <ScenicSlides activeSlide={currentSlide} onPlayVideo={handlePlayVideo} />
          </main>

          {/* Footer */}
          <footer className="fixed bottom-0 inset-x-0 z-35 px-6 py-4 md:px-12 md:py-5 flex items-center justify-between bg-linear-to-t from-white/90 via-white/50 to-transparent pointer-events-none">
            <div className="flex items-center gap-1.5 font-mono text-[14px]">
              <span className="font-bold text-red-600">0{currentSlide + 1}</span>
              <span className="text-neutral-450">/</span>
              <span className="text-neutral-400">0{totalSlides}</span>
              <span className="hidden sm:inline text-neutral-500 ml-4 font-normal">
                {SCENES_DATA[currentSlide].englishTitle}
              </span>
            </div>


            <div className="flex items-center gap-4 pointer-events-auto">
              {/* Autoplay toggle */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-1.5 rounded-full hover:bg-white/80 text-neutral-500 hover:text-red-600 transition-all cursor-pointer"
                title={isAutoPlaying ? '暂停自动播放' : '开启自动播放'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              {/* Dot nav */}
              <div className="flex items-center gap-1 cursor-pointer">
                {SCENES_DATA.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => handleManualNav(() => goToSlide(idx))}
                    className="p-1 px-1 focus:outline-hidden cursor-pointer"
                    title={scene.title}
                  >
                    <div className={`transition-all duration-300 rounded-full h-1.5 ${
                      currentSlide === idx ? 'w-5 bg-red-600' : 'w-1.5 bg-neutral-300 hover:bg-neutral-500'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Arrow controls */}
              <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-full p-0.5 shadow-sm">
                <button
                  onClick={() => handleManualNav(prevSlide)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-neutral-650 hover:text-red-650 transition-all cursor-pointer"
                  title="上一个"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <div className="h-4 w-[1px] bg-stone-200" />
                <button
                  onClick={() => handleManualNav(nextSlide)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-neutral-650 hover:text-red-650 transition-all cursor-pointer"
                  title="下一个"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

      <VideoPlayerModal
        isOpen={videoModalOpen}
        videoUrl={EXHIBIT_LIST[currentSlide]?.videoUrl || ''}
        title={EXHIBIT_LIST[currentSlide]?.name}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
}
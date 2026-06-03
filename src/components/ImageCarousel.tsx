import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ImageIcon, X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  accentColor?: string;
  className?: string;
}

function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(5, Math.max(1, prev - e.deltaY * 0.002)));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (scale <= 1) return;
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [scale]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const handlePointerUp = useCallback(() => { dragging.current = false; }, []);

  const resetView = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button onClick={() => setScale(s => Math.min(5, s + 0.5))} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button onClick={() => { setScale(s => Math.max(1, s - 0.5)); if (scale <= 1.5) setTranslate({ x: 0, y: 0 }); }} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button onClick={resetView} className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer">
          {Math.round(scale * 100)}%
        </button>
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>
      <motion.img
        src={src}
        alt="放大预览"
        className="max-w-[90vw] max-h-[90vh] object-contain select-none"
        style={{ transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`, cursor: scale > 1 ? 'grab' : 'zoom-in' }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={(e) => { e.stopPropagation(); if (scale === 1) setScale(2); else resetView(); }}
        draggable={false}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
/* APPEND_CAROUSEL */

export default function ImageCarousel({ images, interval = 4000, accentColor = '#666', className = '' }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 text-stone-400 bg-stone-100 rounded-xl ${className}`}>
        <ImageIcon className="w-12 h-12 opacity-30" />
        <span className="text-xs font-mono opacity-60">截图待接入</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-stone-900 group ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`截图 ${current + 1}`}
          className="w-full h-full object-contain cursor-pointer"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setLightboxOpen(true)}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80"
                style={{
                  width: i === current ? '16px' : '6px',
                  backgroundColor: i === current ? accentColor : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        </>
      )}
      {lightboxOpen && createPortal(
        <ImageLightbox src={images[current]} onClose={() => setLightboxOpen(false)} />,
        document.body
      )}
    </div>
  );
}

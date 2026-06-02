import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageIcon } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  accentColor?: string;
  className?: string;
}

export default function ImageCarousel({ images, interval = 4000, accentColor = '#666', className = '' }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

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
    <div className={`relative overflow-hidden rounded-xl bg-stone-100 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`截图 ${current + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === current ? '16px' : '6px',
                backgroundColor: i === current ? accentColor : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

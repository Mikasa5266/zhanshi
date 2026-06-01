import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXHIBIT_LIST } from '../data';
import { SLIDE_LAYOUTS } from './slides';

interface ScenicSlidesProps {
  activeSlide: number;
  onVideoEnd?: () => void;
}

export default function ScenicSlides({ activeSlide, onVideoEnd }: ScenicSlidesProps) {
  const exhibit = EXHIBIT_LIST[activeSlide];
  if (!exhibit) return null;

  const LayoutComponent = SLIDE_LAYOUTS[activeSlide];
  if (!LayoutComponent) return null;

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" id="scenic-canvas-content">
      <AnimatePresence mode="wait">
        <motion.div
          key={`slide-${activeSlide}`}
          className="w-full h-full flex flex-col items-center justify-center px-4 md:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <LayoutComponent exhibit={exhibit} slideIndex={activeSlide} onVideoEnd={onVideoEnd} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

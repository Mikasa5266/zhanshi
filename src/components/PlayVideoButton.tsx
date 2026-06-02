import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface PlayVideoButtonProps {
  label: string;
  accentColor: string;
  onClick: () => void;
}

export default function PlayVideoButton({ label, accentColor, onClick }: PlayVideoButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all hover:scale-105 active:scale-95"
      style={{
        borderColor: `${accentColor}40`,
        backgroundColor: `${accentColor}08`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ backgroundColor: `${accentColor}15` }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{ backgroundColor: accentColor }}
      >
        <Play className="w-3.5 h-3.5 text-white ml-0.5" fill="white" />
      </div>
      <span className="text-[14px] font-bold" style={{ color: accentColor }}>
        {label}
      </span>
    </motion.button>
  );
}

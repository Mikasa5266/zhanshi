import React from 'react';
import { motion } from 'motion/react';
import {
  Building2, FileCheck, Target, Shield, Sparkles, Code2, ListChecks,
  Zap, Timer, Replace, Monitor, BarChart3, Database, Play, Award,
  ShieldCheck, Layers, Lock, Cpu, HardDriveDownload, RotateCcw, Gauge,
  Laptop, Bot, TestTube2, FileText, Eye,
  Microscope, Cloud, BrainCircuit, ClipboardCheck, Server, BadgeCheck,
  GitBranch, CheckCircle, FileOutput, Users, MonitorPlay, FileBarChart,
  Trophy, Wrench, ScrollText, Workflow,
  Waves, AlertTriangle, Activity, Box, Droplets
} from 'lucide-react';
import { ExhibitItem } from '../../types';

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, FileCheck, Target, Shield, Sparkles, Code2, ListChecks,
  Zap, Timer, Replace, Monitor, BarChart3, Database, Play, Award,
  ShieldCheck, Layers, Lock, Cpu, HardDriveDownload, RotateCcw, Gauge,
  Laptop, Bot, TestTube2, FileText, Eye,
  Microscope, Cloud, BrainCircuit, ClipboardCheck, Server, BadgeCheck,
  GitBranch, CheckCircle, FileOutput, Users, MonitorPlay, FileBarChart,
  Trophy, Wrench, ScrollText, Workflow,
  Waves, AlertTriangle, Activity, Box, Droplets
};

export interface SlideLayoutProps {
  exhibit: ExhibitItem;
  slideIndex: number;
  onVideoEnd?: () => void;
  onPlayVideo?: () => void;
}

export function KeywordCard({ icon, label, sublabel, delay, accentColor }: {
  icon: string; label: string; sublabel: string; delay: number; accentColor: string;
}) {
  const IconComponent = ICON_MAP[icon];
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md border border-stone-200/90 rounded-xl p-3 md:p-4 shadow-xs flex items-center gap-3 min-w-[140px] max-w-[200px]"
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.2 + delay * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, y: -3, boxShadow: '0 8px 25px -5px rgba(0,0,0,0.1)' }}
    >
      <motion.div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: delay * 0.3 }}
      >
        {IconComponent && <IconComponent className="w-4.5 h-4.5" />}
      </motion.div>
      <div className="min-w-0">
        <span className="text-sm font-bold text-neutral-900 block truncate">{label}</span>
        <span className="text-[14px] text-stone-500 block truncate">{sublabel}</span>
      </div>
    </motion.div>
  );
}

export function SlideFooter({ name, subtitle, englishTag }: {
  name: string; subtitle: string; englishTag: string;
}) {
  return (
    <motion.div
      className="mt-5 md:mt-8 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-display">
        {name}
      </h2>
      <p className="text-xs md:text-sm text-stone-600 mt-1 font-sans">
        {subtitle}
      </p>
      <span className="text-[13px] md:text-[14px] font-mono text-stone-400 tracking-widest mt-1 block">
        {englishTag}
      </span>
    </motion.div>
  );
}

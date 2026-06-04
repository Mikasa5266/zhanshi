import React from 'react';
import { motion } from 'motion/react';
import { SlideLayoutProps } from './SlideLayout';
import { Building2, MapPin, Calendar, Users } from 'lucide-react';

export default function CompanyProfileLayout({ exhibit }: SlideLayoutProps) {
  return (
    <section className="relative flex w-full max-w-5xl flex-col items-center gap-8">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.04] blur-[80px]"
        style={{ backgroundColor: exhibit.accentColor }}
      />

      <motion.header
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3 py-1 font-mono text-[10px] tracking-[0.25em] text-stone-500 shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: exhibit.accentColor }} />
          {exhibit.englishTag}
        </div>
        <h2 className="font-display text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">
          {exhibit.name}
        </h2>
        <p className="mt-2 max-w-lg text-sm font-medium text-stone-500">
          {exhibit.subtitle}
        </p>
      </motion.header>

      {/* Placeholder content with scroll animation */}
      <motion.div
        className="w-full rounded-2xl border border-stone-200/60 bg-white/70 p-8 md:p-12 backdrop-blur-sm shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { icon: Building2, label: '武汉迎风聚智科技', sub: '国家高新技术企业' },
              { icon: Calendar, label: '成立于2013年', sub: '十余年技术深耕' },
              { icon: MapPin, label: '中国 · 武汉', sub: '光谷核心区域' },
              { icon: Users, label: '专业团队', sub: '硕博占比60%+' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2 rounded-xl border border-stone-100 bg-white/90 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${exhibit.accentColor}12`, color: exhibit.accentColor }}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-neutral-800">{item.label}</span>
                <span className="text-xs text-stone-500">{item.sub}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-4 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50/50 px-8 py-12 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-stone-400 font-medium text-sm">公司详细介绍内容待补充</p>
            <p className="text-stone-300 text-xs mt-1 font-mono">CONTENT COMING SOON</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { SlideLayoutProps } from './SlideLayout';
import ImageCarousel from '../ImageCarousel';
import PlayVideoButton from '../PlayVideoButton';

const SOURCE_CODE_LINES = [
  'def parse_requirement(doc):',
  '    tokens = nlp.tokenize(doc)',
  '    return extract_cases(tokens)',
  'class TestGenerator:',
  '    model = "deepseek-v3"',
  '    def generate(self, req):',
  '        prompt = build_prompt(req)',
  '        return self.llm(prompt)',
  'for spec in requirements:',
  '    cases = gen.generate(spec)',
];

const OUTPUT_CODE_LINES = [
  'def test_login_success():',
  '    assert resp.status == 200',
  'def test_invalid_input():',
  '    assert raises(ValueError)',
  '@pytest.mark.parametrize',
  'def test_boundary(val):',
  '    assert validate(val) == True',
  'def test_concurrent_access():',
  '    results = parallel_run(8)',
  '    assert all(r.ok for r in results)',
];

export default function AITestGenLayout({ exhibit, onPlayVideo }: SlideLayoutProps) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      {/* Floating keyword tags - top area */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {exhibit.keywords.map((kw, i) => (
          <motion.span
            key={i}
            className="text-[14px] md:text-[15px] font-medium px-2.5 py-1 rounded-full font-mono"
            style={{ color: exhibit.accentColor, backgroundColor: `${exhibit.accentColor}10` }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {kw.label}
          </motion.span>
        ))}
      </motion.div>

      {/* Main content area with code streams flanking video */}
      <div className="relative flex items-stretch justify-center w-full max-w-6xl gap-0">
        {/* Left code stream - source/requirements */}
        <motion.div
          className="hidden md:flex flex-col gap-1 w-[160px] shrink-0 overflow-hidden relative self-stretch"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/80 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent z-10" />
          <motion.div
            className="flex flex-col gap-1.5"
            animate={{ y: [0, -60, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            {[...SOURCE_CODE_LINES, ...SOURCE_CODE_LINES].map((line, i) => (
              <motion.div
                key={i}
                className="text-[12px] font-mono whitespace-nowrap text-right pr-3"
                style={{ color: exhibit.accentColor, opacity: 0.35 + (i % 3) * 0.1 }}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Video wrapper with HUD frame */}
        <div className="relative flex-1 max-w-4xl">
          {/* HUD outer frame - slightly larger than video */}
          <motion.div
            className="absolute -inset-2.5 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-xl" style={{ borderColor: `${exhibit.accentColor}50` }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-xl" style={{ borderColor: `${exhibit.accentColor}50` }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-xl" style={{ borderColor: `${exhibit.accentColor}50` }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-xl" style={{ borderColor: `${exhibit.accentColor}50` }} />
          </motion.div>

          {/* Screenshot Carousel */}
          <motion.div
            className="relative w-full aspect-video rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageCarousel
              images={exhibit.screenshots || []}
              accentColor={exhibit.accentColor}
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* Right code stream - generated test cases */}
        <motion.div
          className="hidden md:flex flex-col gap-1 w-[160px] shrink-0 overflow-hidden relative self-stretch"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/80 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent z-10" />
          <motion.div
            className="flex flex-col gap-1.5"
            animate={{ y: [-60, 0, -60] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          >
            {[...OUTPUT_CODE_LINES, ...OUTPUT_CODE_LINES].map((line, i) => (
              <motion.div
                key={i}
                className="text-[12px] font-mono whitespace-nowrap pl-3"
                style={{ color: '#16a34a', opacity: 0.35 + (i % 3) * 0.1 }}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom flow line: 需求 → AI → 用例 */}
      <motion.div
        className="flex items-center justify-center gap-0 mt-4 w-full max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="text-[14px] font-mono text-stone-500 shrink-0">需求输入</span>
        {/* Animated flow line */}
        <div className="flex-1 mx-3 h-[2px] relative overflow-hidden rounded-full" style={{ backgroundColor: `${exhibit.accentColor}20` }}>
          <motion.div
            className="absolute top-0 left-0 h-full w-8 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${exhibit.accentColor}, transparent)` }}
            animate={{ x: ['-32px', '200px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <motion.span
          className="text-[15px] font-bold font-mono shrink-0 px-2 py-0.5 rounded-md"
          style={{ color: exhibit.accentColor, backgroundColor: `${exhibit.accentColor}12` }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI
        </motion.span>
        <div className="flex-1 mx-3 h-[2px] relative overflow-hidden rounded-full" style={{ backgroundColor: `${exhibit.accentColor}20` }}>
          <motion.div
            className="absolute top-0 left-0 h-full w-8 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, #16a34a, transparent)` }}
            animate={{ x: ['-32px', '200px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
          />
        </div>
        <span className="text-[14px] font-mono text-green-600 shrink-0">用例输出</span>
      </motion.div>

      {/* Title at bottom */}
      <motion.div
        className="text-center mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-base md:text-xl font-extrabold text-neutral-900 tracking-tight font-display">
          {exhibit.name}
        </h2>
        <span className="text-[13px] font-mono text-stone-400 tracking-widest">{exhibit.englishTag}</span>
      </motion.div>

      {/* Play video button */}
      {exhibit.videoUrl && (
        <div className="mt-3">
          <PlayVideoButton
            label={exhibit.videoLabel || `一分钟看懂 ${exhibit.name}`}
            accentColor={exhibit.accentColor}
            onClick={() => onPlayVideo?.()}
          />
        </div>
      )}
    </div>
  );
}

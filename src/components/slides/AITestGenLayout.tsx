import React from 'react';
import { motion } from 'motion/react';
import { SlideLayoutProps, ICON_MAP } from './SlideLayout';
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
      {/* Decorative code streams - left */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 hidden lg:flex flex-col gap-1 w-[120px] overflow-hidden opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/90 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/90 to-transparent z-10" />
        <motion.div
          className="flex flex-col gap-1.5 pt-16"
          animate={{ y: [0, -60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          {[...SOURCE_CODE_LINES, ...SOURCE_CODE_LINES].map((line, i) => (
            <div
              key={i}
              className="text-[11px] font-mono whitespace-nowrap text-right pr-3"
              style={{ color: exhibit.accentColor }}
            >
              {line}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Decorative code streams - right */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 hidden lg:flex flex-col gap-1 w-[120px] overflow-hidden opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/90 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/90 to-transparent z-10" />
        <motion.div
          className="flex flex-col gap-1.5 pt-16"
          animate={{ y: [-60, 0, -60] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          {[...OUTPUT_CODE_LINES, ...OUTPUT_CODE_LINES].map((line, i) => (
            <div
              key={i}
              className="text-[11px] font-mono whitespace-nowrap pl-3"
              style={{ color: '#991b1b' }}
            >
              {line}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {exhibit.keywords.map((kw, i) => (
              <motion.span
                key={i}
                className="text-[13px] font-medium px-2 py-0.5 rounded-full font-mono"
                style={{ color: exhibit.accentColor, backgroundColor: `${exhibit.accentColor}10` }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {kw.label}
              </motion.span>
            ))}
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight font-display">
            {exhibit.name}
          </h2>
        </motion.div>

        {/* Two-column: highlights + screenshot */}
        <div className="flex w-full gap-5 items-stretch">
          {/* Left: Description + Highlights */}
          <motion.div
            className="flex-1 flex flex-col gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Description */}
            <p className="text-[14px] text-stone-600 leading-relaxed">
              {exhibit.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-col gap-2">
              {exhibit.highlights?.map((hl, i) => {
                const IconComponent = ICON_MAP[hl.icon];
                return (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2.5 bg-white/80 border border-stone-200/80 rounded-xl px-3 py-2.5"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${exhibit.accentColor}12`, color: exhibit.accentColor }}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[14px] font-bold text-neutral-900 block">{hl.title}</span>
                      <span className="text-[13px] text-stone-500">{hl.desc}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Screenshot carousel (smaller) */}
          <motion.div
            className="w-[45%] shrink-0 hidden md:flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative flex-1 rounded-xl overflow-hidden border border-stone-200/80">
              {/* HUD corners */}
              <div className="absolute -inset-1 rounded-xl pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: `${exhibit.accentColor}40` }} />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: `${exhibit.accentColor}40` }} />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: `${exhibit.accentColor}40` }} />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: `${exhibit.accentColor}40` }} />
              </div>
              <ImageCarousel
                images={exhibit.screenshots || []}
                accentColor={exhibit.accentColor}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom flow line: 需求 → AI → 用例 */}
        <motion.div
          className="flex items-center justify-center gap-0 mt-4 w-full max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span className="text-[13px] font-mono text-stone-500 shrink-0">需求输入</span>
          <div className="flex-1 mx-3 h-[2px] relative overflow-hidden rounded-full" style={{ backgroundColor: `${exhibit.accentColor}20` }}>
            <motion.div
              className="absolute top-0 left-0 h-full w-8 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${exhibit.accentColor}, transparent)` }}
              animate={{ x: ['-32px', '200px'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <motion.span
            className="text-[14px] font-bold font-mono shrink-0 px-2 py-0.5 rounded-md"
            style={{ color: exhibit.accentColor, backgroundColor: `${exhibit.accentColor}12` }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AI
          </motion.span>
          <div className="flex-1 mx-3 h-[2px] relative overflow-hidden rounded-full" style={{ backgroundColor: `${exhibit.accentColor}20` }}>
            <motion.div
              className="absolute top-0 left-0 h-full w-8 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${exhibit.accentColor}, transparent)` }}
              animate={{ x: ['-32px', '200px'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
            />
          </div>
          <span className="text-[13px] font-mono shrink-0" style={{ color: exhibit.accentColor }}>用例输出</span>
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
    </div>
  );
}

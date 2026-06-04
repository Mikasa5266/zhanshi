import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideLayoutProps } from './SlideLayout';
import { X } from 'lucide-react';

interface HonorItem {
  id: string;
  label: string;
  category: string;
  image: string;
}

const HONORS_DATA: HonorItem[] = [
  // 资质认证
  { id: 'ZZ-2023-1', label: 'CNAS实验室认可证书', category: '资质认证', image: '/rongyu/qualification/ZZ-2023-1.jpg' },
  { id: 'ZZ-2021-2', label: '检验检测机构资质认定证书(CMA)', category: '资质认证', image: '/rongyu/qualification/ZZ-2021-2_p01.jpg' },
  { id: 'ZZ-2023-7', label: 'ISO9001质量管理体系认证', category: '资质认证', image: '/rongyu/qualification/ZZ-2023-7_p00.jpg' },
  { id: 'ZZ-2024-3', label: '湖北省军民融合企业', category: '资质认证', image: '/rongyu/qualification/ZZ-2024-3.jpg' },
  { id: 'ZZ-2023-9', label: '武汉市军民融合单位', category: '资质认证', image: '/rongyu/qualification/ZZ-2023-9_p00.jpg' },
  { id: 'ZZ-2019-3', label: '国产基础软硬件检验检测工程研究中心', category: '资质认证', image: '/rongyu/qualification/ZZ-2019-3_p01.jpg' },
  { id: 'ZZ-2019-01', label: '湖北省军民科技协同创新平台工作站', category: '资质认证', image: '/rongyu/qualification/ZZ-2019-01.jpg' },
  { id: 'ZZ-2020-5', label: '信创工委会会员单位', category: '资质认证', image: '/rongyu/qualification/ZZ-2020-5.jpg' },
  { id: 'ZZ-2017-2', label: '武汉市大数据企业', category: '资质认证', image: '/rongyu/qualification/ZZ-2017-2_p01.jpg' },
  // 荣誉奖项
  { id: 'RY-2021-1', label: '中小企业创新奖', category: '荣誉奖项', image: '/rongyu/award/RY-2021-1.jpg' },
  // 发明专利（精选）
  { id: 'ZSCQ-2014-4', label: '发明专利·魔方加密和解密方法', category: '发明专利', image: '/rongyu/patent/ZSCQ-2014-4_cover.jpg' },
  { id: 'ZSCQ-2019-9', label: '发明专利·TPC-DS测试方法', category: '发明专利', image: '/rongyu/patent/ZSCQ-2019-9.jpg' },
  { id: 'ZSCQ-2019-37', label: '发明专利·TPC-E自动化测试', category: '发明专利', image: '/rongyu/patent/ZSCQ-2019-31.jpg' },
  { id: 'ZSCQ-2020-5', label: '发明专利·数据库接口符合性测试', category: '发明专利', image: '/rongyu/patent/ZSCQ-2020-5.jpg' },
  { id: 'ZSCQ-2022-6', label: '发明专利·数据处理方法', category: '发明专利', image: '/rongyu/patent/ZSCQ-2022-6.png' },
  { id: 'ZSCQ-2022-12', label: '发明专利·网关性能测试方法', category: '发明专利', image: '/rongyu/patent/ZSCQ-2022-12_p00.png' },
  // 商标
  { id: 'ZSCQ-2021-5', label: '商标·WebRunner', category: '商标注册', image: '/rongyu/trademark/ZSCQ-2021-5.jpg' },
  { id: 'ZSCQ-2021-10', label: '商标·WebRunner(9类)', category: '商标注册', image: '/rongyu/trademark/ZSCQ-2021-10.png' },
  { id: 'ZSCQ-2021-8', label: '商标·GUIRunner', category: '商标注册', image: '/rongyu/trademark/ZSCQ-2021-8.jpg' },
  { id: 'ZSCQ-2020-4', label: '商标·勒名', category: '商标注册', image: '/rongyu/trademark/ZSCQ-2020-4.jpg' },
];

const CARD_WIDTH = 320;
const CARD_GAP = 24;

function HonorCard({ item, onClick }: { item: HonorItem; onClick: () => void }) {
  return (
    <div
      className="flex-shrink-0 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <img
        src={item.image}
        alt={item.label}
        className="h-[380px] md:h-[440px] w-auto block transition-all duration-500 group-hover:scale-105 [filter:drop-shadow(0_4px_12px_rgba(0,0,0,0.2))] group-hover:[filter:drop-shadow(0_8px_20px_rgba(0,0,0,0.3))]"
        loading="lazy"
      />
    </div>
  );
}

export default function HonorsLayout({ exhibit }: SlideLayoutProps) {
  const [lightboxImg, setLightboxImg] = useState<HonorItem | null>(null);
  const items = HONORS_DATA;
  const duplicated = [...items, ...items];

  return (
    <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.04] blur-[80px]"
        style={{ backgroundColor: exhibit.accentColor }}
      />

      <motion.header
        className="flex flex-col items-center text-center pt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
          {exhibit.name}
        </h2>
        <div className="mt-3 flex items-center gap-4 text-xs font-medium text-stone-400">
          <span>资质认证 9项</span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span>发明专利 20项</span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span>软件著作权 40+</span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span>商标 11项</span>
        </div>
      </motion.header>

      {/* Horizontal infinite scroll carousel */}
      <motion.div
        className="w-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 will-change-transform"
            style={{ transform: 'translateZ(0)' }}
            animate={{ x: [0, -(items.length * (CARD_WIDTH + CARD_GAP))] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 45,
                ease: 'linear',
              },
            }}
          >
            {duplicated.map((item, i) => (
              <HonorCard key={`${item.id}-${i}`} item={item} onClick={() => setLightboxImg(item)} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              className="relative max-w-[85vw] max-h-[85vh] rounded-2xl overflow-hidden bg-white shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImg.image}
                alt={lightboxImg.label}
                className="max-w-[85vw] max-h-[78vh] object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 px-5 py-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-bold text-sm">{lightboxImg.label}</p>
                <p className="text-white/70 text-xs">{lightboxImg.category}</p>
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

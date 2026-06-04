import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideLayoutProps } from './SlideLayout';
import { Building2, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';

export default function CompanyProfileLayout({ exhibit }: SlideLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <h2 className="font-display text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">
          {exhibit.name}
        </h2>
        <p className="mt-2 max-w-lg text-sm font-medium text-stone-500">
          {exhibit.subtitle}
        </p>
      </motion.header>

      <motion.div
        className="w-full rounded-2xl border border-stone-200/60 bg-white/70 p-8 md:p-12 backdrop-blur-sm shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-6">
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

          {/* Company Introduction */}
          <motion.div
            className="mt-4 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-white/90">
              {/* Preview Section */}
              <div className="px-8 py-6">
                <p className="text-neutral-800 leading-relaxed text-[15px]">
                  武汉迎风聚智科技有限公司成立于2013年，是一家专注于计算机软硬件检验检测技术的国家高新技术企业。公司秉承"军民融合、国内首创、自主可控"的发展理念，致力于为国家信息技术产业的安全可靠发展提供核心技术支撑。经过十余年的技术积累与市场深耕，迎风聚智已发展成为国内领先的软件测试工具研发企业和专业测试服务提供商...
                </p>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-stone-100 px-8 py-6 space-y-6 text-neutral-700 leading-relaxed text-[15px]">
                      <div>
                        <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                          <span className="h-1 w-8 rounded" style={{ backgroundColor: exhibit.accentColor }} />
                          深厚的技术积淀与创新能力
                        </h3>
                        <p>
                          公司拥有50余项知识产权，其中发明专利27项，主导制订了《数据库基准测试通用技术规范》国家标准和《侵权假冒商品取证执法数据测试基准技术规范》团体标准。作为国内唯一自主研发数据库基准测试工具的制造商，迎风聚智在数据库性能测试、系统可靠性评估、云原生质量保障等领域处于行业领先地位。公司研发面积达6893.41平方米，设有服务器机房、技术研究区、检测实验区等完善的研发设施，为技术创新提供了坚实的硬件保障。
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                          <span className="h-1 w-8 rounded" style={{ backgroundColor: exhibit.accentColor }} />
                          权威的资质认证与行业认可
                        </h3>
                        <p>
                          迎风聚智已通过ISO9001质量管理体系、GJB 9001C军工质量管理体系、ISO27001信息安全管理体系等多项权威认证，获得了CMA（国家认证认可监督管理委员会检验检测机构）和CNAS（中国合格评定国家认可委员会实验室认可证书）资质，并具备军工保密资质。公司达到CMMI Maturity Level 3成熟度等级，荣获湖北省科技进步奖二等奖、湖北省中小企业创新奖等重要荣誉。这些资质与荣誉不仅是对公司技术实力的肯定，更为客户提供了可信赖的服务保障。
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                          <span className="h-1 w-8 rounded" style={{ backgroundColor: exhibit.accentColor }} />
                          完善的产品矩阵与解决方案
                        </h3>
                        <p>
                          公司构建了覆盖测试全生命周期的产品体系，包括WebRunner性能测试工具（国产替代LoadRunner）、GUIRunner客户端自动化测试工具、ReliRunner可靠性测试平台、数据库基准测试工具（TPC-E、TPC-DS）、数据质量分析平台（DQA）等核心产品。特别值得一提的是AgentRunner智体平台，这是面向高标准软件测试领域的下一代智能测试自动化平台，以AI智能体为核心驱动，实现从测试设计、脚本生成、安全执行到标准文档输出的端到端全自动化，能够自动生成完全符合GJB438C等军用标准的全套测试文档，全面支持国产软硬件栈。
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                          <span className="h-1 w-8 rounded" style={{ backgroundColor: exhibit.accentColor }} />
                          承担国家重大科研项目
                        </h3>
                        <p>
                          迎风聚智承担了37项国家级、省部级科研开发项目，包括《大型通用数据库管理系统套件研发及产业化》《军用数据库管理系统》《基于国产基础软件的自主软件测试工具》《自主可控智能云测试平台》等重大项目，以及多项国家自然科学基金项目。公司建有8个省级以上研发平台，包括湖北省校企共建数据库管理技术研发中心、国产基础软硬件检验检测及标准化工程中心、军民科技协同创新平台等，形成了强大的产学研协同创新体系。
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                          <span className="h-1 w-8 rounded" style={{ backgroundColor: exhibit.accentColor }} />
                          丰富的服务经验与客户积累
                        </h3>
                        <p>
                          最近五年，公司对外提供测试服务超过120次，累计测试系统超过300个，积累测试经验数据2万多条。服务对象涵盖军工科研院所、互联网/云服务提供商、软硬件开发商、测试机构以及金融、政务、医疗、智能制造等多个行业领域。公司为客户提供数据库测评、系统测评、系统自动化测试、智能装备测试、大模型场景开发、系统整体安全可靠保障、自主可控开发测试能力建设等全方位的专业服务。
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                          <span className="h-1 w-8 rounded" style={{ backgroundColor: exhibit.accentColor }} />
                          面向未来的战略布局
                        </h3>
                        <p>
                          面对全球智能测试市场的快速增长（预计2027年规模突破800亿美元，中国市场超过1000亿元人民币），迎风聚智正积极推进从产品型公司向工具+数据+AI驱动的平台化公司转型。公司推出的智能云测试平台，结合测试工具、数据观测与AI技术，为用户提供更智能、更高效的系统故障发现和优化服务，实现自动故障发现、根因分析、异常检测、自动化报告生成等AI驱动能力。同时，公司开发的系统可靠性评估大模型一体机，深度融合DeepSeek与WebRunner、混沌工程和统一可观测平台，将传统测试工具从"被动验证工具"升级为"主动优化引擎"，为局域网用户提供私有化部署支持。
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100">
                        <p className="text-sm text-stone-600 italic">
                          "物勒工名，以考其诚，工有不当,必行其罪，以究其情。"这是迎风聚智始终坚守的企业文化。我们相信，只有将工匠精神深深镌刻在每一行代码、每一个产品中，才能为国家信息技术产业的安全可靠发展提供坚实的技术保障。面向未来，迎风聚智将继续秉承创新、专业、可靠的理念，为推动中国软件测试行业的高质量发展贡献更大的力量。
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand/Collapse Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative w-full border-t border-stone-200 bg-gradient-to-b from-white/50 to-stone-50/80 px-8 py-4 transition-all hover:from-white/80 hover:to-stone-50"
                style={{
                  boxShadow: isExpanded ? 'inset 0 1px 0 0 rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-stone-600 group-hover:text-neutral-900 transition-colors">
                  <span>{isExpanded ? '收起详细介绍' : '了解更多详情'}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </div>
                {!isExpanded && (
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"
                    style={{ color: exhibit.accentColor }}
                  />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

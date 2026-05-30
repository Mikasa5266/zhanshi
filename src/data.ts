/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SlideData, ProductItem, PartnerItem, ProjectItem } from './types';

export const SCENES_DATA: SlideData[] = [
  {
    id: 0,
    title: "迎风聚智",
    subtitle: "数智启航 · 自主可控",
    englishTitle: "WIND GATHER INTELLIGENCE",
    tagline: "军民融合 / 国内首创 / 基础软件检验检测先锋",
    description: "武汉迎风聚智科技有限公司创立于2013年，深耕计算机软硬件检验检测核心技术，构建专业全场景自动化测试及安全可靠保障解决方案。",
    accentColor: "#c20a0a", // Crimson red from PDF
    themeColor: "from-red-950 via-neutral-950 to-neutral-950"
  },
  {
    id: 1,
    title: "全自主检验检测",
    subtitle: "全景产品矩阵 · 质量筑底",
    englishTitle: "PRODUCT CONSTELLATION",
    tagline: "覆盖系统整体质量保障，打造高标替代方案",
    description: "提供面向协议、性能、可靠性、安全的一体化测试套件，帮助核心信息系统实现全维度的深度健康体检。",
    accentColor: "#e61919",
    themeColor: "from-neutral-900 via-zinc-950 to-neutral-950"
  },
  {
    id: 2,
    title: "AgentRunner 智体平台",
    subtitle: "大模型智能体 · 敏捷协同",
    englishTitle: "AI AGENT-DRIVEN COLLABORATION",
    tagline: "引领高标准军工与重大系统测试流程变革",
    description: "以AI Agent为核心，实现从测试用例自动录制、脚本智能校准、无痕执行到完全符合GJB438C军标要求的文档自动化输出。",
    accentColor: "#06b6d4", // Tech Cyan highlights
    themeColor: "from-slate-950 via-zinc-950 to-neutral-950"
  },
  {
    id: 3,
    title: "国产化创新替代",
    subtitle: "对标国外一流 · 突破硬核垄断",
    englishTitle: "DOMESTIC REPLACEMENT ENGINE",
    tagline: "WebRunner 实现对国外 LoadRunner 的全功能替代",
    description: "作为国内极少数承担国家重大专项的软硬件测试工具生产单位，我们秉持‘物勒工名’的匠心，以100%自主可控源码捍卫国家及军工安全。",
    accentColor: "#cc1111",
    themeColor: "from-red-950 via-zinc-950 to-neutral-950"
  },
  {
    id: 4,
    title: "国之重器 · 荣誉资质",
    subtitle: "37项国家级重大项目 · 国家认可",
    englishTitle: "NATIONAL DEFENSE & COMPLIANCE",
    tagline: "获得工信部、中国评测等国家级权威机构全面评测肯定",
    description: "拥有知识产权50余项，发明专利27项。主导制订了《数据库基准测试通用技术规范》等行业及国家标准，全省仅15家获此殊荣。",
    accentColor: "#b20808",
    themeColor: "from-zinc-950 to-neutral-950"
  },
  {
    id: 5,
    title: "协同生态 · 软件医院",
    subtitle: "多维共治 · 鼎力相助",
    englishTitle: "COOPERATIVE ECOSYSTEM",
    tagline: "服务军工、测评、企业和政府四方，智胜未来",
    description: "为航天、中船、工信、海关及中国人民银行提供包含‘体检、诊治、保健’在内的全栈保姆式服务。欢迎与我们共同搭建软件质量坚实长城。",
    accentColor: "#e11d48",
    themeColor: "from-stone-900 via-neutral-950 to-stone-950"
  }
];

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: "webrunner",
    name: "WebRunner",
    type: "Web应用性能测试",
    specs: "超高并发、微秒级响应延迟分析",
    desc: "对标国外主流 LoadRunner。支撑超大规模系统性能压力测量，在功能、可靠性及自主可控度上均通过国家级权威认证。",
    toolName: "WebRunner 性能引擎",
    metrics: { accuracy: 99.8, speedUp: 12, reliability: 99.99 }
  },
  {
    id: "relirunner",
    name: "ReliRunner",
    type: "可靠性测试与混沌工程",
    specs: "软硬件故障强力注入、微服务弹性剖析",
    desc: "专为高可靠军民融合系统设计，通过主动注入网络、磁盘及CPU级别延迟或故障，自动化评估系统的高可用保障系数。",
    toolName: "ReliRunner 混沌注入器",
    metrics: { accuracy: 99.5, speedUp: 8, reliability: 99.95 }
  },
  {
    id: "apirunner",
    name: "APIRunner",
    type: "接口与协议检验平台",
    specs: "多格式报文拼装、无码全链路验证",
    desc: "支持海量协议及复杂多级依赖测试，提供流式交互配置与实时质量断言仪表盘，缩短产品上线集成验证期。",
    toolName: "APIRunner 协同台",
    metrics: { accuracy: 100, speedUp: 15, reliability: 99.9 }
  },
  {
    id: "deeprunner",
    name: "DeepRunner",
    type: "大模型测试与质量评估",
    specs: "基于幻觉分析、安全边界评测、大模型一体机",
    desc: "深度融合先进智能算法与多环境观测，对大模型和企业智能应用系统进行安全性、合规性、可解释性的一体化评测。",
    toolName: "DeepRunner 智能评估器",
    metrics: { accuracy: 98.7, speedUp: 20, reliability: 99.8 }
  },
  {
    id: "servercloud",
    name: "ServerCloud",
    type: "服务器及数据库性能云",
    specs: "TPC-E、TPC-DS 基准数据一键适配",
    desc: "国内唯一生产基础软硬件基准测试工具的制造商。自动适配国产芯片、适配麒麟与统信操作系统，一键跑通标准化性能验证。",
    toolName: "ServerCloud 基准跑分",
    metrics: { accuracy: 99.9, speedUp: 18, reliability: 99.98 }
  }
];

export const PARTNERS_LIST: PartnerItem[] = [
  {
    name: "航天科工二院七〇六所",
    logo: "CASIC",
    type: "military",
    details: "为军工单位提供高安全、高可信自主可控测试工具支撑，保障核心业务平稳健壮运行。"
  },
  {
    name: "电科集团第二十八研究所",
    logo: "CETC",
    type: "military",
    details: "联合开发战术与指控系统软件基准检验平台，确保军工项目100%全覆盖深度检测。"
  },
  {
    name: "中国软件评测中心",
    logo: "CSTC",
    type: "testing",
    details: "深度参与国家信创测试标准的研制，提供核心产品性能仿真测试引擎作为测试基准。"
  },
  {
    name: "中国信息通信研究院",
    logo: "CAICT",
    type: "testing",
    details: "基于信创适配平台实施国产替代验证，获得国家数据库标委会推荐，提供基准检验测试。"
  },
  {
    name: "阿里巴巴 / 阿里云效",
    logo: "ALIBABA",
    type: "enterprise",
    details: "在云计算、分布式数据库等领域，针对新型微服务集群实施弹性可观测性混沌工程深度联调。"
  },
  {
    name: "中兴通讯 / 中兴金篆",
    logo: "ZTE",
    type: "enterprise",
    details: "服务于国产高性能分布式数据库 GoldenDB 的承压能力、事务ACID特性与数据同步性能评测。"
  },
  {
    name: "海关总署 / 交通运输部",
    logo: "GOVT",
    type: "government",
    details: "为国家级枢纽软硬件系统升级提供‘第三方客观公正缺陷检测’一站式保姆守护服务。"
  },
  {
    name: "中国人民银行总行",
    logo: "PBOC",
    type: "government",
    details: "在金融基础软硬件适配工程中，针对多源数据库展开高并发性能压测及可靠性容灾评估。"
  }
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    title: "《大型通用数据库管理系统套件研发及产业化》",
    category: "国家重大科技专项",
    client: "国家科技部",
    status: "圆满验收 / 填补国内空白"
  },
  {
    title: "《基于国产基础软件的自主软件测试工具研发》",
    category: "装备自主可控计划",
    client: "装备发展部",
    status: "优秀评级 / 获得总装校准认定"
  },
  {
    title: "《基础软件兼容性与符合性测试技术开发》",
    category: "工信部技术改造攻关项目",
    client: "工信部",
    status: "在研推进 / 国产替代排名第一"
  },
  {
    title: "《空天信创与舰载环境性能适配检测云平台》",
    category: "军民两用联合研究课题",
    client: "国家科学基金会",
    status: "成果转化 / 核心军品搭载"
  }
];

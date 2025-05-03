"use client";
import Link from "next/link";

const CATEGORIES = [
  {
    name: "电感式接近开关",
    en: "Inductive Proximity Sensors",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#0052D9"
          strokeWidth="3"
          fill="#F5F7FA"
        />
        <circle
          cx="24"
          cy="24"
          r="10"
          stroke="#0052D9"
          strokeWidth="2"
          fill="white"
        />
        <path
          d="M24 6v8M24 40v8M6 24h8M40 24h8"
          stroke="#0052D9"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    href: "/products/电感式接近开关",
    subcategories: [
      "超小型",
      "标准型",
      "长距离",
      "方形",
      "分离式",
      "超短型",
      "插件式",
    ],
    desc: "高精度、耐用，适用于金属检测与自动化设备。",
  },
  {
    name: "激光/光电传感器",
    en: "Laser/Photoelectric Sensors",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <rect x="10" y="22" width="14" height="5" rx="2.5" fill="#0052D9" />
        <path
          d="M24 24.5h18"
          stroke="#0052D9"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M42 24.5l-4 4M42 24.5l-4-4"
          stroke="#0052D9"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    href: "/products/laser-photoelectric",
    subcategories: [
      "超小型",
      "漫反射/对射",
      "背景抑制",
      "色标",
      "弯头90°",
      "槽型",
      "超薄",
      "透明物检测",
    ],
    desc: "远距离检测，抗干扰，适合复杂环境。",
  },
  {
    name: "电容式接近开关",
    en: "Capacitive Proximity Sensors",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="16" cy="24" r="5" fill="#0052D9" />
        <circle cx="34" cy="15" r="3" fill="#0052D9" />
        <circle cx="34" cy="33" r="3" fill="#0052D9" />
        <path
          d="M21 24c5-3 10-6 13.5-9M21 24c5 3 10 6 13.5 9"
          stroke="#0052D9"
          strokeWidth="2"
        />
      </svg>
    ),
    href: "/products/capacitive",
    subcategories: ["金属外壳", "塑料外壳", "特氟龙防腐蚀"],
    desc: "适用于多种材料检测，防护性能优异。",
  },
  {
    name: "放大器/光纤",
    en: "Amplifiers & Fiber Optic Sensors",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="12"
          y="18"
          width="24"
          height="12"
          rx="5"
          fill="#F5F7FA"
          stroke="#0052D9"
          strokeWidth="2"
        />
        <circle cx="24" cy="24" r="5" fill="#0052D9" />
        <path
          d="M36 24h4"
          stroke="#0052D9"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    href: "/products/amplifier-fiber",
    subcategories: [
      "小型带针管",
      "普通对射型",
      "弯头90°",
      "同轴",
      "矩阵",
      "高精密矩阵",
      "光纤放大器",
    ],
    desc: "信号增强，适配多种复杂检测场景。",
  },
];

export default function ProductCategoryQuickEntry() {
  return (
    <section
      className="w-full flex flex-col gap-4"
      aria-label="产品分类快捷入口"
      tabIndex={0}
    >
      <h2 className="text-lg md:text-xl font-bold text-[#0052D9] mb-2">
        产品分类
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group relative flex flex-col items-center h-[320px] p-6 bg-white rounded-2xl shadow hover:shadow-xl border border-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9] transition cursor-pointer"
            tabIndex={0}
            aria-label={`进入${cat.name}分类页面`}
          >
            {/* 顶部图标 */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#F5F7FA] to-[#e3eefd] border border-[#0052D9]/10 mb-3">
              {cat.icon}
            </div>
            {/* 分类名/英文名/描述 居中 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-0">
              <div className="font-bold text-lg text-[#0052D9] group-hover:underline mb-1">
                {cat.name}
              </div>
              <div className="text-xs text-gray-400 mb-1">{cat.en}</div>
              <div className="text-xs text-gray-500 mb-2 line-clamp-2">
                {cat.desc}
              </div>
            </div>
            {/* 子类标签自动换行，底部预留空间避免与箭头重叠 */}
            <div className="flex flex-wrap gap-2 w-full justify-center mb-10">
              {cat.subcategories.map((sub) => (
                <span
                  key={sub}
                  className="bg-[#F5F7FA] px-3 py-1 rounded-full border border-[#0052D9]/10 whitespace-nowrap text-xs text-[#0052D9] font-medium"
                >
                  {sub}
                </span>
              ))}
            </div>
            {/* 右下角箭头 */}
            <div className="absolute bottom-4 right-4 z-10">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#e3eefd] group-hover:bg-[#0052D9] transition-colors">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#0052D9"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="group-hover:stroke-white transition"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    name: "电感式接近开关",
    en: "Inductive Sensors",
    img: "/assets/categories/inductive.png",
    href: "/products/inductive",
    desc: "高精度、耐用，适用于金属检测与自动化设备。",
  },
  {
    name: "光电/激光传感器",
    en: "Photoelectric/Laser Sensors",
    img: "/assets/categories/photoelectric.png",
    href: "/products/photoelectric",
    desc: "远距离检测，抗干扰，适合复杂环境。",
  },
  {
    name: "光纤传感器",
    en: "Fiber Optic Sensors",
    img: "/assets/categories/fiber.png",
    href: "/products/fiber",
    desc: "极细检测，适用于微小物体与狭小空间。",
  },
  {
    name: "放大器",
    en: "Amplifiers",
    img: "/assets/categories/amplifier.png",
    href: "/products/amplifier",
    desc: "信号增强，提升检测灵敏度与稳定性。",
  },
  {
    name: "方形传感器",
    en: "Square Sensors",
    img: "/assets/categories/square.png",
    href: "/products/square",
    desc: "结构紧凑，安装灵活，适配多场景。",
  },
  {
    name: "插件式传感器",
    en: "Plug-in Sensors",
    img: "/assets/categories/plugin.png",
    href: "/products/plugin",
    desc: "便捷更换，维护简单，适合批量应用。",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9] transition cursor-pointer"
            tabIndex={0}
            aria-label={`进入${cat.name}分类页面`}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F5F7FA] flex items-center justify-center overflow-hidden border border-[#0052D9]/10">
              <Image
                src={cat.img}
                alt={cat.name}
                width={48}
                height={48}
                className="object-contain w-10 h-10"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base text-[#0052D9] group-hover:underline">
                {cat.name}
              </div>
              <div className="text-xs text-gray-500 truncate">{cat.desc}</div>
            </div>
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#0052D9"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="ml-2 group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}

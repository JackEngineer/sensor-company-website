import Link from "next/link";
import Image from "next/image";

const APPLICATIONS = [
  {
    name: "自动化产线",
    img: "/assets/applications/automation.png",
    desc: "高精度检测与定位，提升生产效率与自动化水平。",
    products: ["电感式接近开关", "光电传感器"],
    href: "/application/automation",
  },
  {
    name: "智能装备",
    img: "/assets/applications/intelligent.png",
    desc: "适用于机器人、智能装配等高端装备的精密感知。",
    products: ["光纤传感器", "放大器"],
    href: "/application/intelligent",
  },
  {
    name: "包装机械",
    img: "/assets/applications/packaging.png",
    desc: "高速检测、精准计数，保障包装流程顺畅。",
    products: ["光电传感器", "插件式传感器"],
    href: "/application/packaging",
  },
  {
    name: "电子制造",
    img: "/assets/applications/electronics.png",
    desc: "微小元件检测，适配复杂电子制造工艺。",
    products: ["方形传感器", "光纤传感器"],
    href: "/application/electronics",
  },
];

export default function ApplicationRecommend() {
  return (
    <section
      className="container mx-auto px-4 mt-4 mb-8"
      aria-label="应用场景推荐"
      tabIndex={0}
    >
      <h2 className="text-lg md:text-xl font-bold text-[#0052D9] mb-4">
        典型应用场景
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {APPLICATIONS.map((app) => (
          <Link
            key={app.href}
            href={app.href}
            className="group flex flex-col bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9] transition cursor-pointer h-full"
            tabIndex={0}
            aria-label={`查看${app.name}应用详情`}
          >
            <div className="relative w-full h-32 md:h-36 rounded-t-xl overflow-hidden">
              <Image
                src={app.img}
                alt={app.name}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 flex flex-col p-4 gap-2">
              <div className="font-semibold text-base text-[#0052D9] mb-1">
                {app.name}
              </div>
              <div className="text-xs text-gray-600 mb-1 line-clamp-2">
                {app.desc}
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                {app.products.map((prod) => (
                  <span
                    key={prod}
                    className="inline-block bg-[#F5F7FA] text-[#0052D9] text-xs px-2 py-0.5 rounded-full border border-[#0052D9]/20 font-medium"
                  >
                    {prod}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end px-4 pb-3">
              <span className="text-xs text-[#0052D9] group-hover:underline">
                了解更多
              </span>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#0052D9"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-1 group-hover:translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

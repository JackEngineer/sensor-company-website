"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const BANNERS = [
  {
    img: "/assets/banner/banner1.jpg",
    title: "高精密·高性能传感器",
    desc: "专注研发与制造，满足多行业高端需求。",
  },
  {
    img: "/assets/banner/banner2.jpg",
    title: "丰富产品线，覆盖多场景",
    desc: "电感式、光电、光纤等多系列产品，广泛应用于自动化、智能制造。",
  },
  {
    img: "/assets/banner/banner3.jpg",
    title: "创新驱动，品质保障",
    desc: "持续创新，严格品控，服务全球客户。",
  },
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const bannerCount = BANNERS.length;

  // 自动轮播
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % bannerCount);
    }, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, bannerCount]);

  // 键盘左右切换
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setIndex((i) => (i - 1 + bannerCount) % bannerCount);
    } else if (e.key === "ArrowRight") {
      setIndex((i) => (i + 1) % bannerCount);
    }
  };

  return (
    <section
      className="relative w-full h-[220px] md:h-[360px] lg:h-[440px] flex items-center justify-center overflow-hidden rounded-xl shadow-md bg-gray-100"
      tabIndex={0}
      aria-label="首页轮播区"
      onKeyDown={handleKeyDown}
    >
      {BANNERS.map((banner, i) => (
        <div
          key={banner.img}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={banner.img}
            alt={banner.title}
            fill
            className="object-cover w-full h-full"
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden />
          <div className="absolute left-6 bottom-8 md:left-12 md:bottom-14 text-white drop-shadow-lg max-w-[80vw]">
            <h2 className="text-xl md:text-3xl font-bold mb-2">
              {banner.title}
            </h2>
            <p className="text-sm md:text-lg">{banner.desc}</p>
          </div>
        </div>
      ))}
      {/* 左右切换按钮 */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#0052D9] rounded-full p-2 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
        aria-label="上一张"
        onClick={() => setIndex((i) => (i - 1 + bannerCount) % bannerCount)}
        tabIndex={0}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="#0052D9"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#0052D9] rounded-full p-2 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
        aria-label="下一张"
        onClick={() => setIndex((i) => (i + 1) % bannerCount)}
        tabIndex={0}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="#0052D9"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {/* 指示点 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full border-2 border-white ${
              i === index ? "bg-[#0052D9]" : "bg-white/60"
            }`}
            aria-label={`切换到第${i + 1}张`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            tabIndex={0}
          />
        ))}
      </div>
    </section>
  );
}

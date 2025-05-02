"use client";
import { useState } from "react";
import Image from "next/image";

export default function CompanyIntro() {
  const [showContact, setShowContact] = useState(false);
  const handleToggleContact = () => setShowContact((v) => !v);

  return (
    <section
      className="bg-white rounded-xl shadow p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-stretch"
      aria-label="公司简介"
      tabIndex={0}
    >
      {/* 左侧文字内容 */}
      <div className="flex-1 flex flex-col gap-4 justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0052D9] mb-2">
          东莞市南至巅传感器科技有限公司
        </h1>
        <h2 className="text-base md:text-lg text-gray-500 font-semibold mb-1">
          DONGGUAN NANZHIDIAN TECHNOLOGY CO.,LTD
        </h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {["高精密", "高性能", "长寿命", "超小型", "超短型", "区域型"].map(
            (tag) => (
              <span
                key={tag}
                className="inline-block bg-[#F5F7FA] text-[#0052D9] text-xs md:text-sm px-2 py-0.5 rounded-full border border-[#0052D9]/20 font-medium"
              >
                {tag}
              </span>
            )
          )}
        </div>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
          集研发、生产、销售于一体，专注高端传感器解决方案。产品涵盖电感式、光电、光纤等多系列，广泛应用于自动化、智能制造等领域。持续创新，严格品控，服务全球客户。
        </p>
        {/* 联系方式，移动端可收起 */}
        <div className="mt-2">
          <button
            className="md:hidden text-[#0052D9] underline text-sm mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
            aria-label={showContact ? "收起联系方式" : "展开联系方式"}
            onClick={handleToggleContact}
          >
            {showContact ? "收起联系方式" : "展开联系方式"}
          </button>
          <ul
            className={`text-xs md:text-sm text-gray-600 space-y-1 ${
              showContact ? "block" : "hidden"
            } md:block`}
          >
            <li>
              <span className="font-semibold">电话：</span>
              <a
                href="tel:+8675581491786"
                className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
                tabIndex={0}
                aria-label="拨打电话"
              >
                +86-755-81491786/81491789
              </a>
            </li>
            <li>
              <span className="font-semibold">邮箱：</span>
              <a
                href="mailto:2733924602@qq.com"
                className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
                tabIndex={0}
                aria-label="发送邮件"
              >
                2733924602@qq.com
              </a>
            </li>
            <li>
              <span className="font-semibold">地址：</span>
              东莞市樟木头镇樟深大道南 2318 号三楼
            </li>
          </ul>
        </div>
      </div>
      {/* 右侧公司图片 */}
      <div className="flex-1 flex items-center justify-center min-w-[180px]">
        <Image
          src="/assets/company/company.jpg"
          alt="公司形象图片"
          width={400}
          height={300}
          className="rounded-lg object-cover w-full h-48 md:h-72 shadow-sm border border-gray-100"
          priority
        />
      </div>
    </section>
  );
}

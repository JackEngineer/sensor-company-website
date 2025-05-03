"use client";
import React from "react";

const history = [
  { year: "2015", event: "公司成立，专注高精密传感器研发" },
  { year: "2017", event: "通过ISO9001质量体系认证，产品线扩展至光电/激光" },
  { year: "2019", event: "荣获多项专利，团队规模突破50人" },
  { year: "2022", event: "服务客户超1000家，产品远销海外" },
];

const honors = [
  { img: "/assets/honor1.jpg", desc: "高新技术企业证书" },
  { img: "/assets/honor2.jpg", desc: "ISO9001质量体系认证" },
];

const team = [
  { img: "/assets/team1.jpg", name: "张工", title: "创始人/总经理" },
  { img: "/assets/team2.jpg", name: "李工", title: "技术总监" },
];

const AboutPage = () => (
  <main className="max-w-4xl mx-auto px-4 py-8">
    <section className="mb-10">
      <h1
        className="text-3xl font-bold text-brand mb-4"
        tabIndex={0}
        aria-label="公司简介"
      >
        公司简介
      </h1>
      <p className="text-base leading-relaxed text-gray-700">
        东莞市南至巅传感器科技有限公司是一家集研发、生产、销售于一体的高新技术企业，专注于高精密、高性能、长寿命、超小型、超短型、区域型传感器解决方案。公司秉承"创新驱动、品质为本"的理念，致力于为全球客户提供优质的产品与服务。
      </p>
    </section>
    <section className="mb-10">
      <h2
        className="text-2xl font-semibold text-brand mb-3"
        tabIndex={0}
        aria-label="发展历程"
      >
        发展历程
      </h2>
      <ol className="border-l-2 border-brand pl-6 space-y-2">
        {history.map((item) => (
          <li key={item.year} className="relative">
            <span
              className="absolute -left-3 top-1 w-3 h-3 bg-brand rounded-full"
              aria-hidden="true"
            ></span>
            <span className="font-bold text-brand mr-2">{item.year}</span>
            <span className="text-gray-700">{item.event}</span>
          </li>
        ))}
      </ol>
    </section>
    <section className="mb-10">
      <h2
        className="text-2xl font-semibold text-brand mb-3"
        tabIndex={0}
        aria-label="资质荣誉"
      >
        资质荣誉
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {honors.map((h, i) => (
          <figure key={i} className="flex flex-col items-center">
            <img
              src={h.img}
              alt={h.desc}
              loading="lazy"
              className="w-24 h-24 object-cover rounded shadow"
            />
            <figcaption className="mt-2 text-sm text-gray-600 text-center">
              {h.desc}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
    <section>
      <h2
        className="text-2xl font-semibold text-brand mb-3"
        tabIndex={0}
        aria-label="团队风采"
      >
        团队风采
      </h2>
      <div className="flex flex-wrap gap-6">
        {team.map((t, i) => (
          <figure key={i} className="w-32 flex flex-col items-center">
            <img
              src={t.img}
              alt={t.name}
              loading="lazy"
              className="w-24 h-24 object-cover rounded-full shadow"
            />
            <figcaption className="mt-2 text-base font-medium text-brand">
              {t.name}
            </figcaption>
            <span className="text-xs text-gray-500">{t.title}</span>
          </figure>
        ))}
      </div>
    </section>
  </main>
);

export default AboutPage;

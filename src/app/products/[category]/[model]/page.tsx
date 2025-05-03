"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  model: string;
  title: string;
  category: string;
  subcategory?: string;
  parameters: Array<{
    参数: string;
    数值: string | number;
    单位?: string;
  }>;
  images: Array<{
    type: "product" | "structure" | "application";
    url: string;
    desc?: string;
  }>;
  applications?: Array<{
    scene: string;
    desc: string;
  }>;
  downloads?: Array<{
    name: string;
    url: string;
  }>;
}

const ImageGallery: React.FC<{ images: Product["images"] }> = ({ images }) => {
  const allImgs = [
    ...images.filter((img) => img.type === "product"),
    ...images.filter((img) => img.type === "structure"),
  ];
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const handlePrev = () =>
    setPreviewIdx((idx) => (idx! > 0 ? idx! - 1 : allImgs.length - 1));
  const handleNext = () =>
    setPreviewIdx((idx) => (idx! < allImgs.length - 1 ? idx! + 1 : 0));
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        {allImgs.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.desc || "产品图片"}
            className="w-64 h-64 object-contain rounded-lg shadow cursor-pointer bg-gray-50 hover:ring-2 hover:ring-[#0052D9]"
            loading="lazy"
            tabIndex={0}
            aria-label="点击放大产品图片"
            onClick={() => setPreviewIdx(i)}
            onKeyDown={(e) => e.key === "Enter" && setPreviewIdx(i)}
          />
        ))}
      </div>
      {previewIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setPreviewIdx(null)}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="上一张"
            tabIndex={0}
          >
            <svg
              className="w-6 h-6 text-[#0052D9]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <img
            src={allImgs[previewIdx].url}
            alt="预览"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="下一张"
            tabIndex={0}
          >
            <svg
              className="w-6 h-6 text-[#0052D9]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const ParameterTable: React.FC<{ parameters: Product["parameters"] }> = ({
  parameters,
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-[400px] w-full border rounded-lg bg-white shadow text-sm">
      <thead className="sticky top-0 z-10">
        <tr className="bg-[#F5F7FA] text-[#0052D9]">
          <th className="px-4 py-2 text-left">参数</th>
          <th className="px-4 py-2 text-left">数值</th>
          <th className="px-4 py-2 text-left">单位</th>
        </tr>
      </thead>
      <tbody>
        {parameters.map((param, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F5F7FA]"}>
            <td className="px-4 py-2 whitespace-nowrap">{param.参数}</td>
            <td className="px-4 py-2 whitespace-nowrap">{param.数值}</td>
            <td className="px-4 py-2 whitespace-nowrap">{param.单位 || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ApplicationList: React.FC<{ applications?: Product["applications"] }> = ({
  applications,
}) => {
  if (!applications || applications.length === 0) return null;
  return (
    <div className="mt-6">
      <h3 className="text-base font-bold text-[#0052D9] mb-2 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-[#0052D9]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M12 20.5C7.305 20.5 3.5 16.695 3.5 12S7.305 3.5 12 3.5 20.5 7.305 20.5 12 16.695 20.5 12 20.5z"
          />
        </svg>
        应用场景推荐
      </h3>
      <ul className="grid gap-2">
        {applications.map((app, i) => (
          <li
            key={i}
            className="bg-[#F5F7FA] rounded px-4 py-2 text-gray-700 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4 text-[#0052D9] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="10" />
            </svg>
            <span className="font-semibold text-[#0052D9]">{app.scene}</span>：
            {app.desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DownloadList: React.FC<{ downloads?: Product["downloads"] }> = ({
  downloads,
}) => {
  if (!downloads || downloads.length === 0) return null;
  return (
    <div className="mt-6">
      <h3 className="text-base font-bold text-[#0052D9] mb-2 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-[#0052D9]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        资料下载
      </h3>
      <ul className="flex flex-wrap gap-3">
        {downloads.map((dl, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#0052D9]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 7H7v6h6V7z" />
              <path
                fillRule="evenodd"
                d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0-2h10a4 4 0 014 4v10a4 4 0 01-4 4H5a4 4 0 01-4-4V5a4 4 0 014-4z"
                clipRule="evenodd"
              />
            </svg>
            <a
              href={dl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[#0052D9] text-white rounded shadow hover:bg-[#003A8C] focus:outline-none focus:ring-2 focus:ring-[#0052D9]"
              aria-label={`下载${dl.name}`}
            >
              {dl.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RelatedProducts: React.FC<{ category: string; currentModel: string }> = ({
  category,
  currentModel,
}) => {
  const [related, setRelated] = useState<Product[]>([]);
  useEffect(() => {
    fetch(
      `/api/products?category=${encodeURIComponent(category)}&page=1&pageSize=8`
    )
      .then((res) => res.json())
      .then((data) => {
        setRelated(
          data.items
            .filter((p: Product) => p.model !== currentModel)
            .slice(0, 4)
        );
      });
  }, [category, currentModel]);
  if (!related.length) return null;
  return (
    <div className="mt-10">
      <h3 className="text-base font-bold text-[#0052D9] mb-4">相关推荐</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((p) => (
          <a
            key={p.model}
            href={`/products/${encodeURIComponent(
              p.category
            )}/${encodeURIComponent(p.model)}`}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 focus:outline-none focus:ring-2 focus:ring-[#0052D9]"
            tabIndex={0}
            aria-label={`查看${p.title}详情`}
          >
            <img
              src={
                p.images.find((img) => img.type === "product")?.url ||
                "/assets/placeholder.png"
              }
              alt={p.title}
              className="w-full h-28 object-contain rounded mb-2 bg-gray-50"
              loading="lazy"
            />
            <div className="text-sm font-bold text-[#0052D9] mb-1">
              {p.title}
            </div>
            <div className="text-xs text-gray-500">型号：{p.model}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const model = Array.isArray(params?.model) ? params.model[0] : params?.model;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!model) return;
    setLoading(true);
    fetch(`/api/products/${model}`)
      .then((res) => {
        if (!res.ok) throw new Error("未找到该产品");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [model]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 text-[#0052D9]">
        加载中...
      </div>
    );
  }
  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-80 text-red-500">
        {error || "未找到该产品"}
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#0052D9] mb-2">
        {product.title}
      </h1>
      <div className="text-gray-500 mb-4">型号：{product.model}</div>
      <ImageGallery images={product.images} />
      <div className="mt-8">
        <h2 className="text-lg font-bold text-[#0052D9] mb-2">详细参数</h2>
        <ParameterTable parameters={product.parameters} />
      </div>
      <ApplicationList applications={product.applications} />
      <DownloadList downloads={product.downloads} />
      <RelatedProducts
        category={product.category}
        currentModel={product.model}
      />
    </main>
  );
};

export default ProductDetailPage;

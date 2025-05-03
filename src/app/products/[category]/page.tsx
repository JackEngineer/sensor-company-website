"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CategorySidebar, {
  Category,
} from "@/components/products/CategorySidebar";

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
}

const ProductsByCategoryPage: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const category = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category;
  const subcategory = searchParams.get("subcategory") || undefined;

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取分类树
  useEffect(() => {
    fetch("/api/products/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  // 获取产品列表
  useEffect(() => {
    if (!category) return;
    setLoading(true);
    let url = `/api/products?category=${encodeURIComponent(category)}`;
    if (subcategory) url += `&subcategory=${encodeURIComponent(subcategory)}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("未找到该分类产品");
        return res.json();
      })
      .then((data) => {
        setProducts(data.items || []);
        setError(null);
        if ((data.items || []).length === 0) {
          // 调试用，便于排查数据问题
          // eslint-disable-next-line no-console
          console.log(
            "[产品列表为空] category:",
            category,
            "subcategory:",
            subcategory,
            "API返回:",
            data
          );
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [category, subcategory]);

  return (
    <main className="flex flex-col md:flex-row gap-4 px-4 py-6 bg-[#F5F7FA] min-h-screen">
      <aside className="md:w-1/5 w-full">
        <CategorySidebar
          categories={categories}
          selectedCategory={category ? { category, subcategory } : null}
          onSelect={() => {}}
        />
      </aside>
      <section className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-[#0052D9] mb-2">
          {category ? decodeURIComponent(category) : ""}
          {subcategory ? ` / ${decodeURIComponent(subcategory)}` : ""}
        </h1>
        {loading ? (
          <div className="text-[#0052D9] py-20 flex justify-center">
            加载中...
          </div>
        ) : error ? (
          <div className="text-red-500 py-20 flex justify-center">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-gray-500 py-20 flex justify-center">
            暂无产品
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
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
                  className="w-full h-32 object-contain rounded mb-2 bg-gray-50"
                  loading="lazy"
                />
                <div className="text-base font-bold text-[#0052D9] mb-1">
                  {p.title}
                </div>
                <div className="text-xs text-gray-500">型号：{p.model}</div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductsByCategoryPage;

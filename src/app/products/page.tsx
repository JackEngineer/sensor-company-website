"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import CategorySidebar from "@/components/products/CategorySidebar";
import SearchBar from "@/components/products/SearchBar";
import ProductList from "@/components/products/ProductList";
import Pagination from "@/components/products/Pagination";

interface Category {
  name: string;
  subcategories?: Category[];
}

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

const PAGE_SIZE = 12;

const ProductsPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{
    category: string;
    subcategory?: string;
  } | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (selectedCategory?.category)
      params.append("category", selectedCategory.category);
    if (selectedCategory?.subcategory)
      params.append("subcategory", selectedCategory.subcategory);
    if (keyword) params.append("keyword", keyword);
    params.append("page", String(page));
    params.append("pageSize", String(PAGE_SIZE));
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.items);
        setTotal(data.total);
      })
      .catch(() => setError("产品加载失败"))
      .finally(() => setLoading(false));
  }, [selectedCategory, keyword, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategorySelect = (
    cat: { category: string; subcategory?: string } | null
  ) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  const handleSearch = (kw: string) => {
    setKeyword(kw);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <main className="flex flex-col md:flex-row gap-4 px-4 py-6 bg-[#F5F7FA] min-h-screen">
        <aside className="md:w-1/5 w-full">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </aside>
        <section className="flex-1 flex flex-col gap-4">
          <SearchBar keyword={keyword} onSearch={handleSearch} />
          <ProductList products={products} loading={loading} error={error} />
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={total}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </Suspense>
  );
};

export default ProductsPage;

import React from "react";

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

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-[#0052D9] animate-pulse">加载中...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        {error}
      </div>
    );
  }
  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-400">
        暂无产品
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.model}
          className="bg-white rounded shadow p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-[#0052D9]"
          tabIndex={0}
          aria-label={`产品：${product.title}，型号：${product.model}`}
        >
          <img
            src={
              product.images.find((img) => img.type === "product")?.url ||
              "/assets/placeholder.png"
            }
            alt={product.title}
            className="w-full h-40 object-contain rounded mb-2 bg-gray-50"
            loading="lazy"
          />
          <div className="flex-1">
            <h3 className="text-base font-bold text-[#0052D9] mb-1">
              {product.title}
            </h3>
            <div className="text-sm text-gray-600 mb-1">
              型号：{product.model}
            </div>
            <ul className="text-xs text-gray-500 space-y-0.5">
              {product.parameters.slice(0, 3).map((param, idx) => (
                <li key={idx}>
                  {param.参数}：{param.数值}
                  {param.单位 ? param.单位 : ""}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={`/products/${product.category}/${product.model}`}
            className="mt-2 inline-block px-3 py-1 bg-[#0052D9] text-white text-xs rounded hover:bg-[#003A8C] focus:outline-none focus:ring-2 focus:ring-[#0052D9]"
            tabIndex={0}
            aria-label={`查看${product.title}详情`}
          >
            查看详情
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

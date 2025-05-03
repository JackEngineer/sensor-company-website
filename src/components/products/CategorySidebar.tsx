import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export interface Category {
  name: string;
  subcategories?: Category[];
}

// 移除 selectedCategory props，URL 决定选中状态
interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: { category: string; subcategory?: string } | null;
  onSelect: (cat: { category: string; subcategory?: string } | null) => void;
}

// 辅助函数：查找当前选中项的路径
function getCategoryPath(
  categories: Category[],
  category?: string,
  subcategory?: string
): string[] {
  for (const cat of categories) {
    if (cat.name === category) {
      if (!subcategory) return [cat.name];
      if (cat.subcategories) {
        for (const sub of cat.subcategories) {
          if (sub.name === subcategory) {
            return [cat.name, sub.name];
          }
        }
      }
      return [cat.name];
    }
    if (cat.subcategories) {
      const subPath = getCategoryPath(cat.subcategories, category, subcategory);
      if (subPath.length > 0) return [cat.name, ...subPath];
    }
  }
  return [];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, selectedCategory, onSelect }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathParts = pathname.split("/").filter(Boolean);
  // decode URL 参数，确保与分类树 name 全等
  const currentCategory = pathParts[1]
    ? decodeURIComponent(pathParts[1])
    : undefined;
  const currentSubcategory = searchParams.get("subcategory")
    ? decodeURIComponent(searchParams.get("subcategory")!)
    : undefined;

  // 展开状态，key 为大类名，值为是否展开
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  // 只在 path 变化时自动展开，用户手动操作不被覆盖
  const prevPathRef = useRef<string>("");

  useEffect(() => {
    if (!categories || categories.length === 0) return;
    const path = getCategoryPath(
      categories,
      currentCategory,
      currentSubcategory
    );
    const pathStr = path.join("/");
    if (path.length > 0 && prevPathRef.current !== pathStr) {
      const expandedObj: Record<string, boolean> = {};
      for (let i = 0; i < path.length - 1; i++) {
        const key = path.slice(0, i + 1).join("/");
        expandedObj[key] = true;
      }
      setExpanded((prev) => ({ ...prev, ...expandedObj }));
      prevPathRef.current = pathStr;
    }
  }, [categories, currentCategory, currentSubcategory]);

  const handleToggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 跳转逻辑
  const handleSelect = (
    cat: { category?: string; subcategory?: string } | null
  ) => {
    if (!cat || !cat.category) {
      router.push("/products");
      return;
    }
    if (!cat.subcategory) {
      router.push(`/products/${encodeURIComponent(cat.category)}`);
      return;
    }
    router.push(
      `/products/${encodeURIComponent(
        cat.category
      )}?subcategory=${encodeURIComponent(cat.subcategory)}`
    );
  };

  // 递归渲染分类树，支持二级分类点击
  const renderCategories = (
    cats: Category[],
    parentKey: string = "",
    level: number = 0,
    parentCategory?: string
  ): React.ReactNode =>
    cats.map((cat) => {
      const key = parentKey ? `${parentKey}/${cat.name}` : cat.name;
      const hasSub = cat.subcategories && cat.subcategories.length > 0;
      const isExpanded = expanded[key] || false;
      // 判断选中：一级或二级，decode URL 参数后全等
      const isSelected =
        (level === 0 && currentCategory === cat.name && !currentSubcategory) ||
        (level === 1 &&
          currentCategory === parentCategory &&
          currentSubcategory === cat.name);
      return (
        <li key={key} className={level === 0 ? "mb-2" : "mb-1"}>
          <div className="flex items-center group">
            {hasSub && (
              <button
                className={`mr-2 w-6 h-6 flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#0052D9] ${
                  isExpanded
                    ? "bg-[#E6F0FA] text-[#0052D9]"
                    : "text-gray-400 hover:text-[#0052D9]"
                }`}
                aria-label={isExpanded ? `收起${cat.name}` : `展开${cat.name}`}
                aria-expanded={isExpanded}
                tabIndex={0}
                onClick={() => handleToggle(key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleToggle(key);
                }}
                type="button"
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isExpanded ? "rotate-90" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            <button
              className={`flex-1 text-left px-4 py-2 rounded-lg transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-[#0052D9] ${
                level === 0
                  ? isSelected
                    ? "bg-[#0052D9] text-white shadow font-bold"
                    : "bg-gray-50 text-gray-900 hover:bg-[#E6F0FA] hover:text-[#0052D9]"
                  : isSelected
                  ? "bg-[#E6F0FA] text-[#0052D9] font-bold"
                  : "bg-transparent text-gray-700 hover:bg-[#F5F7FA] hover:text-[#0052D9]"
              } ${level === 0 ? "text-base" : "text-sm pl-6"}`}
              tabIndex={0}
              aria-label={`选择分类：${cat.name}`}
              aria-pressed={isSelected}
              onClick={() => {
                if (level === 0) {
                  handleSelect({ category: cat.name });
                } else {
                  handleSelect({
                    category: parentCategory!,
                    subcategory: cat.name,
                  });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (level === 0) {
                    handleSelect({ category: cat.name });
                  } else {
                    handleSelect({
                      category: parentCategory!,
                      subcategory: cat.name,
                    });
                  }
                }
              }}
              type="button"
            >
              {cat.name}
            </button>
          </div>
          {hasSub && isExpanded && (
            <ul className="ml-4 border-l border-gray-100 pl-2 mt-1">
              {renderCategories(cat.subcategories!, key, level + 1, cat.name)}
            </ul>
          )}
        </li>
      );
    });

  return (
    <nav
      aria-label="产品分类导航"
      className="bg-white rounded-xl shadow p-4 mb-4 md:mb-0"
    >
      <h2 className="text-lg font-bold mb-4 text-[#0052D9] tracking-wide">
        产品分类
      </h2>
      <button
        className={`mb-3 w-full px-4 py-2 rounded-lg text-base font-semibold transition-colors shadow-sm bg-gray-50 text-gray-900 hover:bg-[#E6F0FA] hover:text-[#0052D9] focus:outline-none focus:ring-2 focus:ring-[#0052D9] ${
          !currentCategory ? "bg-[#0052D9] font-bold" : ""
        }`}
        tabIndex={0}
        aria-label="显示全部产品"
        aria-pressed={!currentCategory}
        onClick={() => handleSelect(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleSelect(null);
          }
        }}
        type="button"
      >
        全部产品
      </button>
      <ul className="space-y-1">{renderCategories(categories)}</ul>
    </nav>
  );
};

export default CategorySidebar;

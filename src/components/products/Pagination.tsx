import React from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  // 只显示当前页前后各2页
  const getPages = () => {
    const pages = [];
    for (
      let i = Math.max(1, page - 2);
      i <= Math.min(totalPages, page + 2);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-4"
      aria-label="分页导航"
    >
      <button
        className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0052D9]"
        onClick={handlePrev}
        disabled={page === 1}
        aria-label="上一页"
        tabIndex={0}
      >
        上一页
      </button>
      {getPages().map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#0052D9] ${
            p === page
              ? "bg-[#0052D9] text-white font-bold"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onPageChange(p)}
          aria-label={`第${p}页`}
          aria-current={p === page}
          tabIndex={0}
        >
          {p}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0052D9]"
        onClick={handleNext}
        disabled={page === totalPages}
        aria-label="下一页"
        tabIndex={0}
      >
        下一页
      </button>
    </nav>
  );
};

export default Pagination;

"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "首页", href: "/" },
  { label: "产品中心", href: "/products" },
  { label: "应用场景", href: "/application" },
  { label: "关于我们", href: "/about" },
  { label: "联系我们", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleToggleMenu = () => setMenuOpen((v) => !v);
  const handleCloseMenu = () => setMenuOpen(false);
  const pathname = usePathname();

  // 判断选中：完全等于或以 href+/ 开头（如 /products/xxx 也高亮产品中心）
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav
        className="container mx-auto flex items-center justify-between px-4 py-2 md:py-3"
        aria-label="主导航"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="返回首页"
          tabIndex={0}
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
        >
          <Image
            src="/assets/logo.png"
            alt="公司Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-lg text-[#0052D9] hidden sm:inline">
            南至巅传感器
          </span>
        </Link>
        {/* PC菜单 */}
        <ul className="hidden md:flex gap-6 lg:gap-8 items-center text-base font-medium">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9] hover:text-[#0052D9] transition-colors ${
                    active
                      ? "text-[#0052D9] font-bold underline underline-offset-4"
                      : ""
                  }`}
                  tabIndex={0}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* 语言切换 */}
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 rounded text-sm font-medium text-[#0052D9] hover:bg-[#F5F7FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
            aria-label="切换为中文"
            tabIndex={0}
          >
            中
          </button>
          <span className="text-gray-300">|</span>
          <button
            className="px-2 py-1 rounded text-sm font-medium hover:text-[#0052D9] hover:bg-[#F5F7FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
            aria-label="Switch to English"
            tabIndex={0}
          >
            EN
          </button>
        </div>
        {/* 移动端汉堡按钮 */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={handleToggleMenu}
          tabIndex={0}
        >
          <span className="sr-only">{menuOpen ? "关闭菜单" : "打开菜单"}</span>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#0052D9"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>
      {/* 移动端菜单抽屉 */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
        onClick={handleCloseMenu}
      >
        <nav
          className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-6 transition-transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="menu"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/"
            aria-label="返回首页"
            tabIndex={0}
            className="flex items-center gap-2 mb-4"
          >
            <Image
              src="/assets/logo.png"
              alt="公司Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg text-[#0052D9]">
              南至巅传感器
            </span>
          </Link>
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-2 py-2 rounded hover:bg-[#F5F7FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9] text-base font-medium ${
                      active
                        ? "text-[#0052D9] font-bold underline underline-offset-4"
                        : ""
                    }`}
                    tabIndex={0}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    onClick={handleCloseMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2 mt-6">
            <button
              className="px-2 py-1 rounded text-sm font-medium text-[#0052D9] hover:bg-[#F5F7FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
              aria-label="切换为中文"
              tabIndex={0}
            >
              中
            </button>
            <span className="text-gray-300">|</span>
            <button
              className="px-2 py-1 rounded text-sm font-medium hover:text-[#0052D9] hover:bg-[#F5F7FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9]"
              aria-label="Switch to English"
              tabIndex={0}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

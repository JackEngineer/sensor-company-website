export default function Footer() {
  return (
    <footer
      className="w-full bg-[#f3f6fa] border-t border-gray-200 pt-0 pb-0 mt-auto text-xs md:text-sm text-gray-600"
      aria-label="网站页脚"
      tabIndex={0}
    >
      {/* 顶部主色条 */}
      <div className="w-full bg-[#0052D9] text-white text-center py-2 font-bold text-base md:text-lg tracking-wide">
        东莞市南至巅传感器科技有限公司
      </div>
      {/* 主体信息区 */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0">
        {/* 公司信息 */}
        <div className="flex-1 flex flex-col gap-1 mb-2 md:mb-0">
          <span className="font-semibold text-[#0052D9] text-sm md:text-base">
            DONGGUAN NANZHIDIAN TECHNOLOGY CO.,LTD
          </span>
          <span className="text-gray-400 mt-1">
            地址：东莞市樟木头镇樟深大道南 2318 号三楼
          </span>
        </div>
        {/* 联系方式 */}
        <div className="flex-1 flex flex-col gap-1 mb-2 md:mb-0">
          <span>
            <span className="font-semibold text-[#0052D9]">电话：</span>
            <a
              href="tel:+8675581491786"
              className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9] text-[#0052D9] font-medium"
              tabIndex={0}
            >
              +86-755-81491786/81491789
            </a>
          </span>
          <span>
            <span className="font-semibold text-[#0052D9]">邮箱：</span>
            <a
              href="mailto:2733924602@qq.com"
              className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052D9] text-[#0052D9] font-medium"
              tabIndex={0}
            >
              2733924602@qq.com
            </a>
          </span>
          <span>
            <span className="font-semibold text-[#0052D9]">传真：</span>
            <span className="text-gray-600">+86-755-33855909</span>
          </span>
          <span>
            <span className="font-semibold text-[#0052D9]">QQ：</span>
            <span className="text-gray-600">2733924602</span>
          </span>
        </div>
        {/* 备案与友情链接 */}
        <div className="flex-1 flex flex-col gap-1 items-start md:items-end">
          <div className="flex items-center gap-2 text-[11px] md:text-xs text-gray-400">
            <span>粤ICP备2024000000号</span>
            <span className="hidden md:inline">|</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#0052D9]"
              tabIndex={0}
              aria-label="工信部备案查询"
            >
              工信部备案
            </a>
          </div>
          <div className="flex gap-2 mt-1 text-[11px] md:text-xs text-gray-400">
            <span>友情链接：</span>
            <a
              href="http://www.jmcgq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              tabIndex={0}
            >
              深圳机眸传感器科技有限公司
            </a>
            {/* 可继续添加更多友情链接 */}
          </div>
        </div>
      </div>
      {/* 底部分隔线 */}
      <div className="w-full h-px bg-gray-200" />
      <div className="text-center py-2 text-[11px] text-gray-400">
        © {new Date().getFullYear()} 东莞市南至巅传感器科技有限公司 保留所有权利
      </div>
    </footer>
  );
}

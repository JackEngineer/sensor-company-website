import React, { useState } from "react";

interface SearchBarProps {
  keyword: string;
  onSearch: (kw: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword, onSearch }) => {
  const [input, setInput] = useState(keyword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearch(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded shadow px-4 py-2">
      <input
        type="text"
        className="flex-1 outline-none border-none bg-transparent text-base text-gray-800"
        placeholder="搜索产品型号、名称、参数..."
        aria-label="搜索产品"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />
      <button
        className="px-4 py-2 bg-[#0052D9] text-white rounded hover:bg-[#003A8C] focus:outline-none focus:ring-2 focus:ring-[#0052D9]"
        aria-label="执行搜索"
        onClick={handleSearch}
        tabIndex={0}
      >
        搜索
      </button>
    </div>
  );
};

export default SearchBar;

import React from "react";
import "./SearchBar.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: (keyword: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
  isLoading = false
}) => {
  const handleSearch = () => {
    onSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchbar-wrapper">
      <input
        className="searchbar-input"
        placeholder="Tìm theo tên sân, từ khóa, thành phố, quận/huyện, môn thể thao..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        aria-label="Search courts"
        disabled={isLoading}
      />
      <button className="searchbar-button" onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Đang tìm...' : 'Tìm'}
      </button>
    </div>
  );
};

export default SearchBar;

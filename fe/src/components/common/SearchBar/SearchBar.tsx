import React from "react";
import "./SearchBar.css";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSearch: (keyword: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onSearch, isLoading = false }) => {
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
        placeholder="Tìm tên sân hoặc vị trí (ví dụ: Quận 1)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="Search courts"
        disabled={isLoading}
      />
      <button 
        className="searchbar-button" 
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? 'Đang tìm...' : 'Tìm'}
      </button>
    </div>
  );
};

export default SearchBar;

import React from "react";
import "./SearchBar.css";

interface Props {
  keyword: string;
  city: string;
  district: string;
  fieldTypes: string;
  onKeywordChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onFieldTypesChange: (value: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<Props> = ({
  keyword,
  city,
  district,
  fieldTypes,
  onKeywordChange,
  onCityChange,
  onDistrictChange,
  onFieldTypesChange,
  onSearch,
  isLoading = false
}) => {
  const handleSearch = () => {
    onSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-grid">
        <input
          className="searchbar-input"
          placeholder="Tìm tên sân hoặc từ khóa"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          onKeyDown={handleKeyPress}
          aria-label="Search courts by keyword"
          disabled={isLoading}
        />
        <input
          className="searchbar-input"
          placeholder="Thành phố"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          aria-label="Search courts by city"
          disabled={isLoading}
        />
        <input
          className="searchbar-input"
          placeholder="Quận / Huyện"
          value={district}
          onChange={(e) => onDistrictChange(e.target.value)}
          aria-label="Search courts by district"
          disabled={isLoading}
        />
        <select
          className="searchbar-input searchbar-select"
          value={fieldTypes}
          onChange={(e) => onFieldTypesChange(e.target.value)}
          aria-label="Search courts by field type"
          disabled={isLoading}
        >
          <option value="">Tất cả môn thể thao</option>
          <option value="badminton">Cầu lông</option>
          <option value="pickleball">Pickleball</option>
          <option value="tennis">Tennis</option>
          <option value="football">Bóng đá</option>
        </select>
      </div>

      <button className="searchbar-button" onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Đang tìm...' : 'Tìm'}
      </button>
    </div>
  );
};

export default SearchBar;

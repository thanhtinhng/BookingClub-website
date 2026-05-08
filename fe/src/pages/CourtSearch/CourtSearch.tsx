import { useEffect, useState } from "react";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import CourtSearchCard from "../../components/common/CourtSearchCard/CourtSearchCard";
import Pagination from "../../components/common/Pagination/Pagination";
import axios from "../../utils/axios.customize";
import "./CourtSearch.css";

interface CourtItem {
  id: string;
  name: string;
  address: string;
  priceRange: string;
  rating: number;
  images: string[];
}

interface SearchResponse {
  sportComplexes: CourtItem[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

interface SearchParams {
  keyword: string;
  city: string;
  district: string;
  fieldTypes: string;
}

function CourtSearch() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: "",
    city: "",
    district: "",
    fieldTypes: ""
  });
  const [results, setResults] = useState<CourtItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 9;

  useEffect(() => {
    void fetchCourts(searchParams, 1);
  }, []);

  const fetchCourts = async (params: SearchParams, targetPage: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResponse>('/api/v1/sportcomplex/search', {
        params: {
          keyword: params.keyword.trim(),
          city: params.city.trim(),
          district: params.district.trim(),
          fieldTypes: params.fieldTypes.trim(),
          page: targetPage,
          limit: pageSize
        }
      });

      setResults(response.data.sportComplexes);
      setTotalPages(response.data.pagination.totalPages);
      setPage(targetPage);
    } catch (err: any) {
      console.error('Search failed:', err);
      setError(err.response?.data?.message || 'Tìm kiếm thất bại. Vui lòng thử lại.');
      setResults([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    await fetchCourts(searchParams, 1);
  };

  const handlePageChange = async (newPage: number) => {
    await fetchCourts(searchParams, newPage);
  };

  return (
    <main className="court-search-page">
      <header className="search-header">
        <h1>Tìm kiếm sân</h1>
        <p>Tìm sân theo tên hoặc vị trí</p>
      </header>

      <SearchBar 
        keyword={searchParams.keyword}
        city={searchParams.city}
        district={searchParams.district}
        fieldTypes={searchParams.fieldTypes}
        onKeywordChange={(value) => setSearchParams((prev) => ({ ...prev, keyword: value }))}
        onCityChange={(value) => setSearchParams((prev) => ({ ...prev, city: value }))}
        onDistrictChange={(value) => setSearchParams((prev) => ({ ...prev, district: value }))}
        onFieldTypesChange={(value) => setSearchParams((prev) => ({ ...prev, fieldTypes: value }))}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {error && (
        <div className="error-message" style={{ padding: '20px', color: '#dc2626', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {isLoading && !results.length && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          Đang tìm kiếm...
        </div>
      )}

      {!isLoading && results.length === 0 && !error && Object.values(searchParams).some((value) => value.trim()) && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
          Không tìm thấy sân nào phù hợp
        </div>
      )}

      {results.length > 0 && (
        <section className="results">
          <div className="results-grid">
            {results.map((c) => (
              <CourtSearchCard key={c.id} court={c} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination 
              page={page} 
              totalPages={totalPages} 
              onChange={handlePageChange} 
            />
          )}
        </section>
      )}
    </main>
  );
}

export default CourtSearch;

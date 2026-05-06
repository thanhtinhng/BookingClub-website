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

function CourtSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CourtItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 9;

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);
    setError(null);
    setPage(1);

    try {
      const response = await axios.get<SearchResponse>('/api/v1/sportcomplex/search', {
        params: {
          keyword: keyword.trim(),
          page: 1,
          limit: pageSize
        }
      });

      setResults(response.data.sportComplexes);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err: any) {
      console.error('Search failed:', err);
      setError(err.response?.data?.message || 'Tìm kiếm thất bại. Vui lòng thử lại.');
      setResults([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResponse>('/api/v1/sportcomplex/search', {
        params: {
          keyword: query.trim(),
          page: newPage,
          limit: pageSize
        }
      });

      setResults(response.data.sportComplexes);
      setPage(newPage);
    } catch (err: any) {
      console.error('Page change failed:', err);
      setError('Tải trang thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="court-search-page">
      <header className="search-header">
        <h1>Tìm kiếm sân</h1>
        <p>Tìm sân theo tên hoặc vị trí</p>
      </header>

      <SearchBar 
        value={query} 
        onChange={(v) => setQuery(v)}
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

      {!isLoading && results.length === 0 && !error && query && (
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

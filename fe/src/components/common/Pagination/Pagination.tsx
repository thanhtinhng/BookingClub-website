import React from "react";
import "./Pagination.css";

interface Props {
  page: number;
  totalPages: number;
  onChange: (n: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, onChange }) => {
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);
  return (
    <div className="pagination">
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>«</button>
      {pages.map((p) => (
        <button key={p} className={p === page ? "active" : ""} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>»</button>
    </div>
  );
};

export default Pagination;

import React from "react";
import "./Pagination.css"; // Укажите правильный путь к вашим стилям

interface PaginationProps {
  currentPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <nav className="pagination-container">
      <div className="pagination">
        <button className="btn pagination-newer" onClick={handlePrevPage}>
          предыдущая
        </button>
        <span className="pagination-inner">
          <span className="pagination-active">{currentPage}</span>
        </span>
        <button className="btn pagination-older" onClick={handleNextPage}>
          следующая
        </button>
      </div>
    </nav>
  );
};

export default Pagination;

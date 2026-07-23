import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex justify-content-center align-items-center gap-2 mt-4">
      <button
        className="btn btn-outline-dark"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt; Previous
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`btn ${num === currentPage ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button
        className="btn btn-outline-dark"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &gt;
      </button>
    </nav>
  );
};

export default Pagination;
import React from "react";
import Button from "src/components/atoms/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, hasNextPage, hasPreviousPage, onNextPage, onPreviousPage, onPageChange, className = "" }) => {
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center justify-center space-x-2 ${className}`} aria-label="Pagination navigation">
      <Button onClick={onPreviousPage} disabled={!hasPreviousPage} variant="outline" size="sm" aria-label="Go to previous page">
        ←
      </Button>

      <div className="flex items-center space-x-1" role="list" aria-label="Page numbers">
        {getVisiblePages().map((page, index) => (
          <div key={index} role="listitem">
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500" aria-hidden="true">
                ...
              </span>
            ) : (
              <Button onClick={() => onPageChange(page as number)} variant={currentPage === page ? "primary" : "outline"} size="sm" aria-label={`Go to page ${page}`} aria-current={currentPage === page ? "page" : undefined}>
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button onClick={onNextPage} disabled={!hasNextPage} variant="outline" size="sm" aria-label="Go to next page">
        →
      </Button>
    </nav>
  );
};

export default Pagination;

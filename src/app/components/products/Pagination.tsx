'use client';

import React from 'react';
import ArrowRightIcon from '../icons/ArrowRightIcon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='flex gap-[20px] items-center justify-center mt-[40px]'>
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex w-[60px] h-[40px] justify-center items-center rounded-xl transition-colors rotate-180 ${
          currentPage === 1
            ? 'bg-rose/80 cursor-not-allowed'
            : 'bg-rose lg:hover:bg-rose-hover cursor-pointer'
        }`}
      >
        <ArrowRightIcon stylesClass='w-[20px] h-[20px] text-white' />
      </button>
      <div className='flex'>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`flex w-[40px] h-[40px] justify-center items-center rounded-full transition-colors font-semibold ${
              page === currentPage
                ? 'border-2 border-rose text-rose'
                : page === '...'
                ? 'cursor-default'
                : 'lg:hover:bg-gray-100 cursor-pointer'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex w-[60px] h-[40px] justify-center items-center rounded-xl transition-colors ${
          currentPage === totalPages
            ? 'bg-rose/80 cursor-not-allowed'
            : 'bg-rose lg:hover:bg-rose-hover cursor-pointer'
        }`}
      >
        <ArrowRightIcon stylesClass='w-[20px] h-[20px] text-white' />
      </button>
    </div>
  );
}

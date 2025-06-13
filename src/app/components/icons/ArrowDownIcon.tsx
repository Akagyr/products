import React from 'react';

export default function ArrowDownIcon({
  stylesClass,
  isOpen = false,
  oppenedStylesClass = 'transform rotate-180',
}: {
  stylesClass?: string;
  isOpen?: boolean;
  oppenedStylesClass?: string;
}) {
  return (
    <svg
      className={`${stylesClass} ${isOpen ? oppenedStylesClass : ''}`}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
    </svg>
  );
}

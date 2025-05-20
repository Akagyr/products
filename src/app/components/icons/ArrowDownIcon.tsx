import React from 'react';

export default function ArrowDownIcon({
  styleClass,
  isOpen = false,
  oppenedStyleClass = 'transform rotate-180',
}: {
  styleClass?: string;
  isOpen?: boolean;
  oppenedStyleClass?: string;
}) {
  return (
    <svg
      className={`${styleClass} ${isOpen ? oppenedStyleClass : ''}`}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
    </svg>
  );
}

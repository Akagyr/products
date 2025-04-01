import React from 'react';

export default function SearchIcon({ styleClass = '' }: { styleClass?: string }) {
  return (
    <svg focusable='false' viewBox='0 0 21 21' role='presentation' className={styleClass}>
      <g strokeWidth='2' stroke='currentColor' fill='none' fillRule='evenodd'>
        <path d='M19 19l-5-5' strokeLinecap='square'></path>
        <circle cx='8.5' cy='8.5' r='7.5'></circle>
      </g>
    </svg>
  );
}

import React from 'react';

export default function CartIcon({ stylesClass = '' }: { stylesClass?: string }) {
  return (
    <svg
      viewBox='0 0 48 48'
      xmlns='http://www.w3.org/2000/svg'
      className={stylesClass}
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path d='M0 0h48v48H0z' fill='none'></path>{' '}
        <g id='Shopicon'>
          {' '}
          <path d='M8,44h32c2.2,0,4-1.8,4-4l0-26h-8.18C34.863,8.334,29.934,4,24,4S13.137,8.334,12.181,14H4l0,26C4,42.2,5.8,44,8,44z M24,8 c3.719,0,6.845,2.555,7.737,6H16.263C17.155,10.555,20.281,8,24,8z M12,18v4h4v-4h16v4h4v-4h4l0,22L8,40l0-22H12z'></path>{' '}
        </g>{' '}
      </g>
    </svg>
  );
}

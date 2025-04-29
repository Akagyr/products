import React from 'react';

export default function QulityIcon({
    styles,
    secondColor = '#859c0e',
  }: {
    styles?: string;
    secondColor?: string;
  }) {
  return (
    <svg className={styles} focusable='false' viewBox='0 0 24 24' role='presentation'>
      <g strokeWidth='1.5' fill='none' fillRule='evenodd'>
        <path
          d='M11 13V1M17 2h-1c-2.76142 0-5 2.23858-5 5v2h1c2.76142 0 5-2.23858 5-5V2z'
          stroke={secondColor}
          strokeLinecap='square'
        ></path>
        <path stroke='#231f20' d='M18 17v6H4v-6'></path>
        <path stroke='#231f20' strokeLinecap='square' d='M1 13h20v4H1z'></path>
      </g>
    </svg>
  );
}

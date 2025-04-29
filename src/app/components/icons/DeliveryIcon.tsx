import React from 'react';

export default function DeliveryIcon({
  styles,
  secondColor = '#859c0e',
  width = '30px', 
  height = '30px',
}: {
  styles?: string;
  secondColor?: string;
  width?: string;
  height?: string;
}) {
  return (
    <svg
      className={styles}
      focusable='false'
      viewBox='0 0 24 24'
      role='presentation'
      width={width} 
      height={height} 
      style={{ minWidth: width, minHeight: height }}
    >
      <g strokeWidth='1.5' fill='none' fillRule='evenodd'>
        <path d='M6.5 3.25l12 6' stroke={secondColor}></path>
        <path stroke='#231f20' d='M23 7l-10 5L1 6M13 12v11'></path>
        <path stroke='#231f20' strokeLinecap='square' d='M23 7v10l-10 6-12-6V6l10-5z'></path>
      </g>
    </svg>
  );
}

import React from 'react';

export default function CartEmptyIcon() {
  return (
    <svg viewBox='0 0 200 180' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M40 40L65 95L160 95L175 40L40 40Z' fill='#f9f9f9' stroke='#e2e2e2' strokeWidth='3' />
      <path d='M65 95L55 125H170L160 95' fill='#f9f9f9' stroke='#e2e2e2' strokeWidth='3' />
      <path
        d='M80 55H130M80 70H150M80 85H145'
        stroke='#e2e2e2'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M82 110C82 110 82 138 100 138C118 138 118 110 118 110'
        stroke='#e0506e'
        strokeWidth='4'
        strokeLinecap='round'
      />
      <path
        d='M107 138C107 138 128 138 135 122'
        stroke='#e0506e'
        strokeWidth='4'
        strokeLinecap='round'
      />
      <circle cx='90' cy='150' r='10' fill='#f9f9f9' stroke='#e0506e' strokeWidth='3' />
      <circle cx='140' cy='150' r='10' fill='#f9f9f9' stroke='#e0506e' strokeWidth='3' />
    </svg>
  );
}

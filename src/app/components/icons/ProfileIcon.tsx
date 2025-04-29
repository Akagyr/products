import React from 'react';

export default function ProfileIcon({ styleClass = '' }: { styleClass?: string }) {
  return (
    <svg
      focusable='false'
      className={styleClass}
      viewBox='0 0 20 22'
      role='presentation'
    >
      <path
        d='M10 13c2.82 0 5.33.64 6.98 1.2A3 3 0 0 1 19 17.02V21H1v-3.97a3 3 0 0 1 2.03-2.84A22.35 22.35 0 0 1 10 13zm0 0c-2.76 0-5-3.24-5-6V6a5 5 0 0 1 10 0v1c0 2.76-2.24 6-5 6z'
        stroke='currentColor'
        strokeWidth='2'
        fill='none'
      ></path>
    </svg>
  );
}

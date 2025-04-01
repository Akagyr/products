import React from 'react';

export default function ArrowRigthIcon({ styleClass = '' }: { styleClass?: string }) {
  return (
    <svg className={styleClass} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill='currentColor'
        d='M22.707 11.293L15 3.586 13.586 5l6 6H2c-.553 0-1 .448-1 1s.447 1 1 1h17.586l-6 6L15 20.414l7.707-7.707c.391-.391.391-1.023 0-1.414z'
      />
    </svg>
  );
}

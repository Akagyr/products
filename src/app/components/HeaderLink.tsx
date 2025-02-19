import Link from 'next/link';
import React from 'react';

export default function HeaderLink({ path, text }: { path: string; text: string }) {
  return (
    <Link
      href={path}
      className='lg:hover:text-violet lg:hover:transition-colors'
    >
      {text}
    </Link>
  );
}

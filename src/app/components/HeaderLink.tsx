import Link from 'next/link';
import React from 'react';

export default function HeaderLink({ path, text }: { path: string; text: string }) {
  return (
    <Link
      href={path}
      className='px-[20px] py-[8px] border rounded-full border-gray-300 lg:hover:border-black lg:hover:transition-all lg:hover:duration-700'
    >
      {text}
    </Link>
  );
}

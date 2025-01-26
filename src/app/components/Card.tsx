import React from 'react';
import Link from 'next/link';
import { Category, Species } from '../types';

export default function Card<T extends Category | Species>({
  item,
  href,
}: {
  item: T;
  href: string;
}) {
  return (
    <Link href={href} className='relative cursor-pointer'>
      <img
        src={item.image}
        className='w-full aspect-[3/1] md:aspect-[5/3] rounded-3xl object-cover'
        alt={item.name}
      />
      <div className='absolute inset-0 bg-black/40 rounded-3xl' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <p className='text-2xl md:text-3xl 3xl:text-4xl text-white font-bold'>{item.name}</p>
      </div>
    </Link>
  );
}

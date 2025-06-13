'use client';

import React from 'react';
import Link from 'next/link';
import ArrowRightIcon from '../icons/ArrowRightIcon';

export default function MainCardRounded({
  href,
  src,
  name,
}: {
  href: string;
  src: string;
  name: string;
}) {
  return (
    <Link href={href} className='group block'>
      <div className='overflow-hidden rounded-full'>
        <img
          src={src}
          className='w-full rounded-full aspect-square object-cover object-center lg:transition-transform lg:duration-700 lg:ease-in-out lg:group-hover:scale-105 lg:will-change-transform lg:backface-hidden'
          alt={name}
        />
      </div>
      <div className='mt-[10px] font-semibold flex justify-center items-center lg:transition-colors lg:duration-300 lg:group-hover:text-rose-hover'>
        <span>{name}</span>
        <ArrowRightIcon stylesClass='hidden lg:block w-0 h-[16px] overflow-hidden transition-all duration-300 lg:group-hover:w-[16px] lg:group-hover:ml-[10px]' />
      </div>
    </Link>
  );
}

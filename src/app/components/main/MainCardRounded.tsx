'use client';

import React from 'react';
import Link from 'next/link';
import ArrowRigthIcon from '../icons/ArrowRigthIcon';

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
          className='w-full rounded-full aspect-square object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105 will-change-transform backface-hidden'
          alt={name}
        />
      </div>
      <div className='mt-[10px] font-semibold flex justify-center items-center transition-colors duration-300 group-hover:text-rose-hover'>
        <span>{name}</span>
        <ArrowRigthIcon styleClass='w-0 h-[16px] overflow-hidden transition-all duration-300 group-hover:w-[16px] group-hover:ml-[10px]' />
      </div>
    </Link>
  );
}

import Link from 'next/link';
import React from 'react';
import { getTypes } from './database/prismaQuries';
import { Type } from './types';

export default async function Homepage() {
  const types = await getTypes() as Type[];

  return (
    <div className='lg:flex-1 lg:flex lg:items-center lg:justify-center py-[30px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-[10px] w-full xl:max-w-[900px] 3xl:max-w-[1100px] mx-auto'>
        {types.map((el, idx) => (
          <Link
            key={idx}
            href={`/products?type=${el.name}`}
            className='relative cursor-pointer'
          >
            <img
              src={el.image}
              className='w-full aspect-[3/1] md:aspect-[5/3] rounded-3xl object-cover'
              alt={el.name}
            />
            <div className='absolute inset-0 bg-black/40 rounded-3xl' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-2xl md:text-3xl 3xl:text-4xl text-white font-bold'>{el.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

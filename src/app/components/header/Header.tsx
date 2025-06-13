import React from 'react';
import Link from 'next/link';
import HeaderCart from './HeaderCart';
import HeaderAccount from './HeaderAccount';
import HeaderMenu from './HeaderMenu';
import { getCategories } from '../../database/prismaQuries';
import { Category } from '../../types';
import HeaderSearch from './HeaderSearch';
import Image from 'next/image';

export default async function Header() {
  const categories = (await getCategories()) as Category[];

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-gray-100'>
      <div className='px-[20px] pt-[20px] 2xl:px-0 2xl:max-w-container 2xl:mx-auto'>
        <div className='flex justify-between items-center lg:gap-[30px] xl:gap-[40px] font-medium'>
          <Link href='/'>
            <Image
              src='/logo.jpg'
              width={686}
              height={196}
              className='max-w-[180px] sm:max-w-[200px] md:max-w-[245px] max-h-[70px]'
              alt='Logo'
              quality={100}
              priority
            />
          </Link>
          <HeaderSearch />
          <div className='flex gap-[20px] items-center'>
            <HeaderAccount />
            <div className='hidden lg:block h-[40px] w-[1px] bg-rose' />
            <HeaderCart />
          </div>
        </div>
        <HeaderMenu categories={categories} />
      </div>
      <hr />
    </header>
  );
}

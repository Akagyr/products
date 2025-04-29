import React from 'react';
import Link from 'next/link';
import HeaderCart from './HeaderCart';
import HeaderAccount from './HeaderAccount';
import HeaderMenu from './HeaderMenu';
import { getCategories } from '../../database/prismaQuries';
import { Category } from '../../types';
import HeaderSearch from './HeaderSearch';

export default async function Header() {
  const categories = (await getCategories()) as Category[];

  return (
    <header className='sticky z-10 bg-white top-0 left-0'>
      <div className='px-[20px] pt-[20px] 2xl:px-0 2xl:max-w-container 2xl:mx-auto'>
        <div className='flex lg:gap-[30px] xl:gap-[40px] items-center justify-between font-medium pb-[20px] lg:pb-0'>
          <Link href='/'>
            <img
              src='https://orchids-shop.com/cdn/shop/files/logo_claessen_orchids_and_plants_lang_since_2005_300x@2x.png?v=1678785046'
              className='max-w-[180px] sm:max-w-[200px] md:max-w-[250px] xl:max-w-[300px]'
              alt='Logo'
            />
          </Link>
          <div className='flex gap-[20px] lg:gap-[30px] xl:gap-[40px] items-center lg:w-full'>
            <HeaderSearch />
            <HeaderAccount />
            <HeaderCart />
          </div>
        </div>
        <HeaderMenu categories={categories} />
      </div>
      <hr />
    </header>
  );
}

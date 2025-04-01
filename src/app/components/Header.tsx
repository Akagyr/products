import React from 'react';
import Link from 'next/link';
import HeaderCart from './HeaderCart';
import HeaderAccount from './HeaderAccount';
import HeaderMenu from './HeaderMenu';
import { getCategories } from '../database/prismaQuries';
import { Category } from '../types';
import SearchIcon from './icons/SearchIcon';

export default async function Header() {
  const categories = (await getCategories()) as Category[];

  return (
    <header className='sticky z-10 bg-white top-0 left-0'>
      <div className='px-[20px] pt-[20px] lg:px-0 lg:max-w-container lg:mx-auto'>
        <div className='flex gap-[40px] items-center justify-between font-medium'>
          <Link href='/'>
            <img
              src='https://orchids-shop.com/cdn/shop/files/logo_claessen_orchids_and_plants_lang_since_2005_300x@2x.png?v=1678785046'
              className='max-w-[300px]'
              alt='Logo'
            />
          </Link>
          <form className='flex max-w-[800px] w-full'>
            <input
              type='text'
              className='w-full px-[15px] py-[10px] border border-rose rounded-s-xl'
              placeholder='Пошук...'
            />
            <button className='bg-rose lg:hover:bg-rose-hover text-white font-medium px-[15px] transition-colors rounded-e-xl'>
              <SearchIcon styleClass='size-[20px]'/>
            </button>
          </form>
          <div className='flex gap-[30px] items-center'>
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

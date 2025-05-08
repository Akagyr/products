import React from 'react';
import SearchIcon from '../icons/SearchIcon';

export default function HeaderSearch() {
  return (
    <>
      <button className='lg:hidden'>
        <SearchIcon styleClass='w-[22px] h-[22px] text-black' />
      </button>
      <form className='hidden lg:flex max-w-[800px] w-full'>
        <input
          type='text'
          className='w-full px-[15px] py-[10px] border border-rose rounded-s-xl'
          placeholder='Пошук...'
        />
        <button className='bg-rose lg:hover:bg-rose-hover text-white font-medium px-[15px] transition-colors rounded-e-xl'>
          <SearchIcon styleClass='w-[22px] h-[22px]' />
        </button>
      </form>
    </>
  );
}

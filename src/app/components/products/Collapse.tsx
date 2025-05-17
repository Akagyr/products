'use client';

import { useState } from 'react';
import SidebarCategoriesList from './SidebarFilters';
import { Product } from '../../types';

export default function Collapse({
  products,
  setFilteredProducts,
}: {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className='w-full lg:hidden text-sm md:text-base'>
      <button
        onClick={() => setIsActive(!isActive)}
        className='flex justify-between items-center w-full font-medium rounded-xl px-[15px] py-[10px] text-center border border-rose transition-colors relative lg:hover:bg-rose lg:hover:text-white'
      >
        <p>Фільтр</p>
        <svg
          className={`w-[15px] h-[15px] transition-transform duration-300 ${
            isActive ? 'transform rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isActive ? 'max-h-screen mt-[15px]' : 'max-h-0'
        }`}
      >
        <div className='mx-[10px]'>
          <SidebarCategoriesList products={products} setFilteredProducts={setFilteredProducts} />
        </div>
      </div>
    </div>
  );
}

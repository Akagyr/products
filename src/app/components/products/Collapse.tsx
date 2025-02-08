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
        className='flex justify-between w-full font-medium rounded-full px-[15px] py-[10px] text-center bg-gray-200 relative'
      >
        <p>Фільтр</p>
        <span
          className={`${
            isActive ? 'rotate-180' : 'rotate-0'
          } absolute right-[3%] top-[50%] translate-y-[-50%] font-bold duration-500`}
        >
          ↓
        </span>
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

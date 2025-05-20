'use client';

import { useState } from 'react';
import SidebarCategoriesList from './SidebarFilters';
import { Product } from '../../types';
import ArrowDownIcon from '../icons/ArrowDownIcon';

export default function Collapse({
  products,
  setFilteredProducts,
}: {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='w-full lg:hidden text-sm md:text-base'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex justify-between items-center w-full font-medium rounded-xl px-[15px] py-[10px] text-center border border-rose transition-colors relative lg:hover:bg-rose lg:hover:text-white'
      >
        <p>Фільтр</p>
        <ArrowDownIcon
          styleClass='w-[15px] h-[15px] transition-transform duration-300'
          isOpen={isOpen}
        />
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen mt-[15px]' : 'max-h-0'
        }`}
      >
        <div className='mx-[10px]'>
          <SidebarCategoriesList products={products} setFilteredProducts={setFilteredProducts} />
        </div>
      </div>
    </div>
  );
}

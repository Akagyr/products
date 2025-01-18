'use client';

import { useState } from 'react';
import SidebarCategoriesList from './SidebarCategoriesList';
import Sort from './Sort';
import { Category, Product } from '../../types';

export default function Collapse({
  products,
  categories,
  currentCategories,
  sortedProducts,
  setCurrentCategories,
  setSortedProducts,
  setLocalProducts,
}: {
  categories: Category[];
  currentCategories: string[];
  products: Product[];
  sortedProducts: Product[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLocalProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className='w-full lg:hidden'>
      <button
        onClick={() => setIsActive(!isActive)}
        className='flex justify-between w-full font-medium rounded-full px-[15px] py-[10px] text-center bg-gray-200 relative'
      >
        <p>Sort and Filter</p>
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
          <h2 className='font-medium mb-[5px]'>Фильтр:</h2>
          <SidebarCategoriesList
            categories={categories}
            currentCategories={currentCategories}
            setCurrentCategories={setCurrentCategories}
          />
          <Sort
            products={products}
            sortedProducts={sortedProducts}
            setLocalProducts={setLocalProducts}
            setSortedProducts={setSortedProducts}
          />
        </div>
      </div>
    </div>
  );
}

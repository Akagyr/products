'use client';

import React, { useState } from 'react';
import SidebarCategory from './SidebarCategory';
import { Category, Product } from '../types';

export default function Sidebar({
  categories,
  products,
  filterProducts,
}: {
  categories: Category[];
  products: Product[];
  filterProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentCategories.length === 0) {
      filterProducts(products);
      return;
    }

    const filteredProducts = products.filter((product) =>
      currentCategories.includes(product.category)
    );

    filterProducts(filteredProducts);
  };

  const categorisArr = categories.map((category) => (
    <SidebarCategory
      key={category.id}
      category={category}
      currentCategories={currentCategories}
      setCurrentCategories={setCurrentCategories}
    />
  ));

  return (
    <aside className='hidden lg:block min-w-[250px]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-[10px]'>
        <h3 className='font-semibold'>Фильтр:</h3>
        <div className='flex flex-col gap-[10px]'>{categorisArr}</div>
        <button type='submit' className='px-[10px] py-[5px] bg-green-600 rounded-lg w-fit'>
          Пошук
        </button>
      </form>
    </aside>
  );
}

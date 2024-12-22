import React from 'react';
import { Category, Product } from '../types';
import SidebarCategoriesList from './SidebarCategoriesList';

export default function Sidebar({
  categories,
  products,
  localProducts,
  sortedProducts,
  setFilteredProducts,
  setLocalProducts,
}: {
  categories: Category[];
  products: Product[];
  localProducts: Product[];
  sortedProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLocalProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <aside className='hidden lg:block min-w-[200px] xl:min-w-[240px]'>
      <h3 className='font-medium'>Фильтр:</h3>
      <hr className='w-[80%] my-[10px]' />
      <SidebarCategoriesList
        categories={categories}
        products={products}
        localProducts={localProducts}
        sortedProducts={sortedProducts}
        setFilteredProducts={setFilteredProducts}
        setLocalProducts={setLocalProducts}
      />
    </aside>
  );
}

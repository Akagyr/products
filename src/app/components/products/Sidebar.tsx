import React from 'react';
import SidebarFilters from './SidebarFilters';
import { Product } from '@/app/types';

export default function Sidebar({
  products,
  setFilteredProducts,
}: {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  return (
    <aside className='hidden lg:block lg:min-w-[180px] xl:min-w-[250px]'>
      <h2 className='font-medium'>Фильтр:</h2>
      <hr className='my-[10px]' />
      <SidebarFilters products={products} setFilteredProducts={setFilteredProducts} />
    </aside>
  );
}

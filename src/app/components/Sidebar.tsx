import React from 'react';
import { Category, Product } from '../types';
import SidebarCategoriesList from './SidebarCategoriesList';

export default function Sidebar({
  categories,
  currentCategories,
  setCurrentCategories,
}: {
  categories: Category[];
  currentCategories: string[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <aside className='hidden lg:block lg:min-w-[180px] xl:min-w-[200px]'>
      <h2 className='font-medium'>Фильтр:</h2>
      <hr className='my-[10px]' />
      <SidebarCategoriesList
        categories={categories}
        currentCategories={currentCategories}
        setCurrentCategories={setCurrentCategories}
      />
    </aside>
  );
}

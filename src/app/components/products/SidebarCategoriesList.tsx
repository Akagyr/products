import React from 'react';
import SidebarCategory from './SidebarCategory';
import { Category } from '../../types';

export default function SidebarCategoriesList({
  categories,
  currentCategories,
  setCurrentCategories,
}: {
  categories: Category[];
  currentCategories: string[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className='flex flex-col gap-[10px]'>
      {categories.map((category) => (
        <SidebarCategory
          key={category.id}
          category={category}
          currentCategories={currentCategories}
          setCurrentCategories={setCurrentCategories}
        />
      ))}
    </div>
  );
}

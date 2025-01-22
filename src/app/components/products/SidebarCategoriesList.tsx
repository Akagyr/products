import React from 'react';
import SidebarCategory from './SidebarCategory';
import { Category } from '../../types';

export default function SidebarCategoriesList({
  currentCategories,
  setCurrentCategories,
}: {
  currentCategories: string[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className='flex flex-col gap-[10px]'>
      <SidebarCategory
          category={'Test1'}
          currentCategories={currentCategories}
          setCurrentCategories={setCurrentCategories}
        />
        <SidebarCategory
          category={'Test2'}
          currentCategories={currentCategories}
          setCurrentCategories={setCurrentCategories}
        />
    </div>
  );
}

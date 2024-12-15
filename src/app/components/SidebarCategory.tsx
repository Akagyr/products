import React from 'react';
import { Category } from '../types';

export default function SidebarCategory({
  category,
  currentCategories,
  setCurrentCategories,
}: {
  category: Category;
  currentCategories: string[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const isChecked = currentCategories.includes(category.name);

  const handleChange = async (categoryInput: string) => {
    if(categoryInput === ''){
      setCurrentCategories(prev => prev.filter(cat => cat !== category.name));
    } else {
      setCurrentCategories(prev => [...prev, categoryInput]);
    }   
  };

  return (
    <div className='flex gap-[5px] items-center'>
      <input
        id={category.name}
        type={'checkbox'}
        checked={isChecked}
        onChange={() => handleChange(isChecked ? '' : category.name)}
      />
      <label htmlFor={category.name}>{category.name}</label>
    </div>
  );
}

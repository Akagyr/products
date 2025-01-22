import React from 'react';
import { Category } from '../../types';

export default function SidebarCategory({
  category,
  currentCategories,
  setCurrentCategories,
}: {
  category: string;
  currentCategories: string[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const isChecked = currentCategories.includes(category);

  const handleChange = async (categoryInput: string) => {
    if (categoryInput === '') {
      setCurrentCategories((prev) => prev.filter((cat) => cat !== category));
    } else {
      setCurrentCategories((prev) => [...prev, categoryInput]);
    }
  };

  return (
    <div className='flex items-center'>
      <label htmlFor={category} className='group flex items-center cursor-pointer'>
        <input
          id={category}
          type='checkbox'
          checked={isChecked}
          onChange={() => handleChange(isChecked ? '' : category)}
          className='hidden peer'
        />
        <span className='relative w-[20px] h-[20px] flex justify-center items-center border-2 border-gray-300 rounded-md shadow-md transition-all duration-500 peer-checked:border-[#b85aff] peer-checked:bg-[#b85aff]'>
          <span className='absolute inset-0 opacity-0 peer-checked:opacity-100 rounded-md transition-all duration-500' />
        </span>
        <span className='ml-[10px]'>{category}</span>
      </label>
    </div>
  );
}

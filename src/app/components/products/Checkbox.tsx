import React from 'react';

export default function Checkbox({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <div className='flex items-center'>
      <label htmlFor={id} className='group flex items-center cursor-pointer'>
        <input
          id={id}
          type='checkbox'
          className='hidden peer'
          checked={checked}
          onChange={onChange}
        />
        <span className='relative w-[20px] h-[20px] flex justify-center items-center border-2 border-gray-300 rounded-md shadow-md transition-all duration-500 peer-checked:border-[#b85aff] peer-checked:bg-[#b85aff]'>
          <span className='absolute inset-0 opacity-0 peer-checked:opacity-100 rounded-md transition-all duration-500' />
        </span>
        <span className='ml-[10px]'>{label}</span>
      </label>
    </div>
  );
}

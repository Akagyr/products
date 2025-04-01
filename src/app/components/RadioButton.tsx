import React from 'react';

export default function RadioButton({
  id,
  name,
  value,
  checked,
  onChange,
  label,
}: {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <div className='flex items-center'>
      <label htmlFor={id} className='group flex items-center cursor-pointer'>
        <input
          id={id}
          type='radio'
          name={name}
          value={value}
          className='hidden peer'
          checked={checked}
          onChange={onChange}
        />
        <span className='relative w-[20px] h-[20px] flex justify-center items-center border-2 rounded-full shadow-md transition-all duration-500 peer-checked:border-rose'>
          <span className='absolute w-[10px] h-[10px] rounded-full opacity-0 peer-checked:opacity-100 transition-all duration-500' />
        </span>
        <span className='ml-[10px]'>{label}</span>
      </label>
    </div>
  );
}

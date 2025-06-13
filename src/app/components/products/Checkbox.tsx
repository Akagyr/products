'use client';

import React from 'react';

export default function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      <input type='checkbox' className='sr-only peer' checked={checked} onChange={onChange} />
      <span className='w-[20px] h-[20px] border-2 border-gray-300 rounded-lg peer-checked:bg-rose peer-checked:border-rose transition-all duration-300' />
      <span>{label}</span>
    </label>
  );
}

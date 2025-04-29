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
      <span className='size-[20px] border-2 border-gray-400 rounded-md peer-checked:bg-rose peer-checked:border-rose transition-all duration-300' />
      <span>{label}</span>
    </label>
  );
}

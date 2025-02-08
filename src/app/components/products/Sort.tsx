'use client';

import React from 'react';

export default function Sort({
  currentSort,
  setCurrentSort,
}: {
  currentSort: string;
  setCurrentSort: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className='flex items-center gap-[20px] my-[20px] lg:my-0'>
      <label className='hidden md:block font-medium'>Сортування:</label>
      <select
        name='sort'
        value={currentSort}
        onChange={(e) => setCurrentSort(e.target.value)}
        className='cursor-pointer border-b pb-[5px]'
      >
        <option value='default'>по замовченню</option>
        <option value='nameBottom'>по назві (А - Я)</option>
        <option value='nameTop'>по назві (Я - А)</option>
        <option value='priceTop'>по ціні (низька {'>'} висока)</option>
        <option value='priceBottom'>по ціні (висока {'>'} низька)</option>
      </select>
    </div>
  );
}

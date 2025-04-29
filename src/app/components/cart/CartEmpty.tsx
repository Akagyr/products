'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function CartEmpty() {
  const router = useRouter();

  return (
    <div className='text-center py-[30px]'>
      <p className='text-gray-500 mb-[20px]'>Ваш кошик пустий!</p>
      <button
        onClick={() => router.back()}
        className='px-[10px] md:px-[20px] py-[8px] text-sm md:text-base text-center rounded-xl bg-gray-200 lg:hover:bg-gray-300 w-fit transition-colors'
      >
        Повернутись до покупок
      </button>
    </div>
  );
}

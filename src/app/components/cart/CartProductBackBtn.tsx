'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function CartProductBackBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='px-[10px] md:px-[20px] py-[8px] text-sm md:text-base text-center rounded-full bg-gray-200 lg:hover:bg-gray-300 w-fit transition-colors'
    >
      Повернутись до покупок
    </button>
  );
}

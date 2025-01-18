import React from 'react';
import Link from 'next/link';

export default function CartEmpty() {
  return (
    <div className='text-center py-[30px]'>
      <p className='text-gray-500 mb-[20px]'>Ваш кошик пустий!</p>
      <Link
        href='/'
        className='px-[15px] py-[8px] mt-[20px] rounded-full bg-gray-200 lg:hover:bg-gray-300 w-fit transition-colors'
      >
        Повернутись до покупок
      </Link>
    </div>
  );
}

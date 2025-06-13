'use client';

import { useCart } from '@/app/context/cartContext';
import React from 'react';
import Link from 'next/link';
import { formatPrice } from '@/app/helpers/formatPrice';

export default function CartTotal() {
  const { getCartTotal } = useCart();

  return (
    <div className='border-[1px] p-[30px] h-fit w-full xl:w-2/6 rounded-2xl xl:flex xl:flex-col'>
      <div className='text-xl font-semibold flex justify-between'>
        <p>До оплати:</p>
        <p>{formatPrice(getCartTotal())}</p>
      </div>
      <p className='border-y-[1px] my-[20px] py-[20px]'>
        Час та вартість доставки розраховується компанією перевізником
      </p>
      <Link
        href='/checkout'
        className='block px-[10px] md:px-[20px] py-[10px] text-base text-center rounded-xl bg-rose lg:hover:bg-rose-hover text-white w-full transition-colors'
      >
        Перейти до оформлення
      </Link>
    </div>
  );
}

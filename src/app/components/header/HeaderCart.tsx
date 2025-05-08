'use client';

import React from 'react';
import { useCart } from '../../context/cartContext';
import Link from 'next/link';
import CartIcon from '../icons/CartIcon';

export default function HeaderCart() {
  const { getCartCount } = useCart();

  return (
    <div className='lg:flex gap-[15px] items-center'>
      <Link href='/cart' className='relative'>
        <CartIcon styleClass='w-[30px] h-[30px]' />
        <div className='absolute top-[-2px] right-[-7px] flex justify-center items-center w-[20px] h-[20px] bg-rose rounded-full'>
          <span className='text-xs font-semibold text-white'>{getCartCount()}</span>
        </div>
      </Link>
      <p className='hidden lg:block font-semibold'>Кошик</p>
    </div>
  );
}

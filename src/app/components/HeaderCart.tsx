'use client';

import React from 'react';
import { useCart } from '../context/cartContext';
import Link from 'next/link';
import CartIcon from './icons/CartIcon';

export default function HeaderCart() {
  const { getCartCount } = useCart();

  return (
    <div className='flex gap-[15px] items-center'>
      <Link href='/cart' className='relative'>
        <CartIcon styleClass='size-[30px]' />
        <div className='absolute top-[-2px] right-[-7px] flex justify-center items-center size-[20px] bg-rose rounded-full'>
          <span className='text-xs font-semibold text-white'>{getCartCount()}</span>
        </div>
      </Link>
      <p className='font-semibold'>Кошик</p>
    </div>
  );
}

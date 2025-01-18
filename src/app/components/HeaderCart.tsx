'use client';

import React from 'react';
import { useCart } from '../context/cartContext';
import Link from 'next/link';
import HeaderCartIcon from './HeaderCartIcon';

export default function HeaderCart() {
  const { getCartTotal } = useCart();

  return (
    <Link
      href='/cart'
      className='min-w-[150px] flex gap-[5px] items-end justify-center px-[10px] py-[5px] border rounded-full border-violet text-violet lg:hover:border-violet-hover lg:hover:text-violet-hover lg:hover:transform-colors group'
    >
      <HeaderCartIcon />
      <span>/</span>
      <p>{getCartTotal().toFixed(2)} грн</p>
    </Link>
  );
}

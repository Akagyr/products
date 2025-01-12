'use client';

import React from 'react';
import { useCart } from '../context/cartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function HeaderCart() {
  const { getCartTotal } = useCart();

  return (
    <Link
      href='/cart'
      className='min-w-[150px] flex gap-[5px] items-end justify-center px-[10px] py-[5px] border rounded-full border-gray-300 lg:hover:border-black lg:hover:transform-all lg:hover:duration-700'
    >
      <Image src='/cart.svg' width={25} height={25} alt='cart icon' />
      <span>/</span>
      <p>{getCartTotal().toFixed(2)} грн</p>
    </Link>
  );
}

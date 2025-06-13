'use client';

import React from 'react';
import { useCart } from '../../context/cartContext';
import Link from 'next/link';
import CartIcon from '../icons/CartIcon';

export default function HeaderCart() {
  const { getCartCount } = useCart();
  const cartItemsCount = getCartCount();

  return (
    <Link
      href='/cart'
      className='flex items-center gap-[15px] lg:px-[15px] lg:py-[10px] rounded-2xl lg:hover:bg-gray-100 transition-all duration-200 group'
    >
      <div className='relative inline-block'>
        <CartIcon stylesClass='w-[35px] h-[35px]' />
        <div className='absolute top-[-2px] right-[-7px] flex justify-center items-center w-[25px] h-[25px] bg-rose rounded-full translate-y-0'>
          <span className='text-xs font-semibold text-white'>
            {cartItemsCount > 99 ? '99+' : cartItemsCount}
          </span>
        </div>
      </div>
      <div className='hidden lg:block text-left'>
        <p className='font-semibold lg:group-hover:text-rose transition-colors'>Кошик</p>
        <p className='text-sm text-gray-500'>
          {cartItemsCount}{' '}
          {cartItemsCount === 1
            ? 'товар'
            : cartItemsCount < 5 && cartItemsCount > 1
            ? 'товари'
            : 'товарів'}
        </p>
      </div>
    </Link>
  );
}

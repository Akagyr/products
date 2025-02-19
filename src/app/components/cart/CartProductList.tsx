'use client';

import CartProductListItem from '@/app/components/cart/CartProductListItem';
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/cartContext';
import CartProductBackBtn from './CartProductBackBtn';

export default function CartProductList() {
  const { cartItems, getCartTotal } = useCart();

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='text-center py-[30px]'>
          <p className='text-gray-500 mb-[20px]'>Ваш кошик пустий!</p>
          <CartProductBackBtn />
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartProductListItem key={item.id} product={item} />
          ))}
          <div className='mt-[20px] text-center sm:text-right'>
            <div className='sm:text-lg lg:text-xl font-semibold'>
              До оплати: {getCartTotal().toFixed(2)} грн
            </div>
            <div className='flex flex-col sm:flex-row gap-[20px] items-center mt-[20px] justify-end'>
              <CartProductBackBtn />
              <Link
                href='/checkout'
                className='px-[10px] md:px-[20px] py-[8px] text-sm md:text-base text-center rounded-full bg-[#b85aff] lg:hover:bg-[#7c24c0] text-white w-fit transition-colors'
              >
                Перейти до оформлення
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import CartProduct from '@/app/components/CartProduct';
import React from 'react';
import Link from 'next/link';
import CartEmpty from '@/app/components/CartEmpty';
import { useCart } from '@/app/context/cartContext';

export default function CartProductList() {
  const { cartItems, getCartTotal } = useCart();

  return (
    <div>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          {cartItems.map((item) => (
            <CartProduct key={item.product.id} item={item} />
          ))}
          <div className='mt-[20px] text-center sm:text-right'>
            <div className='sm:text-lg lg:text-xl font-semibold'>
              До оплати: {getCartTotal().toFixed(2)} грн
            </div>
            <div className='flex flex-col sm:flex-row gap-[20px] items-center mt-[20px] justify-end'>
              <Link
                href='/'
                className='px-[10px] md:px-[20px] py-[8px] text-sm md:text-base text-center rounded-full bg-gray-200 lg:hover:bg-gray-300 w-fit transition-colors'
              >
                Повернутись до покупок
              </Link>
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

'use client';

import CartEmpty from '@/app/components/CartEmpty';
import CartProduct from '@/app/components/CartProduct';
import { useCart } from '@/app/context/cartContext';
import Link from 'next/link';
import React from 'react';

export default function CartPage() {
  const { cartItems, getCartSubtotal } = useCart();

  return (
    <div className='lg:max-w-[1200px] lg:mx-auto my-[40px]'>
      <h1 className='text-xl md:text-2xl font-bold mb-[10px]'>Кошик</h1>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          {cartItems.map((item) => (
            <CartProduct key={item.product.id} item={item} />
          ))}
          <div className='mt-[20px] text-center lg:text-right'>
            <div className='lg:text-xl font-semibold'>
              До оплати: {getCartSubtotal().toFixed(2)} грн
            </div>
            <div className='flex flex-col lg:flex-row gap-[20px] items-center mt-[20px] justify-end'>
              <Link
                href='/'
                className='px-[10px] md:px-[20px] py-[8px] text-sm md:text-base text-center rounded-full bg-gray-200 lg:hover:bg-gray-300 w-fit transition-colors'
              >
                Повернутись до покупок
              </Link>
              <button className='px-[10px] md:px-[20px] py-[8px] text-sm md:text-base text-center rounded-full bg-green-400 lg:hover:bg-green-500 w-fit transition-colors'>
                Перейти до оформлення
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

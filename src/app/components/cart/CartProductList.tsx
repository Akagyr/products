'use client';

import CartProductListItem from '@/app/components/cart/CartProductListItem';
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/cartContext';
import CartEmpty from './CartEmpty';

export default function CartProductList() {
  const { cartItems, getCartTotal } = useCart();

  return (
    <div>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className='flex flex-col xl:flex-row gap-[30px] xl:gap-[50px] justify-between'>
          <div className='border-[1px] rounded-2xl h-fit'>
            {cartItems.map((item) => (
              <CartProductListItem
                key={item.id}
                product={item}
                firstProduct={item === cartItems[0]}
              />
            ))}
          </div>
          <div className='border-[1px] p-[30px] h-fit w-full rounded-2xl xl:w-[400px] xl:flex xl:flex-col'>
            <div className='text-xl font-semibold flex justify-between'>
              <p>До оплати:</p>
              <p>{getCartTotal().toFixed(2)} грн</p>
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
        </div>
      )}
    </div>
  );
}

'use client';

import CartProductListItem from '@/app/components/cart/CartProductListItem';
import React from 'react';
import { useCart } from '@/app/context/cartContext';
import CartEmpty from './CartEmpty';
import CartTotal from './CartTotal';

export default function CartProductList() {
  const { cartItems } = useCart();

  return (
    <>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className='flex flex-col xl:flex-row gap-[30px] xl:gap-[150px] mt-[20px]'>
          <div className='border-[1px] rounded-2xl h-fit xl:w-4/6'>
            {cartItems.map((item) => (
              <CartProductListItem
                key={item.id}
                product={item}
                firstProduct={item === cartItems[0]}
              />
            ))}
          </div>
          <CartTotal />
        </div>
      )}
    </>
  );
}

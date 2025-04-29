'use client';

import React from 'react';
import { useCart } from '../../context/cartContext';
import { redirect } from 'next/navigation';
import CheckoutProductListItem from './CheckoutProductListItem';

export default function CheckoutProductList() {
  const { cartItems, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    redirect('/');
  }

  return (
    <div className='border px-[20px] pb-[20px] rounded-lg h-fit w-full'>
      {cartItems.map((item) => (
        <CheckoutProductListItem key={item.id} product={item} />
      ))}
      <div className='mt-[20px] text-right'>
        <div className='flex justify-between text-lg md:text-xl font-semibold'>
          <span>До оплати:</span>
          <span>{getCartTotal().toFixed(2)} грн</span>
        </div>
      </div>
    </div>
  );
}

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
      <h2 className='lg:text-xl font-semibold py-[15px] border-b'>Замовлення № {1}</h2>
      {cartItems.map((item) => (
        <CheckoutProductListItem key={item.id} product={item} />
      ))}
      <div className='mt-[20px] text-right'>
        <div className='sm:text-lg md:text-xl font-semibold'>
          До оплати: {getCartTotal().toFixed(2)} грн
        </div>
      </div>
    </div>
  );
}

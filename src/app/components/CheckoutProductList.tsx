'use client';

import React from 'react';
import { useCart } from '../context/cartContext';
import { redirect } from 'next/navigation';

export default function CheckoutProductList() {
  const { cartItems, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    redirect('/');
  }

  return (
    <div className='border px-[20px] pb-[20px] rounded-lg h-fit w-full'>
      <h2 className='lg:text-xl font-semibold py-[15px] border-b'>Замовлення № {1}</h2>
      {cartItems.map((item) => (
        <div key={item.product.id}>
          <div className='grid grid-cols-[15%_56%_25%] gap-[2%] md:gap-[2%] items-center text-center w-full py-[15px] border-b text-sm sm:text-base'>
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className='object-cover rounded-full size-full'
            />
            <p>
              {item.product.name} {item.product.category}
            </p>
            <p>{(item.product.price * item.quantity).toFixed(2)} грн</p>
          </div>
        </div>
      ))}
      <div className='mt-[20px] text-right'>
        <div className='sm:text-lg md:text-xl font-semibold'>
          До оплати: {getCartTotal().toFixed(2)} грн
        </div>
      </div>
    </div>
  );
}

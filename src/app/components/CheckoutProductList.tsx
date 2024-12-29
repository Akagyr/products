'use client';

import React from 'react';
import { useCart } from '../context/cartContext';
import { redirect } from 'next/navigation';

export default function CheckoutProductList() {
  const { cartItems, getCartSubtotal } = useCart();

  if(cartItems.length === 0) {
    redirect('/');
  }

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.product.id}>
          <div className='hidden lg:grid grid-cols-[50px_200px_1fr_1fr] gap-[10px] items-center w-full py-[15px] border-b'>
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className='object-cover rounded size-full'
            />
            <p className='text-center'>
              {item.product.name} {item.product.category}
            </p>
            <p className='text-center'>{item.quantity} од</p>
            <span className='text-center'>
              {(item.product.price * item.quantity).toFixed(2)} грн
            </span>
          </div>
          <div className='grid lg:hidden grid-cols-[80px_1fr] gap-[40px] py-[15px] border-b'>
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className='object-cover rounded w-full'
            />
            <div className='flex flex-col gap-[5px]'>
              <p className='text-sm lg:text-base'>
                {item.product.name} {item.product.category}
              </p>
              <p className='text-sm'>{item.quantity} од</p>
              <p className='text-sm'>{(item.product.price * item.quantity).toFixed(2)} грн</p>
            </div>
          </div>
        </div>
      ))}
      <div className='mt-[20px] text-center lg:text-right'>
        <div className='lg:text-xl font-semibold'>
          До оплати: {getCartSubtotal().toFixed(2)} грн
        </div>
      </div>
    </div>
  );
}

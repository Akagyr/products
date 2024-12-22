'use client';

import { useCart } from '@/app/context/cartContext';
import Link from 'next/link';
import React from 'react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartProductQuantity, getCartSubtotal } = useCart();

  return (
    <div className='container max-w-[1200px] mx-auto my-[40px]'>
      <h1 className='text-2xl font-bold mb-[10px]'>Кошик</h1>
      {cartItems.length === 0 ? (
        <div className='text-center py-[30px]'>
          <p className='text-gray-500 mb-[20px]'>Ваш кошик пустий!</p>
          <Link
            href='/'
            className='px-[15px] py-[8px] mt-[20px] rounded-lg bg-gray-200 hover:bg-gray-300 w-fit transition-colors'
          >
            Повернутись до покупок
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className='grid grid-cols-[64px_1fr_1fr_1fr_1fr_1fr_100px] gap-[10px] items-center w-full py-[15px] border-b'
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className='object-cover rounded size-full w-[65px]'
              />
              <p className='text-center'>{item.product.name}</p>
              <p className='text-center'>{item.product.category}</p>
              <p className='text-center'>{item.product.price.toFixed(2)} грн</p>
              <div className='flex items-center gap-[10px] justify-center'>
                <button
                  onClick={() => updateCartProductQuantity(item.product.id, item.quantity - 1)}
                  className='px-[10px] py-[1px] bg-gray-200 hover:bg-gray-300 rounded'
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateCartProductQuantity(item.product.id, item.quantity + 1)}
                  className='px-[10px] py-[1px] bg-gray-200 hover:bg-gray-300 rounded'
                >
                  +
                </button>
              </div>
              <span className='text-center'>
                {(item.product.price * item.quantity).toFixed(2)} грн
              </span>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className='text-white px-[15px] py-[8px] rounded-lg bg-red-600 hover:bg-red-800 w-fit transition-colors'
              >
                Видалити
              </button>
            </div>
          ))}
          <div className='mt-[20px] text-right'>
            <div className='text-xl font-semibold'>До оплати: {getCartSubtotal().toFixed(2)} грн</div>
            <div className='flex gap-[20px] items-center justify-end'>
              <Link
                href='/'
                className='px-[15px] py-[8px] mt-[20px] rounded-lg bg-gray-200 hover:bg-gray-300 w-fit transition-colors'
              >
                Повернутись до покупок
              </Link>
              <button className='px-[15px] py-[8px] mt-[20px] rounded-lg bg-green-300 hover:bg-green-400 w-fit transition-colors'>
                Перейти до оформлення
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

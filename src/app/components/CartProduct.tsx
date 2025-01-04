import React from 'react';
import { useCart } from '../context/cartContext';
import { CartItem } from '../types';

export default function CartProduct({ item }: { item: CartItem }) {
  const { removeFromCart } = useCart();

  return (
    <>
      <div className='hidden lg:grid grid-cols-[60px_1fr_1fr_120px] gap-[10px] items-center w-full py-[15px] border-b'>
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className='object-cover rounded-full w-[60px] h-[60px]'
        />
        <p className='text-center'>{item.product.name} {item.product.category}</p>
        <p className='text-center'>{item.product.price.toFixed(2)} грн</p>
        <button
          onClick={() => removeFromCart(item.product.id)}
          className='text-white px-[15px] py-[8px] rounded-full bg-red-600 lg:hover:bg-red-800 w-fit transition-colors'
        >
          Видалити
        </button>
      </div>
      <div className='grid lg:hidden grid-cols-[80px_1fr] gap-[40px] py-[15px] border-b'>
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className='object-cover rounded w-full'
        />
        <div className='flex flex-col gap-[5px]'>
          <div className='flex justify-between items-center w-full'>
            <p className='text-sm lg:text-base'>
              {item.product.name} {item.product.category}
            </p>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className='text-sm font-medium text-red-600 w-fit'
            >
              X
            </button>
          </div>
          <div className='flex gap-[20px] items-center'>
            <p className='text-sm'>{item.product.price.toFixed(2)} грн</p>
          </div>
        </div>
      </div>
    </>
  );
}

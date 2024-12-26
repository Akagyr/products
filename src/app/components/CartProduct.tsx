import React from 'react';
import { CartItem, useCart } from '../context/cartContext';

export default function CartProduct({ item }: { item: CartItem }) {
  const { removeFromCart, updateCartProductQuantity } = useCart();

  return (
    <>
      <div className='hidden lg:grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_120px] gap-[10px] items-center w-full py-[15px] border-b'>
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className='object-cover rounded size-full'
        />
        <p className='text-center'>{item.product.name}</p>
        <p className='text-center'>{item.product.category}</p>
        <p className='text-center'>{item.product.price.toFixed(2)} грн</p>
        <div className='flex items-center gap-[10px] justify-center'>
          <button
            onClick={() => updateCartProductQuantity(item.product.id, item.quantity - 1)}
            className='px-[10px] py-[1px] bg-gray-200 lg:hover:bg-gray-300 rounded-full'
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => updateCartProductQuantity(item.product.id, item.quantity + 1)}
            className='px-[10px] py-[1px] bg-gray-200 lg:hover:bg-gray-300 rounded-full'
          >
            +
          </button>
        </div>
        <span className='text-center'>{(item.product.price * item.quantity).toFixed(2)} грн</span>
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
            <div className='flex items-center gap-[10px]'>
              <button
                onClick={() => updateCartProductQuantity(item.product.id, item.quantity - 1)}
                className='px-[10px] py-[1px] bg-gray-200 rounded-full'
              >
                -
              </button>
              <p className='text-sm'>{item.quantity}</p>
              <button
                onClick={() => updateCartProductQuantity(item.product.id, item.quantity + 1)}
                className='px-[10px] py-[1px] bg-gray-200 rounded-full'
              >
                +
              </button>
            </div>
          </div>
          <p className='text-sm'>{(item.product.price * item.quantity).toFixed(2)} грн</p>
        </div>
      </div>
    </>
  );
}

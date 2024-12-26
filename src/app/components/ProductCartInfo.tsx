import React from 'react';
import { Product } from '../types';

export default function ProductCartInfo({ product }: { product: Product }) {
  return (
    <>
      <h2 className='font-semibold md:text-lg'>
        {product.name} {product.category}
      </h2>
      <p className='text-xs'>Арт.11111</p>
      <div className='flex flex-col gap-[5px]'>
        <p className='text-xs md:text-sm'>Висота: {100} см</p>
        <p className='text-xs md:text-sm'>Кількість стебл: {4}</p>
      </div>
      <div className='flex flex-col gap-[5px]'>
        <div className='flex flex-col gap-[10px]'>
          {product.price < 300 ? (
            <p className='text-sm md:text-base'>{product.price} грн</p>
          ) : (
            <div className='flex gap-[10px] items-center justify-center'>
              <p className='line-through text-sm md:text-base'>{product.price} грн</p>
              <p className='text-[#cf0000] text-sm md:text-base'>{product.price - product.price * 0.2} грн</p>
            </div>
          )}
        </div>
        <p className='text-green-600 text-xs md:text-sm'>Є в наявності</p>
      </div>
    </>
  );
}

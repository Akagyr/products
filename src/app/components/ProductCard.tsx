import React from 'react';
import { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='max-w-[350px] border-[1px] border-[#ccc] rounded-lg mx-auto'>
      <img src={product.imageUrl} alt={product.name} className='w-full rounded-t-lg' />
      <div className='px-[20px] py-[10px] flex flex-col gap-[10px]'>
        <h3 className='font-bold'>{product.name}</h3>
        <p className='color-[#333]'>{product.price}</p>
        <button className='px-[15px] py-[8px] rounded-lg bg-[#8253a7] w-fit'>Buy</button>
      </div>
    </div>
  );
}

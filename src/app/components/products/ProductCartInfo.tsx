import React from 'react';
import { Product } from '../../types';

export default function ProductCartInfo({ product }: { product: Product }) {
  return (
    <div className='flex flex-col gap-[10px] justify-between'>
      <p className='text-lg text-rose font-medium'>{product.price} грн</p>
    </div>
  );
}

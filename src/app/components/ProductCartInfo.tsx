import React from 'react';
import { Product } from '../types';

export default function ProductCartInfo({ product }: { product: Product }) {
  return (
    <>
      <h2 className='font-semibold md:text-lg'>
        {product.name} {product.category}
      </h2>
      <p className='text-sm md:text-base'>{product.price} грн</p>
    </>
  );
}

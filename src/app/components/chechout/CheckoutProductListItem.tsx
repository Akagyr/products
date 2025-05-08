import { Product } from '@/app/types';
import React from 'react';

export default function CheckoutProductListItem({ product }: { product: Product }) {
  return (
    <div className='grid grid-cols-[19%_51%_26%] lg:grid-cols-[15%_56%_25%] gap-[2%] md:gap-[2%] items-center text-center w-full py-[15px] border-b text-sm sm:text-base'>
      <img
        src={product.images[0]}
        alt={`${product.category.name} ${product.species.name} ${product.name}`}
        className='object-cover rounded-full w-full h-full max-w-[60px]'
      />
      <p className='text-left'>
        {product.category.name} {product.species.name} {product.name}
      </p>
      <p>{product.price.toFixed(2)} грн</p>
    </div>
  );
}

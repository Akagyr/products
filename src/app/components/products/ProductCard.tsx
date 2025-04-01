import React from 'react';
import { Product } from '../../types';
import ProductCartInfo from './ProductCartInfo';
import NavigationLink from '../NavigationLink';
import ProductBuyBtn from '../ProductBuyBtn';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='size-full rounded-xl flex flex-col gap-[20px] justify-between flex-1 shadow-xl text-center'>
      <NavigationLink href={`/${product.id}`} name={product.name} type={'product'}>
        <div className='overflow-hidden rounded-t-xl group'>
          <img
            className='w-full rounded-t-xl h-auto object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 will-change-transform backface-hidden'
            src={product.images[0]}
          />
        </div>
        <h2 className='px-[10px] pt-[15px] font-medium line-clamp-2 lg:hover:text-rose'>
          {product.species.name} {product.name}
        </h2>
      </NavigationLink>
      <div className='flex flex-col gap-[15px] px-[10px] pb-[15px]'>
        <ProductCartInfo product={product} />
        <ProductBuyBtn product={product} />
      </div>
    </div>
  );
}

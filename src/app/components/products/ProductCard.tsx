import React from 'react';
import { Product } from '../../types';
import ProductCartInfo from './ProductCartInfo';
import NavigationLink from '../NavigationLink';
import ProductBuyBtn from '../ProductBuyBtn';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='rounded-2xl text-center border border-gray-200'>
      <NavigationLink href={`/${product.id}`} name={product.name} type={'product'}>
        <div className='overflow-hidden rounded-t-xl group'>
          <img
            className='w-full rounded-t-2xl object-cover lg:transition-transform lg:duration-700 lg:ease-in-out lg:group-hover:scale-105'
            src={product.images[0]}
          />
        </div>
        <h2 className='px-[10px] pt-[15px] font-medium line-clamp-2 min-h-[65px] lg:hover:text-rose'>
          {product.species.name} {product.name}
        </h2>
      </NavigationLink>
      <div className='flex flex-col gap-[15px] px-[10px] py-[15px] mt-auto'>
        <ProductCartInfo product={product} />
        <ProductBuyBtn product={product} />
      </div>
    </div>
  );
}

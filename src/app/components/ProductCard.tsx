import React from 'react';
import { Product } from '../types';
import ProductCardImageSwiper from './ProductCardImageSwiper';
import ProductCardBuyBtn from './ProductCardBuyBtn';
import ProductCartInfo from './ProductCartInfo';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='size-full rounded-3xl mx-auto flex flex-col lg:hover:-translate-y-1 lg:hover:transform-all lg:hover:duration-1000 shadow-xl'>
      <img className='w-full aspect-[5/6] rounded-t-3xl object-cover' src={product.imageUrl} />
      <div className='pt-[10px] pb-[15px] px-[10px] 3xl:p-[20px] flex flex-col gap-[5px] md:gap-[10px] flex-1 justify-between items-center text-center'>
        <ProductCartInfo product={product} />
        <ProductCardBuyBtn product={product} />
      </div>
    </div>
  );
}

import React from 'react';
import { Product } from '../types';
import ProductCardImageSwiper from './ProductCardImageSwiper';
import ProductCardBuyBtn from './ProductCardBuyBtn';
import ProductCartInfo from './ProductCartInfo';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='max-w-[350px] h-full rounded-3xl mx-auto flex flex-col hover:-translate-y-1 hover:transform-all hover:duration-1000 shadow-xl'>
      <ProductCardImageSwiper productImage={product.imageUrl} />
      <div className='p-[20px] flex flex-col gap-[10px] flex-1 justify-between items-center text-center'>
        <ProductCartInfo product={product} />
        <ProductCardBuyBtn product={product} />
      </div>
    </div>
  );
}

import React from 'react';
import { Product } from '../types';
import ProductCardImageSwiper from './ProductCardImageSwiper';
import ProductCardBuyBtn from './ProductCardBuyBtn';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className='max-w-[270px] h-full border-[1px] border-[#ccc] rounded-lg mx-auto flex flex-col'>
      <ProductCardImageSwiper productImage={product.imageUrl} />
      <div className='px-[20px] py-[10px] flex flex-col gap-[10px] flex-1 justify-between'>
        <p>
          {product.name} {product.category} {100} см
        </p>
        <div className='flex flex-col gap-[10px]'>
          {product.price < 100 ? (
            <p>{product.price} грн</p>
          ) : (
            <div className='flex gap-[10px] items-center'>
              <p className='line-through'>{product.price} грн</p>
              <p className='text-[#cf0000]'>{product.price} грн</p>
            </div>
          )}
          <ProductCardBuyBtn product={product} />
        </div>
      </div>
    </div>
  );
}

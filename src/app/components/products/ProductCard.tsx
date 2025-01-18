import React from 'react';
import { Product } from '../../types';
import ProductBuyBtn from '../ProductBuyBtn';
import ProductCartInfo from './ProductCartInfo';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/${product.id}`}
      className='size-full rounded-3xl mx-auto flex flex-col shadow-xl'
    >
      <img className='w-full aspect-[5/6] rounded-t-3xl object-cover' src={product.imageUrl} />
      <div className='pt-[10px] pb-[15px] px-[10px] 3xl:pt-[10px] 3xl:pb-[20px] flex flex-col gap-[5px] md:gap-[10px] flex-1 justify-between items-center text-center'>
        <ProductCartInfo product={product} />
        <ProductBuyBtn product={product} />
      </div>
    </Link>
  );
}

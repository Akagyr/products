import { formatPrice } from '@/app/helpers/formatPrice';
import { ProductSearchResult } from '@/app/types';
import Link from 'next/link';
import React from 'react';

export default function HeaderSearchListItem({
  product,
  handleProductClick,
}: {
  product: ProductSearchResult;
  handleProductClick: () => void;
}) {
  return (
    <li className='border-b border-gray-100 last:border-b-0' role='option'>
      <Link
        href={`/${product.id}`}
        className='flex items-center p-[10px] lg:hover:bg-gray-50 transition-colors'
        onClick={handleProductClick}
      >
        <div className='flex-shrink-0 w-[70px] h-[70px] mr-[15px]'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover rounded-xl'
            loading='lazy'
          />
        </div>
        <div className='flex-grow'>
          <p className='font-medium'>
            {product.species.name} {product.name}
          </p>
          <p className='text-rose'>{formatPrice(product.price)}</p>
        </div>
      </Link>
    </li>
  );
}

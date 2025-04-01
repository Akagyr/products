import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-[20px] md:gap-[30px]'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

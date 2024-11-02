import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className='grid grid-cols-4 gap-[50px]'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import ProductList from './ProductList';
import Sidebar from './Sidebar';
import Sort from './Sort';
import { Category, Product } from '../types';

export default function HomePageContainer({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [localProducts, setLocalProducts] = useState<Product[]>(products);

  return (
    <div className='flex py-[20px]'>
      <Sidebar categories={categories} products={products} filterProducts={setLocalProducts} />
      <div>
        <div className='flex items-center justify-between'>
          <div>Знайдено: {localProducts.length}</div>
          <Sort />
        </div>
        <ProductList products={localProducts} />
      </div>
    </div>
  );
}

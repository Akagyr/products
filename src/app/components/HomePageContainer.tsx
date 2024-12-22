'use client';

import React, { useState } from 'react';
import ProductsList from './ProductsList';
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  return (
    <div className='flex py-[40px]'>
      <Sidebar
        categories={categories}
        products={products}
        localProducts={localProducts}
        sortedProducts={sortedProducts}
        setFilteredProducts={setFilteredProducts}
        setLocalProducts={setLocalProducts}
      />
      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <div>Знайдено: {localProducts.length}</div>
          <Sort
            products={products}
            filteredProducts={filteredProducts}
            setSortedProducts={setSortedProducts}
            setLocalProducts={setLocalProducts}
          />
        </div>
        <ProductsList products={localProducts} />
      </div>
    </div>
  );
}

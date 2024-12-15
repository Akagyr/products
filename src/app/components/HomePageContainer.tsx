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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  return (
    <div className='flex py-[20px]'>
      <Sidebar
        categories={categories}
        products={products}
        localProducts={localProducts}
        sortedProducts={sortedProducts}
        setFilteredProducts={setFilteredProducts}
        setLocalProducts={setLocalProducts}
      />
      <div>
        <div className='flex items-center justify-between'>
          <div>Знайдено: {localProducts.length}</div>
          <Sort
            products={products}
            filteredProducts={filteredProducts}
            setSortedProducts={setSortedProducts}
            setLocalProducts={setLocalProducts}
          />
        </div>
        <ProductList products={localProducts} />
      </div>
    </div>
  );
}

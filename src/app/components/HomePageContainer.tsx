'use client';

import React, { useState, useEffect } from 'react';
import ProductsList from './ProductsList';
import Sidebar from './Sidebar';
import Sort from './Sort';
import { Category, Product } from '../types';
import Collapse from './Collapse';

export default function HomePageContainer({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    let result = sortedProducts.length ? sortedProducts : products;

    if (currentCategories.length > 0) {
      result = result.filter((product) => currentCategories.includes(product.category));
    }

    setLocalProducts(result);
  }, [currentCategories, sortedProducts, products]);

  return (
    <div className='flex gap-[50px] py-[20px] md:py-[30px]'>
      <Sidebar
        categories={categories}
        currentCategories={currentCategories}
        setCurrentCategories={setCurrentCategories}
      />
      <div className='w-full'>
        <Collapse
          products={products}
          sortedProducts={sortedProducts}
          setLocalProducts={setLocalProducts}
          categories={categories}
          currentCategories={currentCategories}
          setCurrentCategories={setCurrentCategories}
          setSortedProducts={setSortedProducts}
        />
        <div className='flex items-center justify-between my-[10px] md:mb-[30px] md:mt-0'>
          <div className='mt-[20px] lg:mt-0'>Знайдено: {localProducts.length}</div>
          <div className='hidden lg:block'>
            <Sort
              products={products}
              sortedProducts={sortedProducts}
              setLocalProducts={setLocalProducts}
              setSortedProducts={setSortedProducts}
            />
          </div>
        </div>
        <ProductsList products={localProducts} />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import SidebarCategory from './SidebarCategory';
import { Category, Product } from '../types';

export default function Sidebar({
  categories,
  products,
  localProducts,
  sortedProducts,
  setFilteredProducts,
  setLocalProducts,
}: {
  categories: Category[];
  products: Product[];
  localProducts: Product[];
  sortedProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLocalProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);

  useEffect(() => {
    if (currentCategories.length === 0) {
      if (sortedProducts.length !== 0) {
        setLocalProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      } else {
        setLocalProducts(products);
        setFilteredProducts([]);
      }
    } else {
      let filteredProducts: Product[] = [];
      if (sortedProducts.length !== 0) {
        filteredProducts = sortedProducts.filter((product) =>
          currentCategories.includes(product.category)
        );
      } else {
        filteredProducts = products.filter((product) =>
          currentCategories.includes(product.category)
        );
      }
      setLocalProducts(filteredProducts);
      setFilteredProducts(filteredProducts);
    }
  }, [currentCategories, products, localProducts]);

  return (
    <aside className='hidden lg:block min-w-[250px]'>
      <h3 className='font-semibold mb-[10px]'>Фильтр:</h3>
      <div className='flex flex-col gap-[10px]'>
        {categories.map((category) => (
          <SidebarCategory
            key={category.id}
            category={category}
            currentCategories={currentCategories}
            setCurrentCategories={setCurrentCategories}
          />
        ))}
      </div>
    </aside>
  );
}

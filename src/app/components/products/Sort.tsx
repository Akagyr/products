'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../../types';

export default function Sort({
  products,
  sortedProducts,
  setSortedProducts,
  setLocalProducts,
}: {
  products: Product[];
  sortedProducts: Product[];
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLocalProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [currentOption, setCurrentOption] = useState<string>('');

  useEffect(() => {
    let productsToSort = [...(sortedProducts.length ? sortedProducts : products)];

    switch (currentOption) {
      case 'default':
        productsToSort.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'nameBottom':
        productsToSort.sort((a, b) => a.category.name.localeCompare(b.category.name));
        break;
      case 'nameTop':
        productsToSort.sort((a, b) => b.category.name.localeCompare(a.category.name));
        break;
      case 'priceTop':
        productsToSort.sort((a, b) => a.price - b.price);
        break;
      case 'priceBottom':
        productsToSort.sort((a, b) => b.price - a.price);
        break;
    }

    setSortedProducts(productsToSort);
    setLocalProducts(productsToSort);
  }, [currentOption]);

  return (
    <div className='flex items-center gap-[20px] my-[20px] lg:my-0'>
      <label className='font-medium'>Сортування:</label>
      <select
        name='sort'
        value={currentOption}
        onChange={(e) => setCurrentOption(e.target.value)}
        className='cursor-pointer border-b pb-[5px]'
      >
        <option value='default'>по замовченню</option>
        <option value='nameBottom'>по назві (А - Я)</option>
        <option value='nameTop'>по назві (Я - А)</option>
        <option value='priceTop'>по ціні (низька {'>'} висока)</option>
        <option value='priceBottom'>по ціні (висока {'>'} низька)</option>
      </select>
    </div>
  );
}

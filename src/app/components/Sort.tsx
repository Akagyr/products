'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../types';

export default function Sort({
  products,
  filteredProducts,
  setSortedProducts,
  setLocalProducts,
}: {
  products: Product[];
  filteredProducts: Product[];
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLocalProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [currentOption, setCurrentOption] = useState<string>('');

  useEffect(() => {
    let sortedProducts = [...products];

    switch (currentOption) {
      case '':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'nameBottom':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameTop':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceTop':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceBottom':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      // case 'rateBottom':
      //   sortedProducts.sort((a, b) => b.rating - a.rating);
      //   break;
      // case 'rateTop':
      //   sortedProducts.sort((a, b) => a.rating - b.rating);
      //   break;
      default:
        if (filteredProducts.length !== 0) {
          sortedProducts = filteredProducts;
        } else {
          sortedProducts = products;
        }
        break;
    }
    setSortedProducts(sortedProducts);
    setLocalProducts(sortedProducts);
  }, [currentOption]);

  return (
    <div className='flex items-center justify-end gap-[20px] mb-[20px]'>
      <label>Сортування:</label>
      <select name='sort' onChange={(e) => setCurrentOption(e.target.value)}>
        <option value=''>по замовченню</option>
        <option value='nameBottom'>по назві (А - Я)</option>
        <option value='nameTop'>по назві (Я - А)</option>
        <option value='priceTop'>по ціні (низька {'>'} висока)</option>
        <option value='priceBottom'>по ціні (висока {'>'} низька)</option>
        <option value='rateBottom' disabled>
          по рейтингу (високий)
        </option>
        <option value='rateTop' disabled>
          по рейтингу (низький)
        </option>
      </select>
    </div>
  );
}

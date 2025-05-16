'use client';

import React, { useState, useEffect } from 'react';
import ProductsList from './ProductsList';
import Sidebar from './Sidebar';
import Sort from './Sort';
import Pagination from './Pagination';
import { Product } from '../../types';
import Collapse from './Collapse';

export default function ProductsPageContainer({ products }: { products: Product[] }) {
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentSort, setCurrentSort] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;

  const totalPages = Math.ceil(localProducts.length / productsPerPage);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return localProducts.slice(startIndex, endIndex);
  };

  useEffect(() => {
    let productsToSort = [...filteredProducts];

    switch (currentSort) {
      case 'default':
        productsToSort.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'nameBottom':
        productsToSort.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameTop':
        productsToSort.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceTop':
        productsToSort.sort((a, b) => a.price - b.price);
        break;
      case 'priceBottom':
        productsToSort.sort((a, b) => b.price - a.price);
        break;
    }

    setLocalProducts(productsToSort);
    setCurrentPage(1);
  }, [filteredProducts, currentSort]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex gap-[50px] xl:gap-[100px] pt-[20px] md:pt-[30px] px-[20px] 2xl:px-0 2xl:max-w-container 2xl:mx-auto'>
      <Sidebar products={products} setFilteredProducts={setFilteredProducts} />
      <div className='w-full products-container'>
        <Collapse products={products} setFilteredProducts={setFilteredProducts} />
        <div className='flex items-start justify-between my-[10px] md:mb-[30px] md:mt-0 text-sm md:text-base'>
          <div className='mt-[20px] lg:mt-0'>Знайдено: {localProducts.length}</div>
          <Sort currentSort={currentSort} setCurrentSort={setCurrentSort} />
        </div>
        <ProductsList products={getCurrentPageProducts()} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

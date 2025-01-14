import React from 'react';
import { Product } from '../types';

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <section>
      <h2 className='mb-[20px] text-2xl font-medium'>Характеристика:</h2>
      <div className='lg:grid grid-cols-[54%_40%] gap-[6%]'>
        <div>
          <div className='grid grid-cols-2 gap-x-[20px] bg-gray-100 p-[20px] items-center rounded-full'>
            <p>Назва</p>
            <p>{product.category}</p>
          </div>
          <div className='grid grid-cols-2 gap-[20px] p-[20px] items-center'>
            <p>Тип доставки</p>
            <p>{'Рослина поставляється в горщику для вирощування'}</p>
          </div>
          <div className='grid grid-cols-2 gap-x-[20px] bg-gray-100 p-[20px] items-center rounded-full'>
            <p>Висота</p>
            <p>{'100 см'}</p>
          </div>
          <div className='grid grid-cols-2 gap-[20px] p-[20px] items-center'>
            <p>Діаметр</p>
            <p>{'15 см'}</p>
          </div>
          <div className='grid grid-cols-2 gap-x-[20px] bg-gray-100 p-[20px] items-center rounded-full'>
            <p>Розмір горщика</p>
            <p>{'9 см'}</p>
          </div>
          <div className='grid grid-cols-2 gap-[20px] p-[20px] items-center'>
            <p>Повна висота росту</p>
            <p>{'25/35 см'}</p>
          </div>
        </div>
        <img className='hidden lg:block w-full object-cover rounded-3xl' src={product.imageUrl} />
      </div>
    </section>
  );
}

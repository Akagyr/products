import React from 'react';
import { Product } from '../../types';

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <section>
      <div className='lg:grid grid-cols-[54%_38%] gap-[8%]'>
        <div>
          <h2 className='mb-[20px] text-2xl font-medium'>Характеристика:</h2>
          <div className='grid grid-cols-2 gap-x-[20px] p-[20px] items-center bg-gray-100 rounded-full'>
            <p className='font-semibold'>Категорія</p>
            <p>{product.category.name}</p>
          </div>
          <div className='grid grid-cols-2 gap-x-[20px] p-[20px] items-center'>
            <p className='font-semibold'>Вид</p>
            <p>{product.species.name}</p>
          </div>
          <div className='grid grid-cols-2 gap-x-[20px] p-[20px] items-center bg-gray-100 rounded-full'>
            <p className='font-semibold'>Модель</p>
            <p>{product.name}</p>
          </div>
          {product.description.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-2 gap-x-[20px] p-[20px] items-center ${
                index % 2 !== 0 ? 'bg-gray-100 rounded-full' : ''
              }`}
            >
              <p className='font-semibold'>{item.name}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <img
          className='hidden lg:block size-full object-cover rounded-3xl'
          src={product.images[0]}
          alt={`${product.category.name} ${product.species.name} ${product.name}`}
        />
      </div>
    </section>
  );
}

import React from 'react';
import { Product } from '../../types';

export default function ProductInfo({ product }: { product: Product }) {
  const characteristics = [
    { label: 'Категорія', value: `${product.category.name}`},
    { label: 'Вид', value: `${product.species.name}` },
    { label: 'Назва', value: `${product.name}` },
    { label: 'Висота', value: '100 см' },
    { label: 'Діаметр', value: '15 см' },
    { label: 'Розмір горщика', value: '9 см' },
  ];

  return (
    <section>
      <div className='lg:grid grid-cols-[54%_38%] gap-[8%]'>
        <div>
          <h2 className='mb-[20px] text-2xl font-medium'>Характеристика:</h2>
          {characteristics.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 gap-x-[20px] p-[20px] items-center ${
                index % 2 === 0 ? 'bg-gray-100 rounded-full' : ''
              }`}
            >
              <p className='font-semibold'>{item.label}</p>
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

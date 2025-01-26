import React from 'react';
import { Product } from '../../types';

export default function ProductInfo({ product }: { product: Product }) {
  const characteristics = [
    { label: 'Назва', value: `${product.species.name} ${product.name}` },
    { label: 'Тип доставки', value: 'В горщику для вирощування' },
    { label: 'Висота', value: '100 см' },
    { label: 'Діаметр', value: '15 см' },
    { label: 'Розмір горщика', value: '9 см' },
  ];

  return (
    <section>
      <div className='lg:grid grid-cols-[55%_35%] gap-[10%]'>
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
          className='hidden lg:block w-full object-cover rounded-3xl'
          src={product.images[0]}
          alt={`${product.category.name} ${product.species.name} ${product.name}`}
        />
      </div>
    </section>
  );
}

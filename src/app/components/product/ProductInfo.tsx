import React from 'react';
import { Product } from '../../types';

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <section>
      <div className='lg:grid grid-cols-2 gap-[50px]'>
        <div>
          <h2 className='mb-[20px] text-2xl font-medium'>Характеристика:</h2>
          <div className='border-[1px] rounded-2xl'>
            <div className='grid grid-cols-2 gap-x-[20px] p-[20px] items-center'>
              <p className='font-semibold border-r'>Категорія</p>
              <p>{product.category.name}</p>
            </div>
            <div className='grid grid-cols-2 gap-x-[20px] p-[20px] items-center border-t'>
              <p className='font-semibold border-r'>Вид</p>
              <p>{product.species.name}</p>
            </div>
            <div className='grid grid-cols-2 gap-x-[20px] p-[20px] items-center border-t'>
              <p className='font-semibold border-r'>Модель</p>
              <p>{product.name}</p>
            </div>
            {product.description.map((item) => (
              <div key={item.id} className='grid grid-cols-2 gap-x-[20px] p-[20px] items-center border-t'>
                <p className='font-semibold border-r'>{item.name}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <img
          className='hidden lg:block justify-end max-w-[540px] mx-auto w-full h-full aspect-square object-cover rounded-[5%_40%_10%_40%]'
          src={product.category.image}
          alt={`${product.category.name} ${product.species.name} ${product.name}`}
        />
      </div>
    </section>
  );
}

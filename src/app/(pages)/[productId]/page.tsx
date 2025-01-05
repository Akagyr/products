import ProductCardBuyBtn from '@/app/components/ProductCardBuyBtn';
import ProductImageGallery from '@/app/components/ProductImageSwiper';
import { getProduct } from '@/app/database/prismaQuries';
import { Product } from '@/app/types';
import React from 'react';

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = (await getProduct(Number(params.productId))) as Product;

  return (
    <div className='py-[30px] px-[12%]'>
      <div className='grid grid-cols-[1fr_400px] gap-[60px] border-b-[2px] pb-[70px]'>
        <ProductImageGallery productImage={product.imageUrl} />
        <div className='py-[20px]'>
          <h2 className='md:text-2xl border-b pb-[20px] mb-[20px] font-medium'>
            {product.name} {product.category}
          </h2>
          <div className='flex flex-col gap-[20px]'>
            <p className='text-sm md:text-2xl'>{product.price} грн</p>
            <ProductCardBuyBtn product={product} />
            <div className='flex flex-col gap-[10px]'>
              <div className='flex gap-[5px] items-center'>
                <div className='w-[35px] p-[6px] bg-gray-400 rounded-full'>
                  <img src='/delivery.png' className='w-full' alt='Delivery' />
                </div>
                <p className='text-sm text-gray-500'>Безкоштовна доставка від 50</p>
              </div>
              <div className='flex gap-[5px] items-center'>
                <div className='w-[35px] p-[6px] bg-gray-400 rounded-full'>
                  <img src='/Medal.png' className='w-full' alt='Medal' />
                </div>
                <p className='text-sm text-gray-500'>Щойно з нашого розплідника</p>
              </div>
              <div className='flex gap-[5px] items-center'>
                <div className='w-[35px] p-[6px] bg-gray-400 rounded-full'>
                  <img src='/schedule.png' className='w-full' alt='Schedule' />
                </div>
                <p className='text-sm text-gray-500'>Протягом 1-3 робочих днів вдома</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='mt-[60px]'>
        <h2 className='mb-[20px] text-2xl font-medium'>Характеристика:</h2>
        <div className='grid grid-cols-[54%_40%] gap-[6%]'>
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
          <img className='w-full object-cover rounded-3xl' src={product.imageUrl} />
        </div>
      </section>
    </div>
  );
}

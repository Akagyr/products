import ProductCardBuyBtn from '@/app/components/ProductCardBuyBtn';
import ProductImageGallery from '@/app/components/ProductImageSwiper';
import ProductInfo from '@/app/components/ProductInfo';
import { getProduct } from '@/app/database/prismaQuries';
import { Product } from '@/app/types';
import React from 'react';

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = (await getProduct(Number(params.productId))) as Product;

  return (
    <div className='py-[30px] px-[10px] lg:px-[15%]'>
      <div className='lg:grid grid-cols-2 gap-[60px] border-b-[2px] pb-[20px] lg:pb-[70px] mb-[20px] lg:mb-[70px]'>
        <ProductImageGallery productImage={product.imageUrl} />
        <div className='py-[20px]'>
          <h2 className='md:text-2xl lg:border-b lg:pb-[20px] mb-[20px] font-medium'>
            {product.name} {product.category}
          </h2>
          <div className='flex flex-col gap-[20px] border-b pb-[20px] mb-[20px]'>
            <p className='text-sm md:text-2xl'>{product.price} грн</p>
            <ProductCardBuyBtn product={product} />
          </div>
          <section className='flex flex-col gap-[10px]'>
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
          </section>
        </div>
      </div>
      <ProductInfo product={product} />
    </div>
  );
}

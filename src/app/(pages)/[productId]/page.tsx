import ProductBuyBtn from '@/app/components/ProductBuyBtn';
import ProductImageGallery from '@/app/components/product/ProductImageGallery';
import ProductInfo from '@/app/components/product/ProductInfo';
import { getProduct } from '@/app/database/prismaQuries';
import { Product } from '@/app/types';
import React from 'react';
import ProductFeatures from '@/app/components/product/ProductFeatures';

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = (await getProduct(params.productId)) as Product;

  return (
    <div className='py-[30px] px-[20px] 2xl:px-0 2xl:max-w-container 2xl:mx-auto'>
      <div className='lg:grid grid-cols-2 gap-[150px] lg:border-b-[2px] lg:pb-[70px] mb-[40px] lg:mb-[70px]'>
        <ProductImageGallery
          productImages={product.images}
          categoryName={product.category.name}
          speciesName={product.species.name}
          productName={product.name}
        />
        <div className='mt-[40px] lg:mt-0 p-[30px] border-[1px] rounded-2xl'>
          <div className='lg:border-b lg:pb-[10px] mb-[20px]'>
            <h2 className='text-2xl font-semibold'>
              {product.species.name} {product.name}
            </h2>
            <p className='text-rose mt-[10px]'>{product.species.name}</p>
          </div>
          <div className='flex flex-col gap-[20px] border-b pb-[20px] mb-[20px]'>
            <p className='text-2xl text-rose'>{product.price} грн</p>
            <ProductBuyBtn
              product={product}
              styleClasses='px-[10px] md:px-[30px] py-[12px] md:py-[10px] w-full lg:w-fit text-base'
            />
          </div>
          <ProductFeatures />
        </div>
      </div>
      <ProductInfo product={product} />
    </div>
  );
}

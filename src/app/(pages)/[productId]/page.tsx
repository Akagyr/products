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
    <div className='py-[30px] px-[10px] lg:px-[15%]'>
      <div className='lg:grid grid-cols-2 gap-[60px] border-b-[2px] pb-[20px] lg:pb-[70px] mb-[20px] lg:mb-[70px]'>
        <ProductImageGallery productImages={product.images} />
        <div className='py-[20px]'>
          <h2 className='text-2xl lg:border-b lg:pb-[10px] mb-[20px] font-medium'>
          {product.type.name} {product.name}
          </h2>
          <div className='flex flex-col gap-[20px] border-b pb-[20px] mb-[20px]'>
            <p className='text-2xl'>{product.price} грн</p>
            <ProductBuyBtn product={product} styleClasses='px-[10px] md:px-[30px] py-[12px] md:py-[10px]' />
          </div>
          <ProductFeatures />
        </div>
      </div>
      <ProductInfo product={product} />
    </div>
  );
}

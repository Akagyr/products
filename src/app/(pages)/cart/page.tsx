import CartProductList from '@/app/components/cart/CartProductList';
import React from 'react';

export default function CartPage() {
  return (
    <div className='py-[40px] px-[20px] 2xl:px-0 max-w-[450px] md:max-w-[700px] lg:max-w-[750px] xl:max-w-[1200px] 2xl:max-w-container mx-auto'>
      <h2 className='text-xl md:text-2xl font-semibold'>Кошик</h2>
      <CartProductList />
    </div>
  );
}

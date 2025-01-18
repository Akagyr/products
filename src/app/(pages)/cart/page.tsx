import CartProductList from '@/app/components/cart/CartProductList';
import React from 'react';

export default function CartPage() {
  return (
    <div className='w-full sm:w-[640px] lg:w-[800px] mx-auto my-[40px]'>
      <h2 className='text-xl md:text-2xl font-bold mb-[10px]'>Кошик</h2>
      <CartProductList />
    </div>
  );
}

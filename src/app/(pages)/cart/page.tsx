import CartProductList from '@/app/components/CartProductList';
import React from 'react';

export default function CartPage() {
  return (
    <div className='sm:max-w-[640px] lg:max-w-[1000px] sm:mx-auto my-[40px]'>
      <h2 className='text-xl md:text-2xl font-bold mb-[10px]'>Кошик</h2>
      <CartProductList />
    </div>
  );
}

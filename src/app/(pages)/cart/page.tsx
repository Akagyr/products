import CartProductList from '@/app/components/cart/CartProductList';
import React from 'react';

export default function CartPage() {
  return (
    <div className='max-w-container mx-auto py-[40px]'>
      <h2 className='text-xl md:text-2xl font-bold mb-[20px]'>Кошик</h2>
      <CartProductList />
    </div>
  );
}

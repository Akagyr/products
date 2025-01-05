import React from 'react';
import CheckoutForm from '@/app/components/CheckoutForm';
import CheckoutProductList from '@/app/components/CheckoutProductList';

export default function CheckoutPage() {
  return (
    <div className='w-full md:max-w-[500px] lg:max-w-[1000px] xl:max-w-[1200px] mx-auto my-[30px] grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[100px]'>
      <CheckoutForm />
      <CheckoutProductList />
    </div>
  );
}

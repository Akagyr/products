import React from 'react';
import CheckoutForm from '@/app/components/CheckoutForm';
import CheckoutProductList from '@/app/components/CheckoutProductList';

export default function CheckoutPage() {
  return (
    <div className='w-full md:max-w-[640px] lg:max-w-[1000px] xl:max-w-[1200px] mx-auto my-[30px] flex flex-col lg:flex-row lg:justify-center gap-[30px] lg:gap-[100px]'>
      <CheckoutForm />
      <CheckoutProductList />
    </div>
  );
}

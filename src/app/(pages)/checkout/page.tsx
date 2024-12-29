import React from 'react';
import CheckoutForm from '@/app/components/CheckoutForm';
import CheckoutProductList from '@/app/components/CheckoutProductList';

export default function CheckoutPage() {
  return (
    <div className='w-[1200px] mx-auto my-[30px] flex gap-[100px]'>
      <div>
        <h2 className='text-xl md:text-2xl font-bold py-[15px] border-b'>Дані для відправки замовлення</h2>
        <CheckoutForm />
      </div>
      <div className='border px-[20px] pb-[20px] rounded-lg h-fit'>
        <h2 className='text-lg md:text-xl font-semibold py-[15px] border-b'>Замовлення № {1}</h2>
        <CheckoutProductList />
      </div>
    </div>
  );
}

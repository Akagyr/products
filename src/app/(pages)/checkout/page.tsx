import React from 'react';
import CheckoutForm from '@/app/components/chechout/CheckoutForm';
import CheckoutProductList from '@/app/components/chechout/CheckoutProductList';
import { getOrdersCount } from '@/app/database/prismaQuries';

export default async function CheckoutPage() {
  const ordersCount = (await getOrdersCount()) as number;

  return (
    <div className='py-[40px] px-[20px] 2xl:px-0 md:max-w-[500px] lg:max-w-[1000px] xl:max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[100px]'>
      <CheckoutForm />
      <CheckoutProductList ordersCount={ordersCount} />
    </div>
  );
}

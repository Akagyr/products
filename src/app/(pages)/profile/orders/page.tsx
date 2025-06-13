import Orders from '@/app/components/profile/orders/Orders';
import OrdersSuspense from '@/app/components/profile/orders/OrdersSuspense';
import { Suspense } from 'react';

export default function OrdersPage() {
  return (
    <div className='flex flex-col gap-[20px]'>
      <h1 className='text-xl sm:text-2xl font-bold'>Мої замовлення</h1>
      <Suspense fallback={<OrdersSuspense />}>
        <Orders />
      </Suspense>
    </div>
  );
}

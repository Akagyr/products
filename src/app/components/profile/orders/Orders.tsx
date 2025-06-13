import { getCurrentUser } from '@/app/auth/auth';
import { getUserOrders } from '@/app/database/prismaQuries';
import React from 'react';
import { OrdersList } from './OrdersList';

export default async function Orders() {
  const user = await getCurrentUser();
  if (!user) {
    return <p>Помилка завантаження замовлень</p>;
  }

  const orders = await getUserOrders(user.id);
  
  return <OrdersList orders={orders} />;
}

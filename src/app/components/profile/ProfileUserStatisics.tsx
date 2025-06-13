import { getCurrentUser } from '@/app/auth/auth';
import { getUserStatistics } from '@/app/database/prismaQuries';
import { formatPrice } from '@/app/helpers/formatPrice';
import React from 'react';

export default async function ProfileUserStatisic() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Помилка завантаження статистики</div>;
  }

  const userStats = await getUserStatistics(user.id);

  return (
    <div className='flex gap-[15px] sm:gap-[20px] w-full'>
      <div className='p-[15px] sm:p-[20px] bg-gray-50 rounded-xl border w-1/2'>
        <div className='flex items-center gap-[10px] mb-[10px]'>
          <div className='w-[30px] h-[30px] bg-rose rounded-lg flex items-center justify-center'>
            <span className='text-white text-sm'>📦</span>
          </div>
          <p className='font-semibold text-sm sm:text-base'>Замовлень</p>
        </div>
        <p className='text-lg sm:text-xl font-bold text-rose'>{userStats.ordersCount}</p>
        <p className='text-xs text-gray-500'>Всього зроблено</p>
      </div>
      <div className='p-[15px] sm:p-[20px] bg-gray-50 rounded-xl border w-1/2'>
        <div className='flex items-center gap-[10px] mb-[10px]'>
          <div className='w-[30px] h-[30px] bg-green-500 rounded-lg flex items-center justify-center'>
            <span className='text-white text-sm'>💰</span>
          </div>
          <p className='font-semibold text-sm sm:text-base'>Витрачено</p>
        </div>
        <p className='text-lg sm:text-xl font-bold text-green-600'>
          {formatPrice(userStats.totalSpent)}
        </p>
        <p className='text-xs text-gray-500'>За весь час</p>
      </div>
    </div>
  );
}

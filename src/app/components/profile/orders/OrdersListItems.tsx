import { formatPrice } from '@/app/helpers/formatPrice';
import { OrderItem } from '@prisma/client';
import React from 'react';

export default function OrdersListItems({ orderItems }: { orderItems: OrderItem[] }) {
  return (
    <div className='flex flex-col gap-[15px]'>
      {orderItems.map((item) => (
        <div
          key={item.id}
          className='flex items-center gap-[15px] p-[15px] sm:p-[20px] bg-white rounded-xl border lg:hover:shadow-sm transition-shadow'
        >
          <img
            src={item.productImage}
            alt={item.productName}
            className='w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] object-cover rounded-full'
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.png';
            }}
          />
          <div>
            <h4 className='font-semibold mb-[5px] text-sm sm:text-base truncate'>
              {item.productName}
            </h4>
            <p className='text-base sm:text-lg font-bold text-rose'>
              {formatPrice(item.productPrice)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

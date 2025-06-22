'use client';

import { formatPrice } from '@/app/helpers/formatPrice';
import { Order } from '@/app/types';
import React, { useState, useRef, useEffect } from 'react';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import OrdersListItems from './OrdersListItems';

export function OrdersList({ orders }: { orders: Order[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    orders.forEach((order) => {
      const contentEl = contentRefs.current[order.id];
      if (contentEl) {
        const height = contentEl.scrollHeight;
        setHeights((prev) => ({
          ...prev,
          [order.id]: height,
        }));
      }
    });
  }, [orders, expanded]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50';
      case 'PAID':
        return 'text-green-600 bg-green-50';
      case 'SHIPPED':
        return 'text-rose bg-rose/10';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50';
    }
  };

  const getStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '⏳ В обробці';
      case 'PAID':
        return '✅ Оплачено';
      case 'SHIPPED':
        return '🚚 Відправлено';
      case 'CANCELLED':
        return '❌ Скасовано';
    }
  };

  if (orders.length === 0) {
    return (
      <div className='text-center py-[60px] px-[20px]'>
        <div className='text-4xl sm:text-6xl mb-[20px]'>📦</div>
        <h3 className='text-lg sm:text-xl font-semibold text-gray-700 mb-[10px]'>
          Замовлень поки немає
        </h3>
        <p className='text-sm sm:text-base text-gray-500'>
          Коли ви зробите замовлення, воно з'явиться тут
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-[20px]'>
      {orders.map((order) => (
        <div
          key={order.id}
          className='border rounded-2xl shadow-sm transition-shadow lg:hover:shadow-md overflow-hidden'
        >
          <div
            className='p-[15px] sm:p-[20px] lg:p-[25px] cursor-pointer lg:hover:bg-gray-50 transition-colors'
            onClick={() => toggleExpand(order.id)}
          >
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[15px] sm:gap-[20px]'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-[15px] sm:gap-[25px]'>
                <div className='flex items-center gap-[15px]'>
                  <div className='w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-rose rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base'>
                    #{order.number.toString().slice(-2)}
                  </div>
                  <div>
                    <p className='font-semibold text-sm sm:text-base'>
                      Замовлення № {order.number}
                    </p>
                    <p className='text-xs sm:text-sm text-gray-500'>
                      {new Date(order.createdAt || Date.now()).toLocaleDateString('uk-UA', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-[12px] py-[6px] rounded-xl text-xs sm:text-sm font-medium flex items-center gap-[8px] w-fit ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatus(order.status)}
                </div>
              </div>
              <div className='flex items-center justify-between sm:justify-end gap-[15px] sm:gap-[20px]'>
                <div className='text-left sm:text-right'>
                  <p className='text-lg sm:text-xl lg:text-2xl font-bold'>
                    {formatPrice(order.total)}
                  </p>
                  <p className='text-xs sm:text-sm text-gray-500'>{order.items.length} товар(ів)</p>
                </div>
                <button className='flex items-center gap-[8px] px-[15px] py-[8px] text-rose lg:hover:text-rose-hover lg:hover:bg-rose/5 rounded-xl transition-colors text-sm sm:text-base font-medium'>
                  <span>{expanded === order.id ? 'Згорнути' : 'Деталі'}</span>
                  <ArrowDownIcon
                    isOpen={expanded === order.id}
                    stylesClass='w-[12px] h-[12px] sm:w-[15px] sm:h-[15px] transition-transform duration-300'
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            className='overflow-hidden transition-all duration-700 ease-in-out border-t bg-gray-50'
            style={{
              maxHeight: expanded === order.id ? `${heights[order.id] || 0}px` : '0px',
              opacity: expanded === order.id ? 1 : 0,
            }}
          >
            <div
              ref={(el) => {
                contentRefs.current[order.id] = el;
              }}
              className='p-[15px] sm:p-[20px] lg:p-[25px]'
            >
              <h3 className='text-base sm:text-lg font-semibold mb-[15px] sm:mb-[20px] flex items-center gap-[8px]'>
                Товари в замовленні
              </h3>
              <OrdersListItems orderItems={order.items} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

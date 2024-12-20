'use client';

import React from 'react';
import { useCart } from '../context/cartContext';

export default function Cart() {
  const { getCartTotal } = useCart();

  return <div className='flex items-center gap-[10px]'>Кошик({getCartTotal()})</div>;
}

'use client';

import React from 'react';
import { useCart } from '../context/cartContext';
import Link from 'next/link';
import HeaderCartIcon from './HeaderCartIcon';

export default function HeaderCart() {
  const { getCartTotal } = useCart();

  return (
    <Link href='/cart'>
      <HeaderCartIcon />
    </Link>
  );
}

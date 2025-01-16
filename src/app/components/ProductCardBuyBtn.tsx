'use client';

import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Product } from '../types';

export default function ProductCardBuyBtn({ product }: { product: Product }) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { addToCart } = useCart();

  const onClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    setIsClicked(true);
  };

  return (
    <button
      className={`${
        isClicked
          ? 'border-[2px] border-[#b85aff] text-[#b85aff] font-medium'
          : 'bg-[#b85aff] lg:hover:bg-[#7c24c0] text-white'
      } px-[10px] md:px-[30px] py-[8px] text-sm md:text-base rounded-full w-full md:w-fit lg:hover:transition-colors lg:hover:duration-500`}
      disabled={isClicked}
      onClick={(e) => onClick(e, product)}
    >
      {isClicked ? '✓ Додано' : 'Додати до кошика'}
    </button>
  );
}

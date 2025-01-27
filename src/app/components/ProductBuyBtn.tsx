'use client';

import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Product } from '../types';

export default function ProductBuyBtn({
  product,
  styleClasses,
}: {
  product: Product;
  styleClasses?: string;
}) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { addToCart, getCart } = useCart();
  const cartItems = getCart();
  const isAdded: boolean = cartItems.some((item: Product) => item.name === product.name);

  const onClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    setIsClicked(true);
  };

  return (
    <button
      className={`${
        isClicked || isAdded
          ? 'border-[2px] border-[#b85aff] text-[#b85aff] font-medium'
          : 'bg-[#b85aff] lg:hover:bg-[#7c24c0] text-white'
      } ${
        styleClasses ? styleClasses : 'px-[10px] md:px-[30px] py-[8px]'
      } text-sm md:text-base rounded-full w-full md:w-fit lg:hover:transition-colors lg:hover:duration-500 cursor-pointer`}
      disabled={isClicked}
      onClick={(e) => onClick(e, product)}
    >
      {isClicked || isAdded ? '✓ Додано' : 'Додати до кошика'}
    </button>
  );
}

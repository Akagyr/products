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
  const { addToCart, removeFromCart, getCart } = useCart();
  const cartItems = getCart();
  const isAdded: boolean = cartItems.some((item: Product) => item.name === product.name);

  const onClick = (product: Product) => {
    if (isAdded) {
      removeFromCart(product.id);
      setIsClicked(false);
    } else {
      addToCart(product);
      setIsClicked(true);
    }
  };

  return (
    <button
      className={`${
        isClicked || isAdded
          ? 'border-[2px] border-rose text-rose lg:hover:border-rose-hover font-medium'
          : 'border-[2px] border-rose bg-rose lg:hover:bg-rose-hover lg:hover:border-rose-hover text-white'
      } ${
        styleClasses ? styleClasses : 'px-[10px] md:px-[30px] py-[8px] mt-[10px]'
      } text-sm md:text-base rounded-xl lg:hover:transition-colors lg:hover:duration-500 cursor-pointer`}
      onClick={() => onClick(product)}
    >
      {isClicked || isAdded ? 'Видалити' : 'До кошика'}
    </button>
  );
}

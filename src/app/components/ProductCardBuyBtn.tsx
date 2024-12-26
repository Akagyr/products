import React from 'react';
import { useCart } from '../context/cartContext';
import { Product } from '../types';

export default function ProductCardBuyBtn({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      className='px-[10px] md:px-[30px] py-[5px] md:py-[8px] text-sm md:text-base rounded-full bg-[#b85aff] lg:hover:bg-[#7c24c0] text-white w-full md:w-fit lg:hover:transition-colors lg:hover:duration-500'
      onClick={() => addToCart(product)}
    >
      Додати до кошика
    </button>
  );
}

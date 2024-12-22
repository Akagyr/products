import React from 'react';
import { useCart } from '../context/cartContext';
import { Product } from '../types';

export default function ProductCardBuyBtn({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      className='px-[30px] py-[8px] rounded-full bg-[#b85aff] hover:bg-[#7c24c0] text-white w-fit hover:transition-colors hover:duration-500'
      onClick={() => addToCart(product)}
    >
      Додати до кошика
    </button>
  );
}

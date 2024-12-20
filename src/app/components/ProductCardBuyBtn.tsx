import React from 'react';
import { useCart } from '../context/cartContext';
import { Product } from '../types';

export default function ProductCardBuyBtn({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      className='px-[15px] py-[8px] rounded-lg bg-[#c78bf6] hover:bg-[#a93efc] w-fit transition-colors'
      onClick={() => addToCart(product)}
    >
      Купити
    </button>
  );
}

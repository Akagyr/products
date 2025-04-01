import React from 'react';
import { useCart } from '../../context/cartContext';
import { Product } from '@/app/types';
import Link from 'next/link';

export default function CartProductListItem({
  product,
  firstProduct,
}: {
  product: Product;
  firstProduct: boolean;
}) {
  const { removeFromCart } = useCart();

  return (
    <>
      <div
        className={`${
          !firstProduct && 'border-t'
        } hidden lg:grid grid-cols-[100px_1fr_250px_120px] gap-[30px] items-center w-full py-[20px] px-[30px]`}
      >
        <img
          src={product.images[0]}
          alt={`${product.category.name} ${product.species.name} ${product.name}`}
          className='object-cover rounded-full w-full aspect-square'
        />
        <Link href={`/${product.id}`} className='lg:hover:text-rose'>
          {product.category.name} {product.species.name} {product.name}
        </Link>
        <p className='text-center'>{product.price.toFixed(2)} грн</p>
        <button
          onClick={() => removeFromCart(product.id)}
          className='text-white px-[15px] py-[8px] rounded-full bg-rose lg:hover:bg-rose-hover w-fit transition-colors'
        >
          Видалити
        </button>
      </div>
      <div className='grid lg:hidden grid-cols-[80px_1fr] gap-[40px] py-[15px] border-b'>
        <img
          src={product.images[0]}
          alt={`${product.category.name} ${product.species.name} ${product.name}`}
          className='object-cover rounded-full w-full'
        />
        <div className='flex flex-col gap-[5px]'>
          <div className='flex justify-between items-center w-full'>
            <p className='text-sm lg:text-base'>
              {product.category.name} {product.species.name} {product.name}
            </p>
            <button
              onClick={() => removeFromCart(product.id)}
              className='text-sm font-medium text-red-600 w-fit'
            >
              X
            </button>
          </div>
          <div className='flex gap-[20px] items-center'>
            <p className='text-sm'>{product.price.toFixed(2)} грн</p>
          </div>
        </div>
      </div>
    </>
  );
}

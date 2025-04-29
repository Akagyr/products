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
        } hidden md:grid grid-cols-[90px_1fr_150px_120px] xl:grid-cols-[100px_1fr_150px_120px] 2xl:grid-cols-[100px_1fr_200px_120px] gap-[30px] items-center w-full py-[20px] px-[30px]`}
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
          className='text-white px-[15px] py-[8px] rounded-xl bg-rose lg:hover:bg-rose-hover w-fit transition-colors'
        >
          Видалити
        </button>
      </div>
      <div
        className={`${
          !firstProduct && 'border-t'
        } grid md:hidden grid-cols-[80px_1fr] gap-[20px] py-[15px] px-[10px] items-center`}
      >
        <img
          src={product.images[0]}
          alt={`${product.category.name} ${product.species.name} ${product.name}`}
          className='object-cover rounded-full w-full'
        />
        <div className='flex gap-[20px] justify-between items-start'>
          <div>
            <p className='text-sm lg:text-base'>
              {product.category.name} {product.species.name} {product.name}
            </p>
            <p className='text-sm mt-[10px]'>{product.price.toFixed(2)} грн</p>
          </div>
          <button
            onClick={() => removeFromCart(product.id)}
            className='text-sm font-medium text-red-600 w-fit'
          >
            X
          </button>
        </div>
      </div>
    </>
  );
}

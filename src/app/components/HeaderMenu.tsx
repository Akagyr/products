import React from 'react';
import { Category } from '../types';
import Link from 'next/link';

export default function HeaderMenu({ categories }: { categories: Category[] }) {
  return (
    <menu className='flex gap-[40px] py-[20px] text-sm text-gray-500 font-medium'>
      <a href='/products?new=true' className='lg:hover:text-rose'>
        Новинки
      </a>
      <a href='/products' className='lg:hover:text-rose'>
        Всі рослини
      </a>
      {categories.map((cat) => (
        <a href={`/products?category=${cat.id}`} className='lg:hover:text-rose' key={cat.id}>
          {cat.name}
        </a>
      ))}
    </menu>
  );
}

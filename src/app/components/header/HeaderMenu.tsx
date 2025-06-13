'use client';

import React, { useState } from 'react';
import { Category } from '../../types';
import Link from 'next/link';

export default function HeaderMenu({ categories }: { categories: Category[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop */}
      <menu className='hidden lg:flex gap-[40px] py-[20px] text-sm text-gray-500 font-medium'>
        <Link href='/products?new=true' className='lg:hover:text-rose'>
          Новинки
        </Link>
        <Link href='/products' className='lg:hover:text-rose'>
          Всі рослини
        </Link>
        {categories.map((cat) => (
          <Link href={`/products?category=${cat.id}`} className='lg:hover:text-rose' key={cat.id}>
            {cat.name}
          </Link>
        ))}
      </menu>

      {/* Mobile */}
      <div className='lg:hidden py-[20px]'>
        <button
          onClick={toggleMenu}
          className='flex items-center gap-[10px] text-sm text-gray-500 font-medium'
          aria-label='Меню категорій'
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
          Каталог
        </button>
        {isMenuOpen && (
          <>
            <div className='fixed inset-0 bg-black bg-opacity-25 z-40' onClick={closeMenu} />
            <div className='absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg z-50'>
              <div className='px-[20px] py-[15px]'>
                <div className='flex flex-col gap-[15px]'>
                  <Link
                    href='/products?new=true'
                    className='text-sm text-gray-500 font-medium py-[15px] border-b border-gray-100'
                    onClick={closeMenu}
                  >
                    Новинки
                  </Link>
                  <Link
                    href='/products'
                    className='text-sm text-gray-500 font-medium pb-[15px] border-b border-gray-100'
                    onClick={closeMenu}
                  >
                    Всі рослини
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      href={`/products?category=${cat.id}`}
                      className='text-sm text-gray-500 font-medium pb-[15px] border-b border-gray-100 last:border-b-0'
                      key={cat.id}
                      onClick={closeMenu}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

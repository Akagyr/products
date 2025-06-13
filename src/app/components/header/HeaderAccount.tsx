'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ProfileIcon from '../icons/ProfileIcon';
import { useAuth } from '@/app/context/authContext';
import HeaderAccountMenu from './HeaderAccountMenu';

export default function HeaderAccount() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <>
        <Link href='/auth' className='lg:hidden'>
          <ProfileIcon stylesClass='w-[22px] h-[22px]' />
        </Link>
        <Link
          href='/auth'
          className='hidden lg:flex flex-col items-center justify-center min-w-[200px] text-center lg:px-[15px] lg:py-[10px] rounded-2xl lg:hover:bg-gray-100 transition-all duration-200'
        >
          <p className='text-rose font-medium'>Вхід / Реєстрація</p>
          <p className='font-semibold'>Мій профіль</p>
        </Link>
      </>
    );
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className='flex items-center gap-[15px] lg:px-[15px] lg:py-[10px] rounded-2xl lg:hover:bg-gray-100 transition-all duration-200 group'
      >
        <div className='w-10 h-10 bg-rose rounded-full flex items-center justify-center text-white font-semibold shadow-lg'>
          {user.name.charAt(0)}
        </div>
        <div className='hidden lg:block text-left'>
          <p className='text-sm text-gray-600'>Вітаємо,</p>
          <p className='font-semibold lg:group-hover:text-rose transition-colors'>{user.name}</p>
        </div>
      </button>
      {isDropdownOpen && <HeaderAccountMenu setIsDropdownOpen={setIsDropdownOpen} />}
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import ProfileIcon from '../icons/ProfileIcon';

export default function HeaderAccount() {
  return (
    <>
      <Link href='' className='lg:hidden'>
        <ProfileIcon styleClass='w-[22px] h-[22px]' />
      </Link>
      <Link href='' className='hidden lg:flex flex-col items-center border-r-[1px] border-rose pr-[30px]'>
        <div className='flex gap-[5px] text-sm text-rose'>
          Увійти
          <span>/</span>
          Реєстрація
        </div>
        <p className='font-semibold'>Мій профіль</p>
      </Link>
    </>
  );
}

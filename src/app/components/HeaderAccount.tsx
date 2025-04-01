'use client';

import React from 'react';
import Link from 'next/link';

export default function HeaderAccount() {
  return (
    <div className='flex flex-col items-center border-r-[1px] border-rose pr-[30px]'>
      <div className='flex gap-[5px] text-sm text-rose'>
        <Link href=''>Увійти</Link>
        <span>/</span>
        <Link href=''>Реєстрація</Link>
      </div>
      <p className='font-semibold'>Мій профіль</p>
    </div>
  );
}

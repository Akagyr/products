import Image from 'next/image';
import React from 'react';
import HeaderLink from './HeaderLink';

export default function Header() {
  return (
    <header className='flex items-center justify-between bg-[#8253a7] px-[50px] py-[5px] text-white'>
      <Image src='/logo.png' width={60} height={60} alt='Orchids logo' />
      <menu className='flex items-center gap-[50px]'>
        <HeaderLink path='/' text='Головна' />
        <HeaderLink path='/#shop' text='Магазин' />
        <HeaderLink path='/#aboutus' text='Про нас' />
        <HeaderLink path='/#delivery' text='Доставка' />
        <HeaderLink path='/#contactus' text='Контакти' />
      </menu>
      <div className='flex items-center gap-[10px]'>
        Кошик
      </div>
    </header>
  );
}

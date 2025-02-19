import Image from 'next/image';
import React from 'react';
import HeaderLink from './HeaderLink';
import Link from 'next/link';
import HeaderCart from './HeaderCart';
import HeaderAccount from './HeaderAccount';

export default function Header() {
  return (
    <header className='sticky z-10 bg-white top-0 left-0 flex items-center justify-between font-medium px-[20px] lg:px-[100px] py-[5px] shadow-[0_1px_15px_rgba(0,0,0,.12)]'>
      <Link href='/' className='flex flex-col items-center'>
        <Image src='/logo.png' width={50} height={50} priority alt='Orchids logo' />
        <h1 className='uppercase font-semibold text-sm'>Orchids</h1>
      </Link>
      <menu className='hidden md:flex md:items-center md:gap-[30px] uppercase text-sm'>
        <HeaderLink path='/#aboutus' text='Про нас' />
        <HeaderLink path='/#delivery' text='Доставка' />
        <HeaderLink path='/#contactus' text='Контакти' />
      </menu>
      <div className='flex gap-[10px] items-center'>
        <HeaderCart />
        <HeaderAccount />
      </div>
    </header>
  );
}

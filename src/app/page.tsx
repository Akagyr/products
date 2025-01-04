import Link from 'next/link';
import React from 'react';

export default function Mainpage() {
  return (
    <div className='flex-1 flex items-center justify-center py-[30px]'>
      <div className='grid grid-cols-2 gap-[10px] w-full max-w-[1100px] mx-auto'>
        <Link href='/products?category=Фаленопсис' className='relative cursor-pointer'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/1/1e/Phalaenopsis_philippinensis_NationalOrchidGarden-Singapore.jpg'
            className='w-full h-[350px] rounded-3xl object-cover'
            alt='Фаленопсис'
          />
          <div className='absolute inset-0 bg-black/40 rounded-3xl' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-4xl text-white font-bold'>Фаленопсис</p>
          </div>
        </Link>
        <Link href='/products?category=Цимбідіум' className='relative cursor-pointer'>
          <img
            src='https://flowers.ua/images/Flowers/articles/318-img-5.jpg'
            className='w-full h-[350px] rounded-3xl object-cover'
            alt='Цимбідіум'
          />
          <div className='absolute inset-0 bg-black/40 rounded-3xl' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-4xl text-white font-bold'>Цимбідіум</p>
          </div>
        </Link>
        <Link href='/products?category=Пафіопедилум' className='relative cursor-pointer'>
          <img
            src='https://cdn.botanichka.ru/wp-content/uploads/2019/07/venerinyi-bashmachki-12.jpg'
            className='w-full h-[350px] rounded-3xl object-cover'
            alt='Пафіопедилум'
          />
          <div className='absolute inset-0 bg-black/40 rounded-3xl' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-4xl text-white font-bold'>Пафіопедилум</p>
          </div>
        </Link>
        <Link href='/products?category=Ванда' className='relative cursor-pointer'>
          <img
            src='https://i.ytimg.com/vi/-6MuMZUqXO4/sddefault.jpg'
            className='w-full h-[350px] rounded-3xl object-cover'
            alt='Ванда'
          />
          <div className='absolute inset-0 bg-black/40 rounded-3xl' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-4xl text-white font-bold'>Ванда</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

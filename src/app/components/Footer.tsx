import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='max-w-container w-full mx-auto border-t-[1px] py-[40px] mt-[50px] text-center'>
      <Image
        src='/logo.jpg'
        width={686}
        height={196}
        className='max-w-[180px] sm:max-w-[200px] max-h-[60px] mx-auto mb-[20px]'
        alt='Logo'
        quality={100}
      />
      <p>2025 OrchiQueen. All rights reserved.</p>
    </footer>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import HeaderAccountIcon from './HeaderAccountIcon';

export default function HeaderAccount() {
  return (
    <Link href='/account'>
      <HeaderAccountIcon />
    </Link>
  );
}

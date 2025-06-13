'use client';

import Link from 'next/link';
import React from 'react';

export default function HeaderAccountMenuNavLink({
  href,
  label,
  stylesClass,
  setIsDropdownOpen,
}: {
  href: string;
  label: string;
  stylesClass?: string;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Link
      href={href}
      onClick={() => setIsDropdownOpen(false)}
      className={`block w-full px-[20px] py-[10px] text-left lg:hover:bg-gray-50 transition-colors duration-150 lg:hover:text-rose-600 ${
        stylesClass && stylesClass
      }`}
    >
      {label}
    </Link>
  );
}

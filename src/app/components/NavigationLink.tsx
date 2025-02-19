'use client';

import React from 'react';
import Link from 'next/link';
import { useBreadcrumbs } from '@/app/context/breadcrumbsContext';

export default function NavigationLink({
  href,
  name,
  type,
  className,
  children,
}: {
  href: string;
  name: string;
  type: 'main' | 'category' | 'species' | 'product';
  className?: string;
  children: React.ReactNode;
}) {
  const { updateBreadcrumbs } = useBreadcrumbs();

  const handleClick = () => {
    updateBreadcrumbs(href, name, type);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

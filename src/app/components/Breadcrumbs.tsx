'use client';

import React from 'react';
import { useBreadcrumbs } from '../context/breadcrumbsContext';
import NavigationLink from './NavigationLink';

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <nav className='max-w-container mx-auto flex my-[20px] text-sm'>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <NavigationLink
            href={breadcrumb.href}
            name={breadcrumb.name}
            type={breadcrumb.type}
            className='text-rose lg:hover:text-rose-hover transition-colors'
          >
            {breadcrumb.name}
          </NavigationLink>
          {index < breadcrumbs.length - 1 && <span className='mx-2 text-gray-500'>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

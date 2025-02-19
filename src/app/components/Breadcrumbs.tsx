'use client';

import React from 'react';
import { useBreadcrumbs } from '../context/breadcrumbsContext';
import NavigationLink from './NavigationLink';

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <nav className='flex mb-4 text-sm'>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <NavigationLink
            href={breadcrumb.href}
            name={breadcrumb.name}
            type={breadcrumb.type}
            className='text-violet hover:text-violet-hover transition-colors'
          >
            {breadcrumb.name}
          </NavigationLink>
          {index < breadcrumbs.length - 1 && <span className='mx-2 text-gray-500'>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

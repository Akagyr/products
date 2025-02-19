'use client';

import React, { createContext, useContext, useState } from 'react';

type Breadcrumb = {
  href: string;
  name: string;
  type: 'main' | 'category' | 'species' | 'product';
};

type BreadcrumbsContextType = {
  breadcrumbs: Breadcrumb[];
  updateBreadcrumbs: (
    href: string,
    name: string,
    type: 'main' | 'category' | 'species' | 'product'
  ) => void;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(undefined);

export function BreadcrumbsProvider({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  const updateBreadcrumbs = (
    href: string,
    name: string,
    type: 'main' | 'category' | 'species' | 'product'
  ) => {
    let newBreadcrumbs: Breadcrumb[] = [{ href: '/', name: 'Головна', type: 'main' }];

    if (type === 'category') {
      newBreadcrumbs = [...newBreadcrumbs, { href, name, type }];
    } else if (type === 'species') {
      const categoryBreadcrumb = breadcrumbs.find((b) => b.type === 'category');
      if (categoryBreadcrumb) {
        newBreadcrumbs = [...newBreadcrumbs, categoryBreadcrumb];
      }
      newBreadcrumbs = [...newBreadcrumbs, { href, name, type }];
    } else if (type === 'product') {
      const categoryBreadcrumb = breadcrumbs.find((b) => b.type === 'category');
      const speciesBreadcrumb = breadcrumbs.find((b) => b.type === 'species');

      if (categoryBreadcrumb) {
        newBreadcrumbs = [...newBreadcrumbs, categoryBreadcrumb];
      }
      if (speciesBreadcrumb) {
        newBreadcrumbs = [...newBreadcrumbs, speciesBreadcrumb];
      }
      newBreadcrumbs = [...newBreadcrumbs, { href, name, type }];
    }

    setBreadcrumbs(newBreadcrumbs);
  };

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, updateBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbsContext);
  if (context === undefined) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider');
  }
  return context;
}

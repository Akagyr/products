'use client';

import { useAuth } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, ReactNode } from 'react';

export default function MainLayoutWrapper({
  children,
  fallback,
  redirectTo = '/',
}: {
  children: ReactNode;
  fallback: ReactNode;
  redirectTo?: string;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  if (loading) {
    return fallback;
  }

  return <>{children}</>;
}

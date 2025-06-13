'use client';

import { useAuth } from '@/app/context/authContext';
import React from 'react';

export default function ProfileSidebarUserInfo() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex items-center gap-[15px]'>
        <div className='w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-rose/5 rounded-xl animate-pulse' />
        <div className='flex-1 min-w-0'>
          <div className='h-[15px] bg-rose/5 rounded-xl animate-pulse w-1/2 mb-[10px]' />
          <div className='h-[15px] bg-rose/5 rounded-xl animate-pulse' />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex items-center gap-[15px]'>
        <div className='w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-gray-300 rounded-xl flex items-center justify-center'>
          <span className='text-gray-500'>?</span>
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-gray-500 text-sm'>Помилка завантаження</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-[15px]'>
      <div className='w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-rose rounded-xl flex items-center justify-center shadow'>
        <span className='text-[25px] sm:text-[30px] text-white font-bold'>
          {user.name
            ? user.name.charAt(0).toUpperCase()
            : user.email.charAt(0).toUpperCase() || 'U'}
        </span>
      </div>
      <div className='flex-1 min-w-0'>
        <h3 className='font-bold text-base sm:text-lg truncate'>{user.name}</h3>
        <p className='text-gray-500 text-xs sm:text-sm truncate'>{user.email}</p>
      </div>
    </div>
  );
}

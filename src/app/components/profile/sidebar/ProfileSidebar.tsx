import React from 'react';
import ProfileSidebarUserInfo from './ProfileSidebarUserInfo';
import ProfileSidebarNav from './ProfileSidebarNav';

export default function ProfileSidebar() {
  return (
    <aside className='flex flex-col gap-[25px] lg:w-1/4 rounded-2xl shadow border p-[20px] sm:p-[25px] h-fit bg-white'>
      <ProfileSidebarUserInfo />
      <hr className='bg-gray-200' />
      <div>
        <h2 className='text-lg sm:text-xl font-semibold mb-[20px]'>Мій акаунт</h2>
        <ProfileSidebarNav />
      </div>
    </aside>
  );
}

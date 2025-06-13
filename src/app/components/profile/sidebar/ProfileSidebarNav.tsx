import React from 'react';
import ProfileSidebarNavLink from './ProfileSidebarNavLink';

export default function ProfileSidebarNav() {
  return (
    <nav className='flex flex-col gap-[10px]'>
      <ProfileSidebarNavLink href='/profile' label='Мій профіль' />
      <ProfileSidebarNavLink href='/profile/orders' label='Мої замовлення' />
    </nav>
  );
}

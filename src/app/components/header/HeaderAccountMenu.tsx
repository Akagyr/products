import React from 'react';
import { logout } from '@/app/auth/actions/logout';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';
import HeaderAccountMenuNavLink from './HeaderAccountMenuNavLink';

export default function HeaderAccountMenu({
  setIsDropdownOpen,
}: {
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    router.push('/');
    await logout();
    setUser(null);
  };

  return (
    <div className='absolute top-full right-0 bg-white rounded-xl shadow-2xl border border-gray-100 z-50'>
      <div className='px-[20px] py-[10px] border-b border-gray-100'>
        <p className='font-bold'>{user?.name}</p>
        <p className='text-sm text-gray-500'>{user?.email}</p>
      </div>
      <HeaderAccountMenuNavLink
        href='/profile'
        label='Мій профіль'
        setIsDropdownOpen={setIsDropdownOpen}
        stylesClass='rounded-t-xl'
      />
      <HeaderAccountMenuNavLink
        href='/profile/orders'
        label='Мої замовлення'
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <div className='border-t border-gray-100'>
        <button
          onClick={handleLogout}
          className='w-full px-[20px] py-[10px] text-left text-red-600 lg:hover:bg-red-50 transition-colors duration-150 rounded-b-xl'
        >
          Вийти
        </button>
      </div>
    </div>
  );
}

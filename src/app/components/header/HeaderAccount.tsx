'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ProfileIcon from '../icons/ProfileIcon';
import { useAuth } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/auth/actions/logout';

export default function HeaderAccount() {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
    setUser(null);
    router.push('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (loading) {
    return (
      <>
        <div className='lg:hidden'>
          <ProfileIcon styleClass='w-[22px] h-[22px]' />
        </div>
        <div className='hidden lg:flex flex-col items-center border-r-[1px] border-rose pr-[30px]'>
          <div className='flex gap-[5px] text-sm text-rose'>Завантаження...</div>
          <p className='font-semibold'>Мій профіль</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Link href='/auth' className='lg:hidden'>
          <ProfileIcon styleClass='w-[22px] h-[22px]' />
        </Link>
        <Link
          href='/auth'
          className='hidden lg:flex flex-col items-center border-r-[1px] border-rose pr-[30px]'
        >
          <div className='flex gap-[5px] text-rose'>
            Вхід
            <span>/</span>
            Реєстрація
          </div>
          <p className='font-semibold'>Мій профіль</p>
        </Link>
      </>
    );
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <div className='lg:hidden relative'>
        <button onClick={toggleDropdown}>
          <ProfileIcon styleClass='w-[22px] h-[22px]' />
        </button>

        {isDropdownOpen && (
          <>
            <div
              className='fixed inset-0 bg-black bg-opacity-30 z-40'
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className='fixed left-0 right-0 top-0 h-fit bg-white shadow-lg z-50 text-center pt-[20px]'>
              <div className='p-[15px] border-b border-gray-300'>
                <p className='font-semibold'>
                  Вітаємо, <span className='text-rose'>{user.name}</span>
                </p>
              </div>
              <ul className='text-sm'>
                <li>
                  <Link
                    href='/profile'
                    className='block p-[15px] border-b border-gray-200'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Мій профіль
                  </Link>
                </li>
                <li>
                  <Link
                    href='/profile/orders'
                    className='block p-[15px] border-b border-gray-200'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Мої замовлення
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='block w-full p-[15px] bg-rose text-white'
                  >
                    Вийти
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className='hidden lg:block'>
        <button
          onClick={toggleDropdown}
          className='flex flex-col items-center border-r-[1px] border-rose pr-[30px] cursor-pointer'
        >
          <p className='font-semibold'>
            Вітаємо, <span className='text-rose'>{user.name}</span>
          </p>
          <p className='font-semibold'>Мій профіль</p>
        </button>

        {isDropdownOpen && (
          <div className='absolute right-0 top-full mt-[10px] w-full bg-white rounded-md shadow-lg z-50 border border-gray-200'>
            <ul className='text-sm'>
              <li>
                <Link
                  href='/profile'
                  className='block px-[15px] py-[10px] hover:bg-gray-100'
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Мій профіль
                </Link>
              </li>
              <li>
                <Link
                  href='/profile/orders'
                  className='block px-[15px] py-[10px] hover:bg-gray-100'
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Мої замовлення
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-[15px] py-[10px] text-rose hover:bg-gray-100'
                >
                  Вийти
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

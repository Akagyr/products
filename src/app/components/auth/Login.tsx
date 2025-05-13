'use client';

import Link from 'next/link';
import React, { FormEvent } from 'react';
import { login } from '@/app/auth/actions/login';
import { useAuth } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';
import { AuthResult } from '@/app/types';

export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  setIsLoading,
  toggleIsLogin,
  setError,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsLogin: (isLogin: boolean) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const result = (await login(formData)) as AuthResult;

      if (result.success) {
        setUser(result.user);
        router.back();
      } else {
        setError(result.message || 'Помилка при вході в систему');
      }
    } catch (error) {
      setError('Сталася помилка. Спробуйте пізніше.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className='mb-[10px]'>Введіть ваші електронну адресу та пароль:</p>
      <form className='flex flex-col gap-[10px]' onSubmit={handleLoginSubmit}>
        <input
          className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Електронна адреса'
        />
        <input
          className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Пароль'
        />
        <button
          type='submit'
          className='py-3 px-5 mt-5 bg-rose rounded-xl w-full text-white font-medium disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? 'Завантаження...' : 'Увійти'}
        </button>
      </form>
      <div className='flex flex-col gap-[10px] mt-[20px]'>
        <p className='text-sm'>
          Забули пароль?{' '}
          <Link href='' className='text-rose'>
            Відновити пароль
          </Link>
        </p>
        <p className='text-sm'>
          Немає акаунту?{' '}
          <button className='text-rose' onClick={() => toggleIsLogin(false)}>
            Створити новий аккаунт
          </button>
        </p>
      </div>
    </div>
  );
}

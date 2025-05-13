'use client';

import React, { FormEvent } from 'react';
import { register } from '@/app/auth/actions/register';
import { useAuth } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';
import { AuthResult } from '@/app/types';

export default function Registration({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  setIsLoading,
  toggleIsLogin,
  setError,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsLogin: (isLogin: boolean) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);

      const result = (await register(formData)) as AuthResult;

      if (result.success) {
        setUser(result.user);
        router.back();
      } else {
        setError(result.message || 'Помилка при реєстрації');
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
      <p className='mb-[10px]'>Створіть новий акаунт:</p>
      <form className='flex flex-col gap-[10px]' onSubmit={handleRegisterSubmit}>
        <input
          className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше ім'я"
        />
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
        <input
          className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Підтвердіть пароль'
        />
        <button
          type='submit'
          className='py-3 px-5 mt-5 bg-rose rounded-xl w-full text-white font-medium disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? 'Завантаження...' : 'Зареєструватися'}
        </button>
      </form>
      <div className='mt-[20px]'>
        <p className='text-sm'>
          Вже є акаунт?{' '}
          <button className='text-rose' onClick={() => toggleIsLogin(true)}>
            Увійти в акаунт
          </button>
        </p>
      </div>
    </div>
  );
}

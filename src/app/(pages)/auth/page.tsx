'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleIsLogin = (isLogin: boolean) => {
    if (isLogin) {
      setIsLogin(isLogin);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setIsLogin(isLogin);
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in' : 'Registering', { email, password });
  };

  return (
    <div className='my-[40px] max-w-[450px] mx-auto text-center flex flex-col gap-[20px]'>
      <h2 className='text-2xl font-semibold'>
        {isLogin ? 'Вхід до акаунту' : 'Створення акаунту'}
      </h2>
      <div className='flex border-2 border-gray-300 rounded-xl overflow-hidden'>
        <button
          className={`flex-1 py-[10px] ${isLogin ? 'bg-rose text-white' : 'bg-white'}`}
          onClick={() => toggleIsLogin(true)}
          type='button'
        >
          Вхід
        </button>
        <button
          className={`flex-1 py-[10px] ${!isLogin ? 'bg-rose text-white' : 'bg-white'}`}
          onClick={() => toggleIsLogin(false)}
          type='button'
        >
          Реєстрація
        </button>
      </div>

      {isLogin ? (
        <div>
          <p className='mb-[10px]'>Введіть ваші електронну адресу та пароль:</p>
          <form className='flex flex-col gap-[10px]'>
            <input
              className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Електронна адреса'
              required
            />
            <input
              className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Пароль'
              required
            />
            <button
              type='submit'
              className='py-3 px-5 mt-5 bg-rose rounded-xl w-full text-white font-medium'
              onClick={handleSubmit}
            >
              Увійти
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
      ) : (
        <div>
          <p className='mb-[10px]'>Створіть новий акаунт:</p>
          <form className='flex flex-col gap-[10px]'>
            <input
              className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше ім'я"
              required
            />
            <input
              className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Електронна адреса'
              required
            />
            <input
              className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Пароль'
              required
            />
            <input
              className='w-full px-[15px] py-[10px] border-2 border-gray-300 rounded-xl'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Підтвердіть пароль'
              required
            />
            <button
              className='py-3 px-5 mt-5 bg-rose rounded-xl w-full text-white font-medium'
              onClick={handleSubmit}
            >
              Зареєструватися
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
      )}
    </div>
  );
}

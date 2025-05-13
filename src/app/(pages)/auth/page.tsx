'use client';

import { useState } from 'react';
import Login from '@/app/components/auth/Login';
import Registration from '@/app/components/auth/Registration';

export default function AuthPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleIsLogin = (isLogin: boolean) => {
    setError('');
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

  return (
    <div className='my-[40px] px-[20px] sm:px-0 mx-auto max-w-[450px] text-center flex flex-col gap-[20px]'>
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

      {error && <div className='p-[10px] bg-red-100 text-red-700 rounded-xl'>{error}</div>}

      {isLogin ? (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          toggleIsLogin={toggleIsLogin}
          setError={setError}
        />
      ) : (
        <Registration
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          toggleIsLogin={toggleIsLogin}
          setError={setError}
        />
      )}
    </div>
  );
}

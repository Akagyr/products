'use client';

import { useAuth } from '@/app/context/authContext';
import Loading from '@/app/loading';
import React, { useEffect, useState } from 'react';

export default function ProfileUserInfo() {
  const { user, loading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!editData.name.trim() || !editData.email.trim()) {
      setError("Всі поля обов'язкові для заповнення");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateUser(editData);
      setIsEditing(false);
    } catch (error) {
      setError('Помилка при збереженні даних');
      console.error('Error saving user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
      });
    }
    setIsEditing(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className='flex gap-[30px]'>
        <div className='w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] bg-rose/5 rounded-xl animate-pulse' />
        <div className='flex-1 min-w-0'>
          <div className='h-[40px] bg-rose/5 rounded-xl animate-pulse w-1/2 mb-[15px] sm:mb-[20px]' />
          <div className='h-[40px] bg-rose/5 rounded-xl animate-pulse w-1/2 mb-[15px] sm:mb-[20px]' />
          <div className='h-[40px] bg-rose/5 rounded-xl animate-pulse w-1/2' />
        </div>
      </div>
    );
  }

  if (!user) {
    return <p>Помилка завантаження даних користувача</p>;
  }

  return (
    <div className='flex flex-col gap-[30px]'>
      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl'>
          {error}
        </div>
      )}

      <div className='flex flex-col sm:flex-row gap-[20px] sm:gap-[30px] lg:gap-[40px] items-start'>
        <div className='w-[50px] sm:w-[100px] aspect-square bg-rose rounded-xl flex items-center justify-center shadow'>
          <span className='text-[25px] sm:text-[50px] text-white font-bold'>
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : user.email.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>

        {!isEditing ? (
          <div className='flex flex-col gap-[15px] sm:gap-[20px]'>
            <div>
              <p className='text-sm text-gray-500 mb-[5px]'>Ім'я</p>
              <p className='text-base sm:text-lg font-semibold'>{user.name}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500 mb-[5px]'>Email</p>
              <p className='text-base sm:text-lg'>{user.email}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500 mb-[5px]'>Дата реєстрації</p>
              <p className='text-base sm:text-lg'>
                {new Date(user.createdAt).toLocaleDateString('uk-UA', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-[15px] sm:gap-[20px] min-w-[40%]'>
            <div>
              <label className='block text-sm text-gray-500 mb-[5px]'>Ім'я</label>
              <input
                type='text'
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className='w-full px-[15px] py-[10px] border rounded-xl focus:outline-none focus:border-rose transition-colors'
                placeholder="Введіть ваше ім'я"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className='block text-sm text-gray-500 mb-[5px]'>Email</label>
              <input
                type='email'
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className='w-full px-[15px] py-[10px] border rounded-xl focus:outline-none focus:border-rose transition-colors'
                placeholder='Введіть ваш email'
                disabled={isLoading}
              />
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-col sm:flex-row gap-[10px] sm:gap-[15px]'>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className='px-[20px] py-[10px] rounded-xl bg-rose text-white lg:hover:bg-rose-hover transition-colors font-medium text-sm sm:text-base w-full sm:w-fit'
          >
            Редагувати профіль
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className='px-[20px] py-[10px] rounded-xl bg-rose text-white lg:hover:bg-rose-hover transition-colors font-medium text-sm sm:text-base w-full sm:w-fit disabled:opacity-50'
            >
              {isLoading ? 'Збереження...' : 'Зберегти зміни'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className='px-[20px] py-[10px] rounded-xl border border-gray-300 text-gray-700 lg:hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base w-full sm:w-fit disabled:opacity-50'
            >
              Скасувати
            </button>
          </>
        )}
      </div>
    </div>
  );
}

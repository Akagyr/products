'use client';

import React, { useState } from 'react';

export default function DataLoader() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLoadData = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/loadData', { method: 'POST' });

      if (!response.ok) {
        throw new Error('Failed to load data');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(`Ошибка: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className='bg-blue-500 text-white py-2 px-4 rounded'
        onClick={handleLoadData}
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Загрузить данные'}
      </button>
      {message && <p className='mt-4'>{message}</p>}
    </div>
  );
}

import React from 'react';

export default function ProductFeatures() {
  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='flex gap-[5px] items-center'>
        <div className='w-[35px] p-[6px] bg-gray-400 rounded-full'>
          <img src='/schedule.png' className='w-full' alt='Schedule icon' />
        </div>
        <p className='text-gray-500'>Відправка протягом 1-3 робочих днів</p>
      </div>
    </div>
  );
}

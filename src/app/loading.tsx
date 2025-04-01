import React from 'react';

export default function Loading() {
  return (
    <div className='flex flex-row gap-[10px] justify-center items-center h-full'>
      <div className='w-[20px] h-[20px] rounded-full bg-rose animate-bounce'></div>
      <div className='w-[20px] h-[20px] rounded-full bg-rose animate-bounce [animation-delay:-.3s]'></div>
      <div className='w-[20px] h-[20px] rounded-full bg-rose animate-bounce [animation-delay:-.5s]'></div>
    </div>
  );
}

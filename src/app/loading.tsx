import React from 'react';

export default function Loading() {
  return (
    <div className='flex flex-row gap-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
      <div className='w-[20px] h-[20px] rounded-full bg-[#b85aff] animate-bounce'></div>
      <div className='w-[20px] h-[20px] rounded-full bg-[#b85aff] animate-bounce [animation-delay:-.3s]'></div>
      <div className='w-[20px] h-[20px] rounded-full bg-[#b85aff] animate-bounce [animation-delay:-.5s]'></div>
    </div>
  );
}

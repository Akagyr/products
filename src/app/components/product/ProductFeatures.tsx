import React from 'react';
import DeliveryIcon from '../icons/DeliveryIcon';
import QulityIcon from '../icons/QulityIcon';

export default function ProductFeatures() {
  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex gap-[20px]'>
        <DeliveryIcon styles='w-[30px] h-[30px]' />
        <div className='text-[#231f20]'>
          <h3 className='font-semibold mb-[5px]'>Безпечна доставка</h3>
          <p>Наш унікальний метод упаковки забезпечує дбайливе транспортування.</p>
        </div>
      </div>
      <div className='flex gap-[20px]'>
        <QulityIcon styles='w-[30px] h-[30px]' />
        <div className='text-[#231f20]'>
          <h3 className='font-semibold mb-[5px]'>Високоякісні рослини</h3>
          <p>Наші рослини повністю готові до відправлення!</p>
        </div>
      </div>
    </div>
  );
}

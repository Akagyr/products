import React from 'react';

export default function Sort() {
  return (
    <div className='flex items-center justify-end gap-[20px] mb-[20px]'>
      <label>Сортування:</label>
      <select id='sort' name='sort'>
        <option value=''>по замовченню</option>
        <option value='nameBottom'>по назві (А - Я)</option>
        <option value='nameTop'>по назві (Я - А)</option>
        <option value='priceTop'>по ціні (низька {'>'} висока)</option>
        <option value='priceBottom'>по ціні (висока {'>'} низька)</option>
        <option value='rateBottom'>по рейтингу (високий)</option>
        <option value='rateTop'>по рейтингу (низький)</option>
      </select>
    </div>
  );
}

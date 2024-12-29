'use client';

import React from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/cartContext';
import { CartItem } from '@/app/types';

export default function CheckoutForm() {
  const navigate = useRouter();
  const { getCart } = useCart();
  const checkoutProductArr = getCart()! as CartItem[];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const message = `Замовлення:\n\n Ім'я: ${e.target.name.value}\n Пошта: ${
      e.target.email.value
    }\n Номер телефона: ${e.target.phone.value}\n\nТовари:\n\n ${checkoutProductArr.map(
      (el) => `${el.product.name + ' ' + el.product.category} - ${el.quantity} item(-s)\n`
    )}`;
    console.log(message);

    // const templateParams = {
    //   to_email: 'product.order.2024@gmail.com',
    //   from_name: e.target.name.value,
    //   from_email: e.target.email.value,
    //   subject: `Замовлення від ${e.target.name.value}`,
    //   message: message,
    // };
    // emailjs.send('service_mzwdlqh', 'template_9iya8wn', templateParams, 'ojBoTbNUh-9ltG-Fl');

    navigate.replace('/');
  };

  return (
    <form className='w-[500px] flex flex-col gap-[15px] py-[15px]' onSubmit={handleSubmit}>
      <div>
        <label className='font-medium pl-[15px]'>Імʼя та прізвище</label>
        <input
          className='py-[8px] px-[15px] bg-gray-100 rounded-full w-full block'
          type='text'
          name='name'
          placeholder='Іван Петренко'
          required
        />
      </div>
      <div>
        <label className='font-medium pl-[15px]'>Електронна пошта</label>
        <input
          className='py-[8px] px-[15px] bg-gray-100 rounded-full w-full block'
          type='email'
          name='email'
          placeholder='ivan.petrenko@gmail.com'
          required
        />
      </div>
      <div>
        <label className='font-medium pl-[15px]'>Номер телефона</label>
        <input
          type='tel'
          className='py-[8px] px-[15px] bg-gray-100 rounded-full w-full block'
          name='phone'
          pattern='[0-9]{1,4}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{3}'
          placeholder='0502361188'
          required
        />
      </div>
      <div className='mt-[20px] text-right'>
        <button
          type='submit'
          className='px-[10px] md:px-[20px] py-[8px] text-sm md:text-base text-center rounded-full bg-green-400 lg:hover:bg-green-500 w-fit transition-colors'
        >
          Оформити замовлення
        </button>
      </div>
    </form>
  );
}

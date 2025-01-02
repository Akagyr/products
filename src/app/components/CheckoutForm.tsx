'use client';

import React from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/cartContext';
import { CartItem } from '@/app/types';

export default function CheckoutForm() {
  const navigate = useRouter();
  const { getCart, getCartSubtotal } = useCart();
  const checkoutProductArr = getCart()! as CartItem[];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const message = `Замовлення:\nІм'я: ${e.target.name.value}\nПошта: ${
      e.target.email.value
    }\nНомер телефона: ${e.target.phone.value}\n\nТовари:\n${checkoutProductArr
      .map((el) => `${el.product.name + ' ' + el.product.category} - ${el.quantity} од.`)
      .join('\n')}\n\nСума ${getCartSubtotal().toFixed(2)} грн.`;

    const templateParams = {
      to_email: 'product.order.2024@gmail.com',
      from_name: e.target.name.value,
      from_email: e.target.email.value,
      subject: `Замовлення від ${e.target.name.value}`,
      message: message,
    };

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    navigate.replace('/');
  };

  return (
    <div className='w-full lg:w-[550px] md:mx-auto'>
      <h2 className='text-xl md:text-2xl font-bold py-[15px] border-b'>
        Дані для відправки замовлення
      </h2>
      <form className='w-full flex flex-col gap-[15px] py-[15px]' onSubmit={handleSubmit}>
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
            pattern='^0\d{9}$'
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
    </div>
  );
}

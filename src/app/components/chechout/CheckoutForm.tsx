'use client';

import React from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/cartContext';

export default function CheckoutForm() {
  const navigate = useRouter();
  const { getCart, getCartTotal } = useCart();
  const checkoutProductArr = getCart();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;

    const message = `Замовлення:\nІм'я: ${nameInput.value}\nПошта: ${
      emailInput.value
    }\nНомер телефона: ${phoneInput.value}\n\nТовари:\n${checkoutProductArr
      .map((el) => `${el.species + ' ' + el.name}`)
      .join('\n')}\n\nСума ${getCartTotal().toFixed(2)} грн.`;

    const templateParams = {
      to_email: 'product.order.2024@gmail.com',
      from_name: nameInput.value,
      from_email: emailInput.value,
      subject: `Замовлення від ${nameInput.value}`,
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
    <div className='w-full'>
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
            className='px-[10px] md:px-[20px] py-[8px] text-sm md:text-base text-center rounded-full bg-[#b85aff] lg:hover:bg-[#7c24c0] text-white w-fit transition-colors'
          >
            Оформити замовлення
          </button>
        </div>
      </form>
    </div>
  );
}

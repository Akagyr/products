'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/cartContext';
import RadioButton from '../RadioButton';
import CustomSelect from '../CustomSelect';

export default function CheckoutForm() {
  const navigate = useRouter();
  const { getCart, getCartTotal } = useCart();
  const checkoutProductArr = getCart();

  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryType, setDeliveryType] = useState('depart');

  const getDeliveryPlaceholder = () => {
    switch (deliveryType) {
      case 'depart':
        return 'відділення';
      case 'parcel':
        return 'поштомат';
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const lastNameInput = form.elements.namedItem('lastName') as HTMLInputElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;

    const message = `Замовлення:\nІм'я: ${nameInput.value}\nПрізвище: ${
      lastNameInput.value
    }\nПошта: ${emailInput.value}\nНомер телефона: ${
      phoneInput.value
    }\n\nТовари:\n${checkoutProductArr
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
    <form className='w-full flex flex-col gap-[40px]' onSubmit={handleSubmit}>
      <section className='flex flex-col gap-[20px]'>
        <h2 className='text-lg md:text-xl font-semibold'>Контактні дані</h2>
        <div className='flex gap-[20px]'>
          <input
            className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full lg:focus:border-rose'
            type='text'
            name='name'
            placeholder='Імʼя'
            required
          />
          <input
            className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full lg:focus:border-rose'
            type='text'
            name='lastName'
            placeholder='Прізвище'
            required
          />
        </div>
        <input
          className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full lg:focus:border-rose'
          type='email'
          name='email'
          placeholder='Електронна адреса'
          required
        />
        <input
          type='tel'
          className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full lg:focus:border-rose'
          name='phone'
          pattern='^0\d{9}$'
          placeholder='Номер телефону'
          required
        />
      </section>
      <section className='flex flex-col gap-[20px]'>
        <h2 className='text-lg md:text-xl font-semibold'>Адреса доставки</h2>
        <input
          type='text'
          className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full focus:border-rose'
          name='region'
          placeholder='Область'
          required
        />
        <input
          type='text'
          className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full focus:border-rose'
          name='city'
          placeholder='Місто'
          required
        />
        <input
          type='text'
          className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full focus:border-rose'
          name='street'
          placeholder='Вулиця'
          required
        />
        <div className='flex gap-[20px]'>
          <input
            type='text'
            className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full focus:border-rose'
            name='build'
            placeholder='Номер будинку'
            required
          />
          <input
            type='text'
            className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full focus:border-rose'
            name='apart'
            placeholder={`Номер квартири (необов'язково)`}
          />
        </div>
        <input
          type='text'
          className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full focus:border-rose'
          name='postal'
          placeholder='Поштовий індекс'
        />
      </section>
      <section className='flex flex-col gap-[20px]'>
        <h2 className='text-lg md:text-xl font-semibold'>Вид доставки</h2>
        <RadioButton
          id='novapost'
          name='deliveryMethod'
          value='novapost'
          onChange={() => setDeliveryMethod('novapost')}
          checked={deliveryMethod === 'novapost'}
          label='Нова пошта'
        />
        {deliveryMethod === 'novapost' && (
          <>
            <CustomSelect
              options={[
                { value: 'depart', label: 'Відділення' },
                { value: 'parcel', label: 'Поштомат' },
                { value: 'courier', label: "Кур'єр" },
              ]}
              value={deliveryType}
              onChange={(value) => setDeliveryType(value)}
              placeholder='Оберіть тип доставки'
              required={deliveryMethod === 'novapost'}
            />
            {deliveryType && deliveryType !== 'courier' && (
              <input
                type='text'
                className='py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full lg:focus:border-rose'
                name='deliveryTypeDetails'
                placeholder={`Вкажіть ${getDeliveryPlaceholder()}`}
                required={deliveryMethod === 'novapost'}
              />
            )}
          </>
        )}
        <RadioButton
          id='ukrpost'
          name='deliveryMethod'
          value='ukrpost'
          onChange={() => setDeliveryMethod('ukrpost')}
          checked={deliveryMethod === 'ukrpost'}
          label='Укрпошта'
        />
      </section>
      <div className='text-right'>
        <button
          type='submit'
          className='px-[10px] md:px-[20px] py-[12px] text-sm md:text-base text-center rounded-xl bg-rose lg:hover:bg-rose-hover text-white w-full transition-colors'
        >
          Оформити замовлення
        </button>
      </div>
    </form>
  );
}

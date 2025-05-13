'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RadioButton from '../RadioButton';
import CustomSelect from '../CustomSelect';
import CheckoutFormInput from './CheckoutFormInput';

type FormData = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
  city: string;
  street: string;
  build: string;
  apart?: string;
  postal: string;
  deliveryMethod: string;
  deliveryTypeDetails?: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export default function CheckoutForm() {
  const navigate = useRouter();

  const [deliveryMethod, setDeliveryMethod] = useState<string>('');
  const [deliveryType, setDeliveryType] = useState<string>('depart');
  const [errors, setErrors] = useState<FormErrors>({});

  const getDeliveryPlaceholder = () => {
    switch (deliveryType) {
      case 'depart':
        return 'відділення';
      case 'parcel':
        return 'поштомат';
      default:
        return '';
    }
  };

  const validateForm = (formData: FormData) => {
    let newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = 'Імʼя обовʼязкове';
    if (!formData.lastName) newErrors.lastName = 'Прізвище обовʼязкове';
    if (!formData.email) newErrors.email = 'Вкажіть електронну адресу';
    if (!formData.phone) newErrors.phone = 'Вкажіть номер телефону';
    if (formData.phone && !/^0\d{9}$/.test(formData.phone))
      newErrors.phone = 'Невірний номер телефону';
    if (!formData.region) newErrors.region = 'Вкажіть область';
    if (!formData.city) newErrors.city = 'Вкажіть місто';
    if (!formData.street) newErrors.street = 'Вкажіть вулицю';
    if (!formData.build) newErrors.build = 'Вкажіть номер будинку';
    if (!formData.postal) newErrors.postal = 'Вкажіть поштовий індекс';

    if (!formData.deliveryMethod) {
      newErrors.deliveryMethod = 'Оберіть спосіб доставки';
    }

    if (
      formData.deliveryMethod === 'novapost' &&
      deliveryType !== 'courier' &&
      !formData.deliveryTypeDetails
    ) {
      newErrors.deliveryTypeDetails = `Вкажіть ${getDeliveryPlaceholder()}`;
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formDataObj: FormData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      region: (form.elements.namedItem('region') as HTMLInputElement).value,
      city: (form.elements.namedItem('city') as HTMLInputElement).value,
      street: (form.elements.namedItem('street') as HTMLInputElement).value,
      build: (form.elements.namedItem('build') as HTMLInputElement).value,
      apart: (form.elements.namedItem('apart') as HTMLInputElement)?.value || '',
      postal: (form.elements.namedItem('postal') as HTMLInputElement).value,
      deliveryMethod: deliveryMethod,
      deliveryTypeDetails:
        (form.elements.namedItem('deliveryTypeDetails') as HTMLInputElement)?.value || '',
    };

    const validationErrors = validateForm(formDataObj);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formDataObj);
    }
  };

  return (
    <form className='w-full flex flex-col gap-[40px]' onSubmit={handleSubmit} noValidate>
      <section className='flex flex-col gap-[20px]'>
        <h2 className='text-lg md:text-xl font-semibold'>Контактні дані</h2>
        <div className='flex flex-col lg:flex-row gap-[20px]'>
          <CheckoutFormInput
            type='text'
            name='name'
            placeholder='Імʼя'
            required={true}
            error={errors.name}
          />
          <CheckoutFormInput
            type='text'
            name='lastName'
            placeholder='Прізвище'
            required={true}
            error={errors.lastName}
          />
        </div>
        <CheckoutFormInput
          type='email'
          name='email'
          placeholder='Електронна адреса'
          required={true}
          error={errors.email}
        />
        <CheckoutFormInput
          type='tel'
          name='phone'
          pattern='^0\d{9}$'
          placeholder='Номер телефону'
          required={true}
          error={errors.phone}
        />
      </section>
      <section className='flex flex-col gap-[20px]'>
        <h2 className='text-lg md:text-xl font-semibold'>Адреса доставки</h2>
        <CheckoutFormInput
          type='text'
          name='region'
          placeholder='Область'
          required={true}
          error={errors.region}
        />
        <CheckoutFormInput
          type='text'
          name='city'
          placeholder='Місто'
          required={true}
          error={errors.city}
        />
        <CheckoutFormInput
          type='text'
          name='street'
          placeholder='Вулиця'
          required={true}
          error={errors.street}
        />
        <div className='flex flex-col lg:flex-row gap-[20px]'>
          <CheckoutFormInput
            type='text'
            name='build'
            placeholder='Номер будинку'
            required={true}
            error={errors.build}
          />
          <CheckoutFormInput
            type='text'
            name='apart'
            placeholder={`Номер квартири (необов'язково)`}
          />
        </div>
        <CheckoutFormInput
          type='text'
          name='postal'
          placeholder='Поштовий індекс'
          required={true}
          error={errors.postal}
        />
      </section>
      <section className='flex flex-col gap-[20px]'>
        <h2 className='text-lg md:text-xl font-semibold'>Вид доставки</h2>
        <div>
          <div className={errors.deliveryMethod ? 'border border-red-500 p-3 rounded-md' : ''}>
            <div className='flex flex-col gap-[20px]'>
              <RadioButton
                id='novapost'
                name='deliveryMethod'
                value='novapost'
                onChange={() => {
                  setDeliveryMethod('novapost');
                  setErrors({ ...errors, deliveryMethod: undefined });
                }}
                checked={deliveryMethod === 'novapost'}
                label='Нова пошта'
              />
              <RadioButton
                id='ukrpost'
                name='deliveryMethod'
                value='ukrpost'
                onChange={() => {
                  setDeliveryMethod('ukrpost');
                  setErrors({ ...errors, deliveryMethod: undefined });
                }}
                checked={deliveryMethod === 'ukrpost'}
                label='Укрпошта'
              />
            </div>

            {errors.deliveryMethod && (
              <p className='text-red-500 text-sm mt-[10px]'>{errors.deliveryMethod}</p>
            )}
          </div>

          {deliveryMethod === 'novapost' && (
            <>
              <div className='mt-3'>
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
              </div>
              {deliveryType !== 'courier' && (
                <div className='mt-3'>
                  <CheckoutFormInput
                    type='text'
                    name='deliveryTypeDetails'
                    placeholder={`Вкажіть ${getDeliveryPlaceholder()}`}
                    required={true}
                    error={errors.deliveryTypeDetails}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <div className='text-right'>
        <button
          type='submit'
          className='px-[10px] md:px-[20px] py-[12px] text-base text-center rounded-xl bg-rose lg:hover:bg-rose-hover text-white w-full transition-colors'
        >
          Оформити замовлення
        </button>
      </div>
    </form>
  );
}

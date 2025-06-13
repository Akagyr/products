'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutFormInput from './CheckoutFormInput';
import CheckoutFormDeliverySelect from './CheckoutFormDeliverySelect';
import { CheckoutFormData, CheckoutFormFieldValidation, Order } from '@/app/types';
import { useCart } from '@/app/context/cartContext';
import { useAuth } from '@/app/context/authContext';

export default function CheckoutForm() {
  const navigate = useRouter();
  const { clearCart, cartItems, getCartTotal } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    region: '',
    city: '',
    street: '',
    build: '',
    apart: '',
    postal: '',
    deliveryMethod: '',
    deliveryTypeDetails: '',
  });

  const requiredFields = [
    'name',
    'lastName',
    'email',
    'phone',
    'region',
    'city',
    'street',
    'build',
    'postal',
  ] as (keyof CheckoutFormData)[];

  const [deliveryType, setDeliveryType] = useState<string>('depart');
  const [fieldValidation, setFieldValidation] = useState<CheckoutFormFieldValidation>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryMethodError, setDeliveryMethodError] = useState<string>('');
  const [forceShowErrors, setForceShowErrors] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (shouldNavigate) {
      const timer = setTimeout(() => {
        navigate.push('/');
        setShouldNavigate(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [shouldNavigate, navigate]);

  const handleFieldChange = useCallback(
    (fieldName: keyof CheckoutFormData) => (value: string, isValid: boolean) => {
      setFormData((prev: CheckoutFormData) => ({
        ...prev,
        [fieldName]: value,
      }));

      setFieldValidation((prev: CheckoutFormFieldValidation) => ({
        ...prev,
        [fieldName]: isValid,
      }));
    },
    []
  );

  const validateAllFields = useCallback((): void => {
    setForceShowErrors(true);
    const newFieldValidation: CheckoutFormFieldValidation = {};

    requiredFields.forEach((field) => {
      const value = formData[field];
      const isEmpty = !value || !value.toString().trim();
      newFieldValidation[field] = !isEmpty;
    });

    if (formData.deliveryMethod === 'novapost' && deliveryType !== 'courier') {
      const deliveryDetailsValue = formData.deliveryTypeDetails;
      const isEmpty = !deliveryDetailsValue || !deliveryDetailsValue.toString().trim();
      newFieldValidation.deliveryTypeDetails = !isEmpty;
    }

    setFieldValidation((prev) => ({ ...prev, ...newFieldValidation }));
  }, [formData, deliveryType, requiredFields]);

  const isFormValid = useCallback((): boolean => {
    const requiredFieldsValid = requiredFields.every((field) => fieldValidation[field] === true);
    const deliveryValid = !!formData.deliveryMethod;
    const deliveryDetailsValid =
      formData.deliveryMethod !== 'novapost' ||
      deliveryType === 'courier' ||
      fieldValidation.deliveryTypeDetails === true;

    return requiredFieldsValid && deliveryValid && deliveryDetailsValid;
  }, [fieldValidation, formData.deliveryMethod, deliveryType, requiredFields]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!isFormValid()) {
        validateAllFields();
        setIsSubmitting(false);

        if (!formData.deliveryMethod) {
          setDeliveryMethodError('Оберіть спосіб доставки');
        }
        return;
      }

      if (!formData.deliveryMethod) {
        setDeliveryMethodError('Оберіть спосіб доставки');
        setIsSubmitting(false);
        return;
      }

      const userId = user!.id;
      const orderTotal = getCartTotal() as number;
      const orderItems = cartItems.map((item) => ({
        id: '',
        orderId: '',
        productName: item.name,
        productImage: Array.isArray(item.images)
          ? item.images[0] || ''
          : item.images || item.images?.[0] || '',
        productPrice: item.price,
      }));

      if (userId && orderTotal && orderItems) {
        const orderData = {
          id: '',
          number: 0,
          userId: userId,
          status: 'PENDING',
          total: orderTotal,
          createdAt: new Date(),
          updatedAt: new Date(),
          items: orderItems,
        };

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          clearCart();
          setShouldNavigate(true);
        } else {
          console.error('Error creating order:', result.error);
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setIsSubmitting(false);
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
            placeholder="Ваше ім'я"
            required={true}
            value={formData.name}
            onChange={handleFieldChange('name')}
            validationRules={{ minLength: 2, requiredMessage: 'Імʼя обовʼязкове' }}
            forceShowError={forceShowErrors}
          />
          <CheckoutFormInput
            type='text'
            name='lastName'
            placeholder='Ваше прізвище'
            required={true}
            value={formData.lastName}
            onChange={handleFieldChange('lastName')}
            validationRules={{ minLength: 2, requiredMessage: 'Прізвище обовʼязкове' }}
            forceShowError={forceShowErrors}
          />
        </div>
        <CheckoutFormInput
          type='email'
          name='email'
          placeholder='your@email.com'
          required={true}
          value={formData.email}
          onChange={handleFieldChange('email')}
          validationRules={{ requiredMessage: 'Вкажіть електронну адресу' }}
          forceShowError={forceShowErrors}
        />
        <CheckoutFormInput
          type='tel'
          name='phone'
          placeholder='+380 XX XXX XX XX'
          required={true}
          value={formData.phone}
          onChange={handleFieldChange('phone')}
          validationRules={{ requiredMessage: 'Вкажіть номер телефону' }}
          forceShowError={forceShowErrors}
        />
      </section>
      <section className='flex flex-col gap-[20px]'>
        <h2 className='text-lg md:text-xl font-semibold'>Адреса доставки</h2>
        <CheckoutFormInput
          type='text'
          name='postal'
          placeholder='Поштовий індекс'
          required={true}
          value={formData.postal}
          onChange={handleFieldChange('postal')}
          validationRules={{ requiredMessage: 'Вкажіть поштовий індекс' }}
          forceShowError={forceShowErrors}
        />
        <CheckoutFormInput
          type='text'
          name='region'
          placeholder='Область'
          required={true}
          value={formData.region}
          onChange={handleFieldChange('region')}
          validationRules={{ minLength: 2, requiredMessage: 'Вкажіть область' }}
          forceShowError={forceShowErrors}
        />
        <CheckoutFormInput
          type='text'
          name='city'
          placeholder='Місто'
          required={true}
          value={formData.city}
          onChange={handleFieldChange('city')}
          validationRules={{ minLength: 2, requiredMessage: 'Вкажіть місто' }}
          forceShowError={forceShowErrors}
        />
        <CheckoutFormInput
          type='text'
          name='street'
          placeholder='Вулиця'
          required={true}
          value={formData.street}
          onChange={handleFieldChange('street')}
          validationRules={{ minLength: 3, requiredMessage: 'Вкажіть вулицю' }}
          forceShowError={forceShowErrors}
        />
        <div className='flex flex-col lg:flex-row gap-[20px]'>
          <CheckoutFormInput
            type='text'
            name='build'
            placeholder='Номер будинку'
            required={true}
            value={formData.build}
            onChange={handleFieldChange('build')}
            validationRules={{ minLength: 1, requiredMessage: 'Вкажіть номер будинку' }}
            forceShowError={forceShowErrors}
          />
          <CheckoutFormInput
            type='text'
            name='apart'
            placeholder='Номер квартири (за наявності)'
            value={formData.apart}
            onChange={handleFieldChange('apart')}
            forceShowError={forceShowErrors}
          />
        </div>
      </section>
      <CheckoutFormDeliverySelect
        formData={formData}
        setFormData={setFormData}
        deliveryType={deliveryType}
        setDeliveryType={setDeliveryType}
        setFieldValidation={setFieldValidation}
        deliveryMethodError={deliveryMethodError}
        setDeliveryMethodError={setDeliveryMethodError}
      />
      <button
        type='submit'
        disabled={isSubmitting}
        className={`px-[10px] md:px-[20px] py-[12px] text-base text-center rounded-xl text-white w-full transition-colors ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-rose lg:hover:bg-rose-hover'
        }`}
      >
        {isSubmitting ? 'Оформлення...' : 'Оформити замовлення'}
      </button>
    </form>
  );
}

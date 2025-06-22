'use client';

import React from 'react';
import RadioButton from '../RadioButton';
import CustomSelect from './CustomSelect';
import CheckoutFormInput from './CheckoutFormInput';
import { CheckoutFormData, CheckoutFormFieldValidation } from '@/app/types';

export default function CheckoutFormDeliverySelect({
  formData,
  setFormData,
  deliveryType,
  setDeliveryType,
  setFieldValidation,
  deliveryMethodError,
  setDeliveryMethodError,
  deliveryTypeError,
  setDeliveryTypeError,
  deliveryDetailsError,
  setDeliveryDetailsError,
}: {
  formData: CheckoutFormData;
  setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
  deliveryType: string;
  setDeliveryType: React.Dispatch<React.SetStateAction<string>>;
  setFieldValidation: React.Dispatch<React.SetStateAction<CheckoutFormFieldValidation>>;
  deliveryMethodError: string;
  setDeliveryMethodError: React.Dispatch<React.SetStateAction<string>>;
  deliveryTypeError: string;
  setDeliveryTypeError: React.Dispatch<React.SetStateAction<string>>;
  deliveryDetailsError: string;
  setDeliveryDetailsError: React.Dispatch<React.SetStateAction<string>>;
}) {
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

  const handleDeliveryMethodChange = (method: string) => {
    setFormData((prev: CheckoutFormData) => ({
      ...prev,
      deliveryMethod: method,
      deliveryTypeDetails: '',
    }));

    setDeliveryMethodError('');
    setDeliveryTypeError('');
    setDeliveryDetailsError('');

    setFieldValidation((prev: CheckoutFormFieldValidation) => ({
      ...prev,
      deliveryTypeDetails: false,
    }));

    if (method !== 'novapost') {
      setDeliveryType('depart');
    } else {
      setDeliveryType('');
    }
  };

  const handleDeliveryTypeChange = (type: string) => {
    setDeliveryType(type);
    setDeliveryTypeError('');
    setDeliveryDetailsError('');

    setFormData((prev: CheckoutFormData) => ({
      ...prev,
      deliveryTypeDetails: '',
    }));

    setFieldValidation((prev: CheckoutFormFieldValidation) => ({
      ...prev,
      deliveryTypeDetails: false,
    }));
  };

  const handleFieldChange =
    (fieldName: keyof CheckoutFormData) => (value: string, isValid: boolean) => {
      setFormData((prev: CheckoutFormData) => ({
        ...prev,
        [fieldName]: value,
      }));

      setFieldValidation((prev: CheckoutFormFieldValidation) => ({
        ...prev,
        [fieldName]: isValid,
      }));

      if (fieldName === 'deliveryTypeDetails' && value.trim()) {
        setDeliveryDetailsError('');
      }
    };

  React.useEffect(() => {
    if (formData.deliveryMethod === 'novapost' && deliveryTypeError && deliveryType) {
      setDeliveryTypeError('');
    }
    if (
      formData.deliveryMethod === 'novapost' &&
      deliveryDetailsError &&
      formData.deliveryTypeDetails?.trim()
    ) {
      setDeliveryDetailsError('');
    }
  }, [
    deliveryType,
    formData.deliveryMethod,
    formData.deliveryTypeDetails,
    deliveryTypeError,
    deliveryDetailsError,
    setDeliveryTypeError,
    setDeliveryDetailsError,
  ]);

  return (
    <section className='flex flex-col gap-[20px]'>
      <h2 className='text-lg md:text-xl font-semibold'>Вид доставки</h2>

      <div className={deliveryMethodError ? 'border border-red-500 p-[10px] rounded-xl' : ''}>
        <div className='flex flex-col gap-[20px]'>
          <RadioButton
            id='novapost'
            name='deliveryMethod'
            value='novapost'
            onChange={() => handleDeliveryMethodChange('novapost')}
            checked={formData.deliveryMethod === 'novapost'}
            label='Нова пошта'
          />
          <RadioButton
            id='ukrpost'
            name='deliveryMethod'
            value='ukrpost'
            onChange={() => handleDeliveryMethodChange('ukrpost')}
            checked={formData.deliveryMethod === 'ukrpost'}
            label='Укрпошта'
          />
        </div>

        {deliveryMethodError && (
          <p className='text-red-500 text-sm mt-[10px]'>{deliveryMethodError}</p>
        )}
      </div>

      {formData.deliveryMethod === 'novapost' && (
        <>
          <div
            className={`mt-[10px] ${
              deliveryTypeError ? 'border border-red-500 p-[10px] rounded-xl' : ''
            }`}
          >
            <CustomSelect
              options={[
                { value: 'depart', label: 'Відділення' },
                { value: 'parcel', label: 'Поштомат' },
                { value: 'courier', label: "Кур'єр" },
              ]}
              value={deliveryType}
              onChange={handleDeliveryTypeChange}
              placeholder='Оберіть тип доставки'
              required={formData.deliveryMethod === 'novapost'}
            />
            {deliveryTypeError && (
              <p className='text-red-500 text-sm mt-[10px]'>{deliveryTypeError}</p>
            )}
          </div>
          {deliveryType !== 'courier' && deliveryType !== '' && (
            <div
              className={`mt-[10px] ${
                deliveryDetailsError ? 'border border-red-500 p-[10px] rounded-xl' : ''
              }`}
            >
              <CheckoutFormInput
                type='text'
                name='deliveryTypeDetails'
                placeholder={`Вкажіть ${getDeliveryPlaceholder()}`}
                value={formData.deliveryTypeDetails || ''}
                onChange={handleFieldChange('deliveryTypeDetails')}
              />
              {deliveryDetailsError && (
                <p className='text-red-500 text-sm mt-[10px]'>{deliveryDetailsError}</p>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

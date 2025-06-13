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
}: {
  formData: CheckoutFormData;
  setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
  deliveryType: string;
  setDeliveryType: React.Dispatch<React.SetStateAction<string>>;
  setFieldValidation: React.Dispatch<React.SetStateAction<CheckoutFormFieldValidation>>;
  deliveryMethodError: string;
  setDeliveryMethodError: React.Dispatch<React.SetStateAction<string>>;
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

    setFieldValidation((prev: CheckoutFormFieldValidation) => ({
      ...prev,
      deliveryTypeDetails: false,
    }));

    if (method !== 'novapost') {
      setDeliveryType('depart');
    }
  };

  const handleDeliveryTypeChange = (type: string) => {
    setDeliveryType(type);

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
    };

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
          <div className='mt-[10px]'>
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
          </div>
          {deliveryType !== 'courier' && (
            <div className='mt-[10px]'>
              <CheckoutFormInput
                type='text'
                name='deliveryTypeDetails'
                placeholder={`Вкажіть ${getDeliveryPlaceholder()}`}
                required={true}
                value={formData.deliveryTypeDetails || ''}
                onChange={handleFieldChange('deliveryTypeDetails')}
                validationRules={{
                  minLength: 3,
                  customMessage: `Вкажіть ${getDeliveryPlaceholder()}`,
                }}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}

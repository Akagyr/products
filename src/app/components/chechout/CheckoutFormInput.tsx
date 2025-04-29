import React from 'react';

type Input = {
  styles?: string;
  type: 'text' | 'email' | 'tel';
  name: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  error?: string;
};

export default function CheckoutFormInput({
  styles,
  type,
  name,
  placeholder,
  required = false,
  pattern,
  error
}: Input) {
  return (
    <div className='w-full'>
      {type === 'tel' ? (
        <input
          className={
            styles
              ? styles
              : 'py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full lg:focus:border-rose'
          }
          type={type}
          name={name}
          pattern={pattern}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          className={
            styles
              ? styles
              : 'py-[12px] px-[15px] text-sm border-2 border-gray-300 rounded-xl w-full lg:focus:border-rose'
          }
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      )}
      {error && <span className='text-red-600 text-sm mt-[10px] mx-[10px]'>{error}</span>}
    </div>
  );
}

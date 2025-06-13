import React, { useState, useCallback, useEffect } from 'react';

type Input = {
  stylesClass?: string;
  type: 'text' | 'email' | 'tel';
  name: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  error?: string;
  onChange?: (value: string, isValid: boolean) => void;
  onBlur?: (value: string, isValid: boolean) => void;
  value?: string;
  validationRules?: {
    minLength?: number;
    maxLength?: number;
    customMessage?: string;
    requiredMessage?: string;
  };
  forceShowError?: boolean;
};

export default function CheckoutFormInput({
  stylesClass,
  type,
  name,
  placeholder,
  required = false,
  pattern,
  error,
  onChange,
  onBlur,
  value,
  validationRules,
  forceShowError = false,
}: Input) {
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState<string>('');

  const defaultStylesClass = `py-[12px] px-[15px] text-sm border-2 rounded-xl w-full transition-colors ${
    error || localError ? 'border-red-500' : 'border-gray-300 lg:focus:border-rose'
  }`;

  const getRequiredMessage = (): string => {
    if (validationRules?.customMessage) {
      return validationRules.customMessage;
    } else {
      return validationRules?.requiredMessage ? validationRules?.requiredMessage : 'Це поле обовʼязкове';
    }
  };

  const validateField = useCallback(
    (inputValue: string): string => {
      if (required && !inputValue.trim()) {
        return getRequiredMessage();
      }

      if (!inputValue.trim() && !required) {
        return '';
      }

      if (validationRules?.minLength && inputValue.length < validationRules.minLength) {
        return `Мінімум ${validationRules.minLength} символів`;
      }

      if (validationRules?.maxLength && inputValue.length > validationRules.maxLength) {
        return `Максимум ${validationRules.maxLength} символів`;
      }

      if (type === 'email' && inputValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
          return 'Невірний формат електронної пошти';
        }
      }

      if (type === 'tel' && inputValue) {
        const phoneRegex = /^\+380\d{9}$/;
        if (!phoneRegex.test(inputValue)) {
          return 'Невірний формат телефону (+380XXXXXXXXX)';
        }
      }

      if (name === 'postal' && inputValue) {
        const postalRegex = /^\d{5}$/;
        if (!postalRegex.test(inputValue)) {
          return 'Поштовий індекс повинен містити 5 цифр';
        }
      }

      if (pattern && inputValue) {
        const regex = new RegExp(pattern);
        if (!regex.test(inputValue)) {
          return 'Невірний формат';
        }
      }

      return '';
    },
    [required, type, pattern, name, validationRules]
  );

  useEffect(() => {
    if (forceShowError && !touched) {
      const fieldError = validateField(value || '');
      setLocalError(fieldError);
      setTouched(true);
    }
  }, [forceShowError, touched, value, validateField]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    let formattedValue = inputValue;
    if (type === 'tel') {
      formattedValue = inputValue.replace(/[^\d+]/g, '');

      if (formattedValue.startsWith('0')) {
        formattedValue = '+38' + formattedValue;
      }

      if (formattedValue.startsWith('+380')) {
        formattedValue = formattedValue.substring(0, 13);
      }
    }

    const fieldError = touched || forceShowError ? validateField(formattedValue) : '';
    setLocalError(fieldError);

    const isValid = !fieldError;
    onChange?.(formattedValue, isValid);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const inputValue = e.target.value;
    const fieldError = validateField(inputValue);
    setLocalError(fieldError);

    const isValid = !fieldError;
    onBlur?.(inputValue, isValid);
  };

  const displayError = error || localError;

  return (
    <div className='w-full'>
      <input
        className={stylesClass || defaultStylesClass}
        type={type}
        name={name}
        pattern={pattern}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={!!displayError}
        aria-describedby={displayError ? `${name}-error` : undefined}
      />
      {displayError && (
        <span
          id={`${name}-error`}
          className='block text-red-600 text-sm mt-[5px] mx-[10px]'
          role='alert'
        >
          {displayError}
        </span>
      )}
    </div>
  );
}

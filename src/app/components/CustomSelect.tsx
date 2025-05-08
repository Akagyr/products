import React, { useState, useRef, useEffect } from 'react';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Виберіть опцію',
  className = '',
  required = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <div
        className={`flex items-center justify-between py-[12px] px-[15px] text-sm border-2 rounded-xl w-full cursor-pointer transition-all duration-300 ${
          isOpen ? 'border-rose shadow-md' : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={toggleDropdown}
      >
        <div className='truncate'>{selectedOption ? selectedOption.label : placeholder}</div>
        <svg
          className={`w-[20px] h-[20px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </div>

      {isOpen && (
        <div className='absolute z-10 w-full mt-[5px] bg-white border border-gray-300 rounded-lg shadow-lg'>
          {options.length > 5 && (
            <div className='p-[10px] border-b border-gray-200'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Пошук...'
                className='w-full px-[15px] py-[10px] text-sm border border-gray-300 rounded-md focus:outline-none focus:border-rose'
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className='max-h-[240px] overflow-y-auto'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-[20px] py-[10px] text-sm cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${
                    option.value === value ? 'bg-rose/10 text-rose font-medium' : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className='px-[20px] py-[10px] text-sm text-gray-500'>Немає результатів</div>
            )}
          </div>
        </div>
      )}

      {required && (
        <input
          type='text'
          required
          value={value}
          onChange={() => {}}
          style={{ opacity: 0, height: 0, position: 'absolute' }}
        />
      )}
    </div>
  );
}

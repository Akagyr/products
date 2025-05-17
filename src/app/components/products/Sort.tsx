'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function Sort({
  currentSort,
  setCurrentSort,
}: {
  currentSort: string;
  setCurrentSort: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const sortOptions = [
    { value: 'default', label: 'по замовченню' },
    { value: 'nameBottom', label: 'по назві (А - Я)' },
    { value: 'nameTop', label: 'по назві (Я - А)' },
    { value: 'priceTop', label: 'по ціні (низька > висока)' },
    { value: 'priceBottom', label: 'по ціні (висока > низька)' },
  ];

  const getCurrentLabel = () => {
    const option = sortOptions.find((opt) => opt.value === currentSort);
    return option ? option.label : 'по замовченню';
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    setCurrentSort(value);
    setIsOpen(false);
  };

  return (
    <div className='flex items-center gap-[20px] my-[20px] lg:my-0' ref={dropdownRef}>
      <label className='hidden md:block font-medium'>Сортування:</label>
      <div className='relative'>
        <div
          className='flex items-center justify-between min-w-[200px] px-[15px] py-[10px] border border-rose rounded-xl cursor-pointer bg-white'
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          role='combobox'
        >
          <span>{getCurrentLabel()}</span>
          <svg
            className={`w-[15px] h-[15px] transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </div>

        {isOpen && (
          <div
            className='absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 z-20'
            role='listbox'
          >
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className={`px-[15px] py-[10px] cursor-pointer lg:hover:bg-rose first:rounded-t-xl last:rounded-b-xl lg:hover:text-white transition-colors ${
                  currentSort === option.value ? 'bg-rose text-white' : ''
                }`}
                onClick={() => handleOptionClick(option.value)}
                role='option'
                aria-selected={currentSort === option.value}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <select
        name='sort'
        value={currentSort}
        onChange={(e) => setCurrentSort(e.target.value)}
        className='sr-only'
        aria-hidden='true'
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

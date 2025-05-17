'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SearchIcon from '../icons/SearchIcon';
import { ProductSearchResult } from '@/app/types';
import HeaderSearchListItems from './HeaderSearchListItems';

export default function HeaderSearch() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<ProductSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const searchProducts = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestions(data.products);
    } catch (error) {
      console.error('Error searching products:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(value);
    }, 300);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      setIsMobileSearchOpen(false);
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleProductClick = () => {
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsMobileSearchOpen(false);
    } else if (e.key === 'Enter' && searchTerm.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
      setIsMobileSearchOpen(false);
    }
  };

  const toggleMobileSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileSearchOpen((prev) => !prev);

    if (isMobileSearchOpen) {
      setSearchTerm('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className='relative' ref={searchContainerRef} onClick={handleSearchContainerClick}>
      <button
        className='lg:hidden flex items-center justify-center'
        onClick={toggleMobileSearch}
        aria-label={isMobileSearchOpen ? 'Закрити пошук' : 'Відкрити пошук'}
      >
        <SearchIcon styleClass='w-[22px] h-[22px] text-black' />
      </button>

      {isMobileSearchOpen && (
        <>
          <div
            className='lg:hidden fixed inset-0 bg-black bg-opacity-30 z-40'
            onClick={() => {
              setIsMobileSearchOpen(false);
              setSearchTerm('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            aria-hidden='true'
          />

          <div
            className='lg:hidden fixed top-0 left-0 right-0 bg-white z-50 pt-4 shadow-lg h-fit'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='container mx-auto px-4'>
              <div className='mb-4'>
                <div className='relative'>
                  <input
                    type='text'
                    className='w-full px-[15px] py-[10px] border border-rose rounded-xl'
                    placeholder='Пошук...'
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    aria-label='Пошук товарів'
                    aria-expanded={showSuggestions}
                    role='combobox'
                    aria-autocomplete='list'
                    aria-controls='mobile-search-suggestions'
                  />
                  <button
                    onClick={handleSubmit}
                    className='absolute right-0 top-0 h-full bg-rose lg:hover:bg-rose-hover text-white font-medium px-[15px] transition-colors rounded-e-xl'
                    aria-label='Шукати'
                  >
                    <SearchIcon styleClass='w-[22px] h-[22px]' />
                  </button>
                </div>
              </div>

              {showSuggestions && searchTerm.length >= 2 && (
                <div
                  id='mobile-search-suggestions'
                  className='w-full bg-white z-20 max-h-[300px] overflow-y-auto'
                  role='listbox'
                >
                  {isLoading ? (
                    <div className='p-[15px] text-center text-rose'>Завантаження...</div>
                  ) : suggestions.length > 0 ? (
                    <HeaderSearchListItems
                      suggestions={suggestions}
                      handleProductClick={handleProductClick}
                      setShowSuggestions={setShowSuggestions}
                      searchTerm={searchTerm}
                    />
                  ) : (
                    <div className='p-[15px] text-center text-rose'>Товарів не знайдено</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className='hidden lg:flex w-full relative'>
        <input
          type='text'
          className='w-full px-[15px] py-[10px] border border-rose rounded-s-xl'
          placeholder='Пошук...'
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          aria-label='Пошук товарів'
          aria-expanded={showSuggestions}
          role='combobox'
          aria-autocomplete='list'
          aria-controls='search-suggestions'
        />
        <button
          onClick={handleSubmit}
          className='bg-rose lg:hover:bg-rose-hover text-white font-medium px-[15px] transition-colors rounded-e-xl'
          aria-label='Шукати'
        >
          <SearchIcon styleClass='w-[22px] h-[22px]' />
        </button>

        {showSuggestions && searchTerm.length >= 2 && (
          <div
            id='search-suggestions'
            className='absolute top-full left-0 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 z-20'
            role='listbox'
          >
            {isLoading ? (
              <div className='p-[15px] text-center text-rose'>Завантаження...</div>
            ) : suggestions.length > 0 ? (
              <HeaderSearchListItems
                suggestions={suggestions}
                handleProductClick={handleProductClick}
                setShowSuggestions={setShowSuggestions}
                searchTerm={searchTerm}
              />
            ) : (
              <div className='p-[15px] text-center text-rose'>Товарів не знайдено</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

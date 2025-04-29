'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Product } from '@/app/types';
import Checkbox from './Checkbox';
import PriceRangeSlider from './PriceRangeSlider';

interface SidebarFiltersListProps {
  products: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function SidebarFilters({ products, setFilteredProducts }: SidebarFiltersListProps) {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>(() => ({
    min: Math.min(...products.map((p) => p.price)),
    max: Math.max(...products.map((p) => p.price)),
  }));
  const [descriptionFilters, setDescriptionFilters] = useState<Record<string, string[]>>({});

  const uniqueModels = useMemo(
    () => Array.from(new Set(products.map((product) => product.name))),
    [products]
  );

  const uniqueDescriptionTypes = useMemo(
    () =>
      Array.from(
        new Set(products.flatMap((product) => product.description.map((desc) => desc.name)))
      ),
    [products]
  );

  const minPrice = useMemo(() => Math.min(...products.map((p) => p.price)), [products]);
  const maxPrice = useMemo(() => Math.max(...products.map((p) => p.price)), [products]);

  const getUniqueValuesForDescription = useCallback(
    (descriptionName: string) =>
      Array.from(
        new Set(
          products.flatMap((product) =>
            product.description
              .filter((desc) => desc.name === descriptionName)
              .map((desc) => desc.value)
          )
        )
      ),
    [products]
  );

  useEffect(() => {
    const applyFilters = () => {
      const filtered = products.filter((product) => {
        if (selectedModels.length > 0 && !selectedModels.includes(product.name)) {
          return false;
        }

        if (product.price < priceRange.min || product.price > priceRange.max) {
          return false;
        }

        for (const [descName, selectedValues] of Object.entries(descriptionFilters)) {
          if (selectedValues.length > 0) {
            const hasMatchingDesc = product.description.some(
              (desc) => desc.name === descName && selectedValues.includes(desc.value)
            );
            if (!hasMatchingDesc) return false;
          }
        }

        return true;
      });

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [selectedModels, priceRange, descriptionFilters, products, setFilteredProducts]);

  const handleModelFilter = useCallback((model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  }, []);

  const handlePriceChange = useCallback((min: number, max: number) => {
    setPriceRange({ min, max });
  }, []);

  const handleDescriptionFilter = useCallback((descName: string, value: string) => {
    setDescriptionFilters((prev) => {
      const currentValues = prev[descName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [descName]: newValues,
      };
    });
  }, []);

  const renderDescriptionFilter = useCallback(
    (descriptionName: string) => {
      const uniqueValues = getUniqueValuesForDescription(descriptionName);
      const selectedValues = descriptionFilters[descriptionName] || [];

      return (
        <div key={descriptionName} className='border-b pb-[20px]'>
          <h2 className='font-medium mb-2'>{descriptionName}</h2>
          <div className='flex flex-col gap-[10px]'>
            {uniqueValues.map((value) => (
              <Checkbox
                key={`${descriptionName}-${value}`}
                checked={selectedValues.includes(value)}
                onChange={() => handleDescriptionFilter(descriptionName, value)}
                label={value}
              />
            ))}
          </div>
        </div>
      );
    },
    [descriptionFilters, getUniqueValuesForDescription, handleDescriptionFilter, Checkbox]
  );

  return (
    <div className='flex flex-col gap-[10px]'>
      <div className='border-b pb-[20px]'>
        <h2 className='font-medium mb-2'>Модель</h2>
        <div className='flex flex-col gap-[10px]'>
          {uniqueModels.map((model) => (
            <Checkbox
              key={model}
              checked={selectedModels.includes(model)}
              onChange={() => handleModelFilter(model)}
              label={model}
            />
          ))}
        </div>
      </div>
      <div className='border-b pb-[20px]'>
        <h2 className='font-medium mb-2'>Ціна</h2>
        <PriceRangeSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
      </div>
      {uniqueDescriptionTypes.map(renderDescriptionFilter)}
    </div>
  );
}

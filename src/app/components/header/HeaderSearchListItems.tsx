import { ProductSearchResult } from '@/app/types';
import Link from 'next/link';
import React from 'react';
import HeaderSearchListItem from './HeaderSearchListItem';

export default function HeaderSearchListItems({
  suggestions,
  handleProductClick,
  setShowSuggestions,
  searchTerm,
}: {
  suggestions: ProductSearchResult[];
  handleProductClick: () => void;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
}) {
  return (
    <div>
      <ul>
        {suggestions.map((product) => (
          <HeaderSearchListItem
            key={product.id}
            product={product}
            handleProductClick={handleProductClick}
          />
        ))}
      </ul>
      {suggestions.length > 3 && (
        <Link
          href={`/products?query=${encodeURIComponent(searchTerm)}`}
          className='block p-[10px] text-center text-rose lg:hover:bg-gray-50 transition-colors font-medium'
          onClick={() => setShowSuggestions(false)}
        >
          Показати всі результати ({suggestions.length}+)
        </Link>
      )}
    </div>
  );
}

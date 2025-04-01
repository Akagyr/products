'use client';

import { useState, useRef } from 'react';

export default function ProductImageGallery({
  productImages,
  categoryName,
  speciesName,
  productName,
}: {
  productImages: string[];
  categoryName: string;
  speciesName: string;
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDelta = touchStartX.current - touchEndX.current;
    if (touchDelta > 50) {
      handleNext();
    } else if (touchDelta < -50) {
      handlePrevious();
    }
  };

  return (
    <div
      className='touch-pan-y flex gap-[50px]'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className='flex flex-col gap-[20px] w-[100px]'>
        {productImages.map((image, index) => (
          <div
            key={index}
            className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-opacity lg:hover:opacity-80 duration-300 ${
              activeIndex === index ? 'ring-2 ring-rose' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img
              className='size-full object-cover'
              src={image}
              alt={`Product thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className='relative w-full'>
        <img
          className='size-full object-cover aspect-square rounded-2xl'
          src={productImages[activeIndex]}
          alt={`${categoryName} ${speciesName} ${productName}`}
        />
        <button
          onClick={handlePrevious}
          className='absolute left-[15px] top-1/2 -translate-y-1/2 bg-white/60 lg:hover:bg-white px-[10px] py-[5px] rounded-full shadow-lg rotate-180'
          aria-label='Previous image'
        >
          ➜
        </button>
        <button
          onClick={handleNext}
          className='absolute right-[15px] top-1/2 -translate-y-1/2 bg-white/60 lg:hover:bg-white px-[10px] py-[5px] rounded-full shadow-lg transition-colors'
          aria-label='Next image'
        >
          ➜
        </button>
      </div>
    </div>
  );
}

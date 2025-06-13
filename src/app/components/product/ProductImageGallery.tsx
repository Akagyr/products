'use client';

import { useState, useRef } from 'react';
import ArrowRightIcon from '../icons/ArrowRightIcon';

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
      className='touch-pan-y flex flex-col-reverse md:flex-row gap-[30px] md:gap-[50px]'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className='flex flex-row md:flex-col gap-[20px] h-[90px] md:h-full md:w-[100px]'>
        {productImages.map((image, index) => (
          <div
            key={index}
            className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-opacity lg:hover:opacity-80 duration-300 ${
              activeIndex === index ? 'ring-2 ring-rose' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img
              className='w-full h-full object-cover'
              src={image}
              alt={`Product thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className='relative w-full'>
        <img
          className='w-full h-full md:max-w-[80%] lg:max-w-full object-cover aspect-square rounded-2xl'
          src={productImages[activeIndex]}
          alt={`${categoryName} ${speciesName} ${productName}`}
        />
        <button
          onClick={handlePrevious}
          className='hidden lg:flex absolute left-[15px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] justify-center items-center rounded-full bg-rose/80 lg:hover:bg-rose transition-colors rotate-180'
          aria-label='Previous image'
        >
          <ArrowRightIcon stylesClass='w-[20px] h-[20px] text-white' />
        </button>
        <button
          onClick={handleNext}
          className='hidden lg:flex absolute right-[15px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] justify-center items-center rounded-full bg-rose/80 lg:hover:bg-rose transition-colors'
          aria-label='Next image'
        >
          <ArrowRightIcon stylesClass='w-[20px] h-[20px] text-white' />
        </button>
      </div>
    </div>
  );
}

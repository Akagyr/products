'use client';

import { useState, useRef } from 'react';

export default function ProductImageGallery({ productImage }: { productImage: string }) {
  const images = [
    'https://upload.wikimedia.org/wikipedia/commons/1/1e/Phalaenopsis_philippinensis_NationalOrchidGarden-Singapore.jpg',
    'https://flowers.ua/images/Flowers/articles/318-img-5.jpg',
    'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/p/a/pafiopedilum.jpg',
    'https://i.ytimg.com/vi/-6MuMZUqXO4/sddefault.jpg',
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
      className='touch-pan-y'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className='relative'>
        <img
          className='size-full object-cover aspect-square rounded-3xl'
          src={images[activeIndex]}
          alt='Main product image'
        />
        <button
          onClick={handlePrevious}
          className='absolute left-[15px] top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white px-[10px] py-[5px] rounded-full shadow-lg rotate-180'
          aria-label='Previous image'
        >
          ➜
        </button>
        <button
          onClick={handleNext}
          className='absolute right-[15px] top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white px-[10px] py-[5px] rounded-full shadow-lg transition-colors'
          aria-label='Next image'
        >
          ➜
        </button>
      </div>
      <div className='flex gap-[10px] mt-[10px] justify-center'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-1 max-w-[80px] aspect-square rounded-xl overflow-hidden cursor-pointer transition-opacity hover:opacity-80 duration-300 ${
              activeIndex === index ? 'ring-2 ring-[#b85aff]' : ''
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
    </div>
  );
}

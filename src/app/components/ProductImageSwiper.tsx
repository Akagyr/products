'use client';

import { useState } from 'react';

export default function ProductImageGallery({ productImage }: { productImage: string }) {
  const images = [
    'https://upload.wikimedia.org/wikipedia/commons/1/1e/Phalaenopsis_philippinensis_NationalOrchidGarden-Singapore.jpg',
    'https://flowers.ua/images/Flowers/articles/318-img-5.jpg',
    'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/p/a/pafiopedilum.jpg',
    'https://i.ytimg.com/vi/-6MuMZUqXO4/sddefault.jpg',
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='grid grid-cols-[50px_1fr] gap-[30px]'>
      <div className='flex flex-col gap-[10px]'>
        {images.map((image, index) => (
          <img
            key={index}
            className={`w-full object-cover aspect-square rounded-xl cursor-pointer transition-opacity hover:opacity-80 duration-300 ${
              activeIndex === index ? 'ring-2 ring-[#b85aff]' : ''
            }`}
            src={image}
            onClick={() => setActiveIndex(index)}
            alt={`Product thumbnail ${index + 1}`}
          />
        ))}
      </div>

      <div className='relative group'>
        <img
          className='w-full h-full object-cover aspect-square rounded-3xl'
          src={images[activeIndex]}
          alt='Main product image'
        />
        <button
          onClick={handlePrevious}
          className='absolute left-[15px] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-[10px] py-[5px] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity rotate-180'
          aria-label='Previous image'
        >
          ➜
        </button>
        <button
          onClick={handleNext}
          className='absolute right-[15px] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-[10px] py-[5px] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'
          aria-label='Next image'
        >
          ➜
        </button>
      </div>
    </div>
  );
}

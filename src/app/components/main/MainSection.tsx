'use client';

import React from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import ArrowRightIcon from '../icons/ArrowRightIcon';

export default function MainSection({
  children,
  titleText,
  seeMoreText,
  seeMoreLink,
}: {
  children: React.ReactNode;
  titleText: string;
  seeMoreText: string;
  seeMoreLink: string;
}) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 3, spacing: 30 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 4, spacing: 30 },
      },
      '(min-width: 1280px)': {
        slides: { perView: 5, spacing: 30 },
      },
      '(min-width: 1536px)': {
        slides: { perView: 5, spacing: 30 },
      },
    },
    slides: { perView: 2, spacing: 30 },
  });

  return (
    <section>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>{titleText}</h2>
        <Link
          href={seeMoreLink}
          className='text-rose lg:hover:text-rose-hover font-semibold flex items-center group transition-colors duration-300'
        >
          <span>{seeMoreText}</span>
          <ArrowRightIcon styleClass='w-0 h-[16px] overflow-hidden transition-all duration-300 lg:group-hover:w-[16px] lg:group-hover:ml-[10px]' />
        </Link>
      </div>
      <div className='relative mt-[30px]'>
        <div ref={sliderRef} className='keen-slider'>
          {React.Children.map(children, (child) => (
            <div className='keen-slider__slide'>{child}</div>
          ))}
        </div>
        <button
          onClick={() => instanceRef.current?.prev()}
          className='hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] justify-center items-center rounded-full bg-rose/80 hover:bg-rose rotate-180 transition-colors'
        >
          <ArrowRightIcon styleClass='w-[20px] h-[20px] text-white' />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className='hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-[40px] h-[40px] justify-center items-center rounded-full bg-rose/80 hover:bg-rose transition-colors'
        >
          <ArrowRightIcon styleClass='w-[20px] h-[20px] text-white' />
        </button>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation } from 'swiper/modules';

export default function ({ productImage }: { productImage: string }) {
  return (
    <Swiper
      className='w-full rounded-t-lg'
      loop={true}
      navigation={true}
      modules={[FreeMode, Navigation]}
    >
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index}>
            <img src={productImage} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

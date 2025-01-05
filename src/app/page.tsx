import Link from 'next/link';
import React from 'react';

type CategoriesArr = {
  name: string;
  photoUrl: string;
};

export default function Mainpage() {
  const categoriesArr: CategoriesArr[] = [
    {
      name: 'Фаленопсис',
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/commons/1/1e/Phalaenopsis_philippinensis_NationalOrchidGarden-Singapore.jpg',
    },
    {
      name: 'Цимбідіум',
      photoUrl:
        'https://flowers.ua/images/Flowers/articles/318-img-5.jpg',
    },
    {
      name: 'Пафіопедилум',
      photoUrl:
        'https://florium.ua/media/catalog/product/cache/2/file/9df78eab33525d08d6e5fb8d27136e95/p/a/pafiopedilum.jpg',
    },
    {
      name: 'Ванда',
      photoUrl: 'https://i.ytimg.com/vi/-6MuMZUqXO4/sddefault.jpg',
    },
  ];

  return (
    <div className='lg:flex-1 lg:flex lg:items-center lg:justify-center py-[30px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-[10px] w-full xl:max-w-[800px] 3xl:max-w-[1100px] mx-auto'>
        {categoriesArr.map((el, idx) => (
          <Link key={idx} href={`/products?category=${el.name}`} className='relative cursor-pointer'>
            <img
              src={el.photoUrl}
              className='w-full aspect-[3/1] md:aspect-[5/3] rounded-3xl object-cover'
              alt={el.name}
            />
            <div className='absolute inset-0 bg-black/40 rounded-3xl' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-2xl md:text-3xl 3xl:text-4xl text-white font-bold'>{el.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { getCategories } from './database/prismaQuries';
import { Category } from './types';
import Card from './components/Card';
import NavigationLink from './components/NavigationLink';

export default async function Homepage() {
  const categories = (await getCategories()) as Category[];

  return (
    <div className='lg:flex-1 lg:flex lg:items-center lg:justify-center py-[30px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-[10px] w-full xl:max-w-[900px] 3xl:max-w-[1100px] mx-auto'>
        {categories.map((el) => (
          <NavigationLink
            key={el.id}
            href={`/species?category=${el.id}`}
            name={el.name}
            type={'category'}
            className='relative cursor-pointer'
          >
            <Card item={el} />
          </NavigationLink>
        ))}
      </div>
    </div>
  );
}

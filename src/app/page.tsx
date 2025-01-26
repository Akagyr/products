import React from 'react';
import { getCategories } from './database/prismaQuries';
import { Category } from './types';
import Card from './components/Card';

export default async function Homepage() {
  const species = (await getCategories()) as Category[];

  return (
    <div className='lg:flex-1 lg:flex lg:items-center lg:justify-center py-[30px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-[10px] w-full xl:max-w-[900px] 3xl:max-w-[1100px] mx-auto'>
        {species.map((el) => (
          <Card key={el.id} item={el} href={`/species?category=${el.name}`} />
        ))}
      </div>
    </div>
  );
}

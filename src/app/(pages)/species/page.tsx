import { getSpecies } from '@/app/database/prismaQuries';
import { Species } from '@/app/types';
import React from 'react';
import Card from '@/app/components/Card';
import Link from 'next/link';
import NavigationLink from '@/app/components/NavigationLink';

export default async function SpeciesPage({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const species = (await getSpecies(searchParams.category)) as Species[];

  return (
    <div className='h-full lg:grid lg:grid-cols-[17%_1fr_1fr_17%] lg:gap-[20px] lg:items-center lg:justify-center lg:place-items-center lg:place-content-center py-[30px] lg:py-0'>
      <Link
        href='/'
        className='lg:relative w-fit lg:w-[80%] xl:w-[70%] 2xl:w-[60%] lg:aspect-[4/3] rounded-full lg:rounded-[100%_10%_10%_100%] px-[20px] py-[8px] lg:p-0 border-2 border-violet lg:hover:border-violet-hover lg:hover:bg-violet-hover transition-colors group'
      >
        <span className='lg:absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold lg:text-lg xl:text-2xl text-violet lg:group-hover:text-white w-full text-center'>
          ❮ Категорії
        </span>
      </Link>
      <div className='col-span-2 col-start-2 grid grid-cols-1 md:grid-cols-2 gap-[10px] mt-[20px] lg:mt-0'>
        {species.map((el) => (
          <NavigationLink
            key={el.id}
            href={`/species/products?species=${el.id}`}
            name={el.name}
            type={'species'}
            className='relative cursor-pointer'
          >
            <Card item={el} />
          </NavigationLink>
        ))}
      </div>
    </div>
  );
}

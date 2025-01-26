import { getSpecies } from '@/app/database/prismaQuries';
import { Species } from '@/app/types';
import React from 'react';
import Card from '@/app/components/Card';

export default async function SpeciesPage({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const species = (await getSpecies(searchParams.category)) as Species[];

  return (
    <div className='lg:flex-1 lg:flex lg:items-center lg:justify-center py-[30px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-[10px] w-full xl:max-w-[900px] 3xl:max-w-[1100px] mx-auto'>
        {species.map((el) => (
          <Card key={el.id} item={el} href={`/products?species=${el.name}`} />
        ))}
      </div>
    </div>
  );
}

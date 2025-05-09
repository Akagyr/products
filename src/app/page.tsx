import React from 'react';
import ProductCard from './components/products/ProductCard';
import { getAllSpecies, getNewProducts } from './database/prismaQuries';
import MainCardRounded from './components/main/MainCardRounded';
import { Product } from './types';
import MainSection from './components/main/MainSection';
import Image from 'next/image';

export default async function Homepage() {
  const species = await getAllSpecies();
  const slicedSpecies = species!.slice(0, 12);
  const newProducts = (await getNewProducts()) as Product[];
  const slicedNewProducrs = newProducts.slice(0, 12);

  return (
    <>
      <section className='mb-[50px]'>
        <Image
          src='/orchid_banner.jpg'
          width={2070}
          height={400}
          quality={100}
          priority
          className='w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover'
          alt='Orchid banner'
        />
      </section>
      <div className='flex flex-col gap-[50px] px-[20px] 2xl:px-0 2xl:max-w-container 2xl:mx-auto'>
        <MainSection titleText='Види рослин' seeMoreText='Переглянути всі' seeMoreLink='/products'>
          {slicedSpecies.map((spec) => (
            <MainCardRounded
              key={spec.id}
              href={`products?species=${spec.id}`}
              src={spec.image}
              name={spec.name}
            />
          ))}
        </MainSection>
        <MainSection titleText='Новинки' seeMoreText='Переглянути всі' seeMoreLink='/products?new=true'>
          {slicedNewProducrs.map((newProd) => (
            <ProductCard key={newProd.id} product={newProd} />
          ))}
        </MainSection>
      </div>
    </>
  );
}

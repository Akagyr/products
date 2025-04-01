import React from 'react';
import ProductCard from './components/products/ProductCard';
import { getAllSpecies, getNewProducts } from './database/prismaQuries';
import MainCardRounded from './components/main/MainCardRounded';
import { Product } from './types';
import MainSection from './components/main/MainSection';

export default async function Homepage() {
  const species = await getAllSpecies();
  const slicedSpecies = species!.slice(0, 12);
  const newProducts = (await getNewProducts()) as Product[];
  const slicedNewProducrs = newProducts.slice(0, 6);

  return (
    <>
      <section className='mb-[50px]'>
        <img
          src='https://images.unsplash.com/photo-1680762424301-604a1697f698?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          className='w-full h-[400px] object-cover'
        />
      </section>
      <div className='flex flex-col gap-[50px] max-w-container mx-auto'>
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

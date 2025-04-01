import React from 'react';
import Link from 'next/link';
import ArrowRigthIcon from '../icons/ArrowRigthIcon';

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
  return (
    <section>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-xl'>{titleText}</h2>
        <Link
          href={seeMoreLink}
          className='text-rose lg:hover:text-rose-hover font-semibold flex items-center group transition-colors duration-300'
        >
          <span>{seeMoreText}</span>
          <ArrowRigthIcon styleClass='w-0 h-[16px] overflow-hidden transition-all duration-300 lg:group-hover:w-[16px] lg:group-hover:ml-[10px]' />
        </Link>
      </div>
      <div className='grid grid-cols-6 gap-[30px] text-center mt-[30px]'>{children}</div>
    </section>
  );
}

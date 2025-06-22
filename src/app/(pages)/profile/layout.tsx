import ProfileLayoutWrapper from '@/app/components/profile/ProfileLayotWrapper';
import ProfileSidebar from '@/app/components/profile/sidebar/ProfileSidebar';
import Loading from '@/app/loading';
import React from 'react';

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProfileLayoutWrapper fallback={<Loading />}>
      <div className='py-[40px] px-[20px] 2xl:px-0 max-w-[450px] md:max-w-[700px] lg:max-w-[750px] xl:max-w-[1200px] 2xl:max-w-container mx-auto'>
        <div className='flex flex-col lg:flex-row gap-[30px]'>
          <ProfileSidebar />
          <main className='lg:w-3/4 rounded-2xl shadow border p-[20px] sm:p-[25px] lg:p-[30px]'>
            {children}
          </main>
        </div>
      </div>
    </ProfileLayoutWrapper>
  );
}

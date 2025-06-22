import ProfileUserInfo from '@/app/components/profile/ProfileUserInfo';
import { Suspense } from 'react';
import ProfileUserStatisic from '@/app/components/profile/ProfileUserStatisics';
import ProfileUserStatisticsSuspense from '@/app/components/profile/sidebar/ProfileUserStatisticsSuspense';

export default function ProfilePage() {
  return (
    <div className='flex flex-col gap-[25px] sm:gap-[30px]'>
      <h1 className='text-xl sm:text-2xl font-bold'>Мій профіль</h1>
      <ProfileUserInfo />
      <Suspense fallback={<ProfileUserStatisticsSuspense />}>
        <ProfileUserStatisic />
      </Suspense>
    </div>
  );
}

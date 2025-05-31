import { updateProfile } from '@/actions/update-profile';
import ProfileCard from '@/components/dashboard/account/profile-card';
import authOptions from '@/lib/auth/auth-options';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import { getServerSession } from 'next-auth';
import React from 'react';

export const metadata = getPageMetadata({
  title: 'Account settings',
});

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div
      className='flex flex-col gap-4'
      style={{
        scrollbarWidth: 'none',
      }}
    >
      <ProfileCard
        name={session?.user?.name ?? ''}
        email={session?.user?.email ?? ''}
        onNameChange={async name => {
          'use server';
          return await updateProfile({ name });
        }}
      />
    </div>
  );
};

export default SettingsPage;

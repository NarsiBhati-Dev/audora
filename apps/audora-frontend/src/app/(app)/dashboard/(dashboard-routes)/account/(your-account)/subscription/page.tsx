import DeleteAccountCard from '@/components/dashboard/account/subscription/delete-account-card';
import PlanCard from '@/components/dashboard/account/subscription/plan-card';
import SupportTeamCard from '@/components/dashboard/account/subscription/support-team-card';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import React from 'react';

export const metadata = getPageMetadata({
  title: 'Subscription',
});

const SubscriptionPage = () => {
  return (
    <div className='flex flex-col gap-3'>
      <SupportTeamCard />
      <PlanCard />
      <DeleteAccountCard />
    </div>
  );
};

export default SubscriptionPage;

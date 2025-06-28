import { getStudio } from '@/actions/studio';
import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import DashboardLayout from '@/components/dashboard/dashboard-layout';
import AuthLoader from '@/components/loaders/auth-loader';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const studio = await getStudio(session?.user?.accessToken as string);

  if (!studio) {
    console.log('No studio found, redirecting to create studio');
    redirect('/dashboard/studios/create');
  }

  return (
    <Suspense fallback={<AuthLoader />}>
      <DashboardLayout studio={studio}>{children}</DashboardLayout>
    </Suspense>
  );
}

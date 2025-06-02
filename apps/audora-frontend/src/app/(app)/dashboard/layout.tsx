import { getStudioById } from '@/actions/studio';
import StudioProvider from '@/components/studio-provider';
import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/register');
  }

  const studio = await getStudioById(
    session?.user?.studioId as string,
    session?.user?.accessToken as string,
  );

  return <StudioProvider studio={studio}>{children}</StudioProvider>;
}

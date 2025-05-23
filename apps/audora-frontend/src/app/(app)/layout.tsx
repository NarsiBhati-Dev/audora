import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth/auth-options';
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}

import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard/home');
  }
};

export default DashboardPage;

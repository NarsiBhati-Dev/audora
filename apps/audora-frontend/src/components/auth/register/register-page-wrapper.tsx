import GridBackground from '@/components/ui/GridBackground';
import AuthCard from '@/components/auth/auth-card';
import AuthSwitcher from '@/components/auth/register/auth-switcher';
import Image from 'next/image';

export default function RegisterPageWrapper() {
  return (
    <main className='flex w-screen items-center justify-center md:h-screen'>
      <GridBackground />
      <AuthCard>
        <AuthSwitcher />
        <div className='hidden h-full w-[60vh] items-center justify-center rounded-r-2xl bg-[#0d0d0d] py-10 pl-10 md:flex'>
          <Image
            src='/images/editor-mockup.png'
            alt='Register Image'
            priority
            width={350}
            height={500}
            className='h-full w-full rounded-l-2xl object-cover'
          />
        </div>
      </AuthCard>
    </main>
  );
}

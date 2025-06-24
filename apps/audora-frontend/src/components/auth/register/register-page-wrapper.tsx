import GridBackground from '@/components/shared/ui/grid-background';
import AuthCard from '@/components/auth/auth-card';
import AuthSwitcher from '@/components/auth/register/auth-switcher';
import Image from 'next/image';

export default function RegisterPageWrapper() {
  return (
    <main className='flex w-screen items-center justify-center md:h-screen'>
      <GridBackground />
      <AuthCard>
        <AuthSwitcher />
        {/* Right: Image */}
        <div className='hidden h-full w-[55%] items-center justify-center bg-[#0d0d0d] md:flex md:w-1/2'>
          <Image
            src='/images/editor-mockup.png'
            alt='Login Image'
            priority
            width={350}
            height={500}
            className='h-full w-full overflow-hidden rounded-l-2xl object-cover py-10 pl-10'
          />
        </div>
      </AuthCard>
    </main>
  );
}

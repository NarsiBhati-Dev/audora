import { FaApple } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';

const providers = [
  { label: 'Continue with Google', icon: <FcGoogle className='text-2xl' /> },
  { label: 'Continue with Apple', icon: <FaApple className='text-2xl' /> },
  { label: 'Continue with Email', icon: <MdEmail className='text-2xl' /> },
];

export default function AuthButtons() {
  return (
    <div className='flex w-full flex-col items-center gap-4'>
      {providers.map(({ label, icon }, i) => (
        <button
          key={i}
          onClick={() => {}}
          className={`flex w-full max-w-[300px] items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-[#18181b] via-[#232329] to-[#18181b] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-150 hover:scale-[1.03] hover:bg-[#232329]/90 hover:shadow-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none active:scale-100`}
        >
          <span className='flex-shrink-0 text-2xl'>{icon}</span>
          <span className='flex-1 text-left'>{label}</span>
        </button>
      ))}
    </div>
  );
}

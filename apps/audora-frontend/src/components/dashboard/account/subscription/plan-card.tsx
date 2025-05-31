import { ZapIcon } from '@/data/icons';

const PlanCard = () => (
  <div className='flex flex-col gap-2 rounded-2xl bg-[#18181b] p-6'>
    <h2 className='text-xl font-bold text-white'>{`You're on the Free plan`}</h2>
    <p className='text-sm text-zinc-400'>Unlock even more features.</p>
    <button className='flex w-fit items-center gap-2 rounded-lg bg-lime-600 px-6 py-2 font-semibold text-black transition hover:bg-lime-600 md:bg-lime-300 md:text-base md:hover:bg-lime-200'>
      <span className='text-lg'>
        <ZapIcon className='h-6 w-6' />
      </span>{' '}
      Upgrade plan
    </button>
  </div>
);

export default PlanCard;

import { SupportIcon, SupportIcon2, SupportIcon3 } from '@/data/icons';
import Image from 'next/image';

const SupportTeamCard = () => (
  <div className='flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#18181b] p-6 lg:flex-row lg:items-center'>
    <div>
      <h2 className='mb-4 text-xl font-bold text-white'>
        Meet our mind-blowing support team
      </h2>
      <ul className='space-y-3 text-center text-xs text-zinc-400 md:text-sm lg:text-left'>
        <li className='flex items-center gap-2'>
          <span className='text-2xl'>
            <SupportIcon className='h-6 w-6' />
          </span>
          Ridiculously highly trained team
        </li>
        <li className='flex items-center gap-2'>
          <span className='text-2xl'>
            <SupportIcon2 className='h-6 w-6' />
          </span>
          Near-magical diagnostics tools
        </li>
        <li className='flex items-center gap-2'>
          <span className='text-2xl'>
            <SupportIcon3 className='h-6 w-6' />
          </span>
          Available in (yes) every time zone
        </li>
      </ul>
      <button className='mt-6 rounded-lg bg-[#a78bfa] px-6 py-2 font-semibold text-white transition hover:bg-[#7c3aed]'>
        Contact support
      </button>
    </div>
    <div className='flex flex-col items-end gap-2'>
      <div className='mb-2 flex -space-x-3'>
        <span className='h-10 w-10 rounded-full border-2 border-zinc-900 bg-zinc-600'>
          <Image
            width={100}
            height={100}
            src='/images/team/narsi-bhati.png'
            alt='Image 1'
            className='h-10 w-10 rounded-full border-2 border-zinc-900'
          />
        </span>
        <span className='h-10 w-10 rounded-full border-2 border-zinc-900 bg-zinc-500'>
          <Image
            width={100}
            height={100}
            src='/images/stephen.png'
            alt='Image 1'
            className='h-10 w-10 rounded-full border-2 border-zinc-900'
          />
        </span>
        <span className='h-10 w-10 rounded-full border-2 border-zinc-900 bg-zinc-400'>
          <Image
            width={100}
            height={100}
            src='/images/video-poster.png'
            alt='Image 1'
            className='h-10 w-10 rounded-full border-2 border-zinc-900'
          />
        </span>
      </div>
      <div className='max-w-xs rounded-lg bg-zinc-800 p-4 text-sm text-zinc-200'>
        <em>
          “For online support, Audora ranks in the top 1% of all products I’ve
          ever used. The Audora team is now the gold standard by which I’ll
          measure all others.”
        </em>
      </div>
    </div>
  </div>
);

export default SupportTeamCard;

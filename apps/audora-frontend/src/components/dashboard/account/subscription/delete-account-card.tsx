'use client';

import PopupCard from '@/components/ui/popup-card';
import { useState } from 'react';

const DeleteAccountCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col gap-2 rounded-2xl bg-[#18181b] p-6'>
      <h2 className='text-xl font-bold text-white'>Delete account</h2>
      <p className='text-sm text-zinc-400'>
        {`Your account will be deactivated and you'll lose access to all your
        content.`}{' '}
        <a href='#' className='text-violet-300 underline'>
          Learn more
        </a>
      </p>

      <PopupCard
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Delete account'
        triggerClassName='w-fit rounded-lg bg-red-500 px-6 py-2 font-semibold text-white transition hover:bg-red-600'
      >
        <div>
          <h2>Delete account</h2>
          <p>Are you sure you want to delete your account?</p>
        </div>
      </PopupCard>
    </div>
  );
};

export default DeleteAccountCard;

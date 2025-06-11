'use client';

import PopupWrapper from '@/components/ui/popup-wrapper';
import { useState } from 'react';

const DeleteAccountCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col gap-2 rounded-2xl bg-[#18181b] p-6'>
      <h2 className='text-xl font-bold text-white'>Delete account</h2>
      <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-2'>
        <p className='text-sm text-zinc-400'>
          {`Your account will be deactivated and you'll lose access to all your
        content.`}{' '}
          <a href='#' className='text-violet-300 underline'>
            Learn more
          </a>
        </p>

        <button
          className='rounded-md w-full md:w-auto bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400'
          onClick={() => setIsOpen(true)}
        >
          Delete account
        </button>
      </div>

      <PopupWrapper open={isOpen} onClose={() => setIsOpen(false)}>
        <div className='space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-xl font-semibold text-white'>Delete Account</h2>
            <p className='text-sm text-zinc-400'>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
          </div>

          <div className='flex justify-end gap-4'>
            <button
              onClick={() => setIsOpen(false)}
              className='rounded-md border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-700 hover:text-white'
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className='rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700'
            >
              Delete
            </button>
          </div>
        </div>
      </PopupWrapper>
    </div>
  );
};

export default DeleteAccountCard;

'use client';

import { deleteStudio } from '@/actions/studio';
import PopupWrapper from '@/components/ui/popup-wrapper';
import React, { useState } from 'react';

const RemoveStudio = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteStudio = async () => {
    try {
      await deleteStudio();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to delete studio:', error);
    }
  };

  return (
    <PopupWrapper open={isOpen} onClose={() => setIsOpen(false)}>
      <div className='flex flex-col gap-4'>
        <p className='text-sm text-zinc-400'>
          Are you sure you want to remove your studio? This action cannot be
          undone.
        </p>
        <div className='flex gap-2'>
          <button
            className='rounded-md border border-zinc-800 bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className='rounded-md border border-zinc-800 bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700'
            onClick={handleDeleteStudio}
          >
            Remove
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};

export default RemoveStudio;

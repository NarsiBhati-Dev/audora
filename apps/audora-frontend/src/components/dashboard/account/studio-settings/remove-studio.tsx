'use client';

import PopupCard from '@/components/ui/popup-card';
import React, { useState } from 'react';

const RemoveStudio = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteStudio = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to delete studio:', error);
    }
  };

  return (
    <PopupCard
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      //   triggerClassName=''
      title='Remove Studio'
      onConfirm={handleDeleteStudio}
    >
      <p className='text-sm text-zinc-400'>
        Are you sure you want to remove your studio? This action cannot be
        undone.
      </p>
    </PopupCard>
  );
};

export default RemoveStudio;

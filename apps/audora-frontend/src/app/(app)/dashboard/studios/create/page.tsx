'use client';

import CreateStudioPopup from '@/components/dashboard/account/create-studio-popup';
import PopupWrapper from '@/components/ui/popup-wrapper';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const CreateStudioPage = () => {
  const [isCreateStudioOpen, setIsCreateStudioOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-160px)] w-full flex-col items-center justify-center bg-background px-6 text-center">
      {/* Image */}
      <div className="relative  h-60 w-60">
        <Image
          src="/images/studio/create-studio.png"
          alt="Studio preview"
          priority
          width={300}
          height={300}
          className="rounded-xl object-cover shadow-lg h-auto w-auto"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-white md:text-4xl">
        Create new studio
      </h1>

      {/* Subtext */}
      <p className="mt-2 text-center text-zinc-400 text-sm">
        Create your first studio to start recording.
      </p>

      {/* Button */}
      <button onClick={() => setIsCreateStudioOpen(true)} className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-primary-400 px-4 py-2.5 w-36 text-base font-medium text-white hover:bg-primary-500 transition">
        <Plus size={26} />
        Create
      </button>
      {/* Popup */}
      {isCreateStudioOpen && (
        <PopupWrapper open={isCreateStudioOpen} onClose={() => setIsCreateStudioOpen(false)}>
          <CreateStudioPopup onClose={() => setIsCreateStudioOpen(false)} />
        </PopupWrapper>
      )}
    </div>
  );
};

export default CreateStudioPage;
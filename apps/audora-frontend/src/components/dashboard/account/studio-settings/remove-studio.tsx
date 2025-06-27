'use client';

import { deleteStudio } from '@/actions/studio';
import PopupWrapper from '@/components/shared/ui/popup-wrapper';
import { useStudioSettingsStore } from '@/modules/studio/store/studio-settings-store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const RemoveStudio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setAllSettings } = useStudioSettingsStore();
  const router = useRouter();

  const handleDeleteStudio = async () => {
    try {
      const response = await deleteStudio();
      if (response.success) {
        // First clear all studio related state
        setAllSettings({
          studioSetting: {
            studioSlug: '',
            studioName: '',
            enableLobby: false,
            language: 'English',
            enableCaptions: false,
          },
          studioRecordingSetting: {
            recordingType: 'AUDIO',
            audioSampleRate: 'KHZ_44_1',
            videoQuality: 'STANDARD',
            noiseReduction: false,
            countdownBeforeRecording: false,
            autoStartOnGuestJoin: false,
            pauseUploads: false,
          },
        });

        // Then show success message and navigate
        toast.success('Studio deleted successfully');
        router.push('/dashboard/studios/create');
      } else {
        toast.error('Failed to delete studio');
      }
    } catch (error) {
      console.error('Failed to delete studio:', error);
      toast.error('Failed to delete studio');
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <button
        className='rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-400 lg:px-6'
        onClick={() => setIsOpen(true)}
        disabled={isOpen}
      >
        Remove Studio
      </button>
      {isOpen && (
        <PopupWrapper open={isOpen} onClose={() => setIsOpen(false)}>
          <div className='flex flex-col gap-4'>
            <h2 className='text-xl font-bold text-white'>Remove Studio</h2>
            <p className='text-sm text-white'>
              Are you sure you want to remove your studio? This action cannot be
              undone.
            </p>
            <div className='flex justify-end gap-2'>
              <button
                className='rounded-md border border-zinc-800 bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className='rounded-md border border-red-500 bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600'
                onClick={handleDeleteStudio}
              >
                Remove
              </button>
            </div>
          </div>
        </PopupWrapper>
      )}
    </div>
  );
};

export default RemoveStudio;

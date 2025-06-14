'use client';

import { useState } from 'react';
import { SITE_URL } from '@/config';
import { useStudioSettingsStore } from '@/store/studio-setting-store';
import { FiCopy, FiCheck, FiShare2 } from 'react-icons/fi';

const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  const { studioSetting } = useStudioSettingsStore();

  const meetingLink = `${SITE_URL}/studio/${studioSetting.studioSlug}?t=${studioSetting.studioFixedToken}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my studio on Audora',
          text: 'Join my studio session on Audora',
          url: meetingLink,
        });
      } catch {
        // do nothing
      }
    }
  };

  return (
    <div className='bg-dashboard-bg-darkest w-full rounded-2xl border border-gray-800 p-6 text-white shadow-2xl backdrop-blur-sm'>
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='from-primary-400 to-primary-600 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent'>
          Invite People
        </h2>
      </div>

      <p className='mb-6 text-sm text-gray-400'>
        Share this link to invite people to your studio.
      </p>

      {/* Invite Link Section */}
      <div className='space-y-4'>
        {/* Input with role badge */}
        <div className='relative'>
          <input
            type='text'
            readOnly
            value={meetingLink}
            className='focus:ring-primary-500 w-full truncate rounded-lg border border-[#2d2d34] bg-[#1e1e24] px-4 py-3.5 text-sm text-white focus:ring-2 focus:outline-none'
          />
          <div className='bg-primary-500/20 text-primary-400 absolute top-1/2 right-3 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-semibold'>
            Guest
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex space-x-3'>
          <button
            onClick={copyToClipboard}
            className='bg-primary-500 hover:bg-primary-400 focus:ring-primary-600 flex flex-1 items-center justify-center space-x-2 rounded-lg px-4 py-3.5 text-base font-semibold text-white transition focus:ring-2 focus:outline-none'
          >
            {copied ? (
              <>
                <FiCheck className='h-5 w-5' />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className='h-5 w-5' />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {typeof navigator.share !== 'undefined' && (
            <button
              onClick={shareLink}
              className='flex items-center justify-center rounded-lg bg-gray-700 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none'
            >
              <FiShare2 className='h-5 w-5' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteModal;

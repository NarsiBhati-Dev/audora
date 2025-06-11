'use client';

import { useState } from 'react';
// import { FiCopy, FiShare2 } from 'react-icons/fi';
// import { X } from 'lucide-react';

const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  // const [role, setRole] = useState('Guest');
  const meetingLink = 'https://audora.xyz/studio/sss-lJ0...';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className='bg-dashboard-bg-darkest flex h-full w-full items-center justify-center border-2 border-transparent'>
      <div className='bg-dashboard-bg-darkest w-full rounded-2xl text-white shadow-xl'>
        {/* Title */}
        <h2 className='mb-1 text-center text-3xl font-semibold'>
          Invite People
        </h2>
        <p className='mb-6 text-center text-sm text-gray-400'>
          Share this link to invite people to your studio.
        </p>

        <div className='relative mb-4 flex flex-col items-center justify-center space-y-3'>
          {/* Input + Role */}
          <div className='relative w-2/3'>
            <input
              type='text'
              readOnly
              value={meetingLink}
              className='w-full truncate rounded-lg border border-[#2d2d34] bg-[#1e1e24] px-2 py-3 text-sm'
            />
            <div className='bg-dashboard-bg absolute top-1/2 right-2 -translate-y-1/2 rounded-lg px-3 py-2 text-sm'>
              Guest
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className='bg-primary-500 hover:bg-primary-400 w-2/3 rounded-lg px-4 py-3 text-base font-semibold transition'
          >
            {copied ? 'Copied to clipboard!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;

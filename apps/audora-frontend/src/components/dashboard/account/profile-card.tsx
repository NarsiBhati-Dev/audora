'use client';

import React, { useRef, useState } from 'react';
import { FiEdit2, FiLock } from 'react-icons/fi';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

function DefaultAvatar() {
  return (
    <div className='flex items-center justify-center rounded-full bg-[#8b5cf6] p-10'>
      <svg
        width='20'
        height='20'
        viewBox='0 0 14 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='scale-[2] drop-shadow-sm'
        role='img'
        aria-label='Default avatar'
      >
        <g>
          <path
            d='M0.777832 6.65076C0.777832 7.86318 1.43339 9.02594 2.60028 9.88325C3.76717 10.7406 5.34982 11.2222 7.00005 11.2222C8.65029 11.2222 10.2329 10.7406 11.3998 9.88325C12.5667 9.02594 13.2223 7.86318 13.2223 6.65076'
            fill='black'
          />
          <path
            d='M2.6445 1.77459C2.6445 1.10133 2.22663 0.555542 1.71117 0.555542C1.1957 0.555542 0.777832 1.10133 0.777832 1.77459C0.777832 2.44785 1.1957 2.99364 1.71117 2.99364C2.22663 2.99364 2.6445 2.44785 2.6445 1.77459Z'
            fill='black'
          />
          <path
            d='M12.6001 1.77459C12.6001 1.10133 12.1822 0.555542 11.6667 0.555542C11.1513 0.555542 10.7334 1.10133 10.7334 1.77459C10.7334 2.44785 11.1513 2.99364 11.6667 2.99364C12.1822 2.99364 12.6001 2.44785 12.6001 1.77459Z'
            fill='black'
          />
        </g>
      </svg>
    </div>
  );
}

export default function ProfileCard({
  name: initialName,
  email,
  avatarUrl,
  onNameChange,
  onAvatarChange,
}: {
  name: string;
  email: string;
  avatarUrl?: string;
  onNameChange?: (name: string) => Promise<void>;
  onAvatarChange?: (file: File) => void;
}) {
  const [name, setName] = useState(initialName);
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAvatarChange?.(e.target.files[0]);
    }
  };

  const handleNameSave = async () => {
    setEditing(false);
    if (name !== initialName) {
      await onNameChange?.(name);
      toast.success('Profile name updated successfully');
    }
  };

  return (
    <div className='bg-[#18181b] p-4 md:rounded-2xl'>
      <h2 className='mb-2 text-xl font-bold text-white'>Profile</h2>
      <div className='flex flex-col items-start'>
        <div className='relative mb-2 h-28 w-28'>
          <div className='flex h-28 w-28 items-center justify-center rounded-full p-6'>
            {avatarUrl === 'undefined' ? (
              <Image
                src={avatarUrl}
                alt='Profile avatar'
                width={96}
                height={96}
                className='h-24 w-24 rounded-full object-cover shadow-md'
                unoptimized
              />
            ) : (
              <DefaultAvatar />
            )}
          </div>
          <button
            onClick={handleAvatarClick}
            className='absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#393939] text-white shadow-md focus:outline-none'
            aria-label='Change profile image'
            type='button'
          >
            <FiEdit2 size={18} />
          </button>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleAvatarChange}
          />
        </div>
      </div>
      <div className='mb-2'>
        <label
          htmlFor='profile-name'
          className='mb-2 block text-sm font-medium text-zinc-200'
        >
          Name
        </label>
        <div className='flex gap-2'>
          <input
            id='profile-name'
            name='name'
            className='focus:ring-primary-500 w-full rounded-lg border-none bg-[#393939] px-4 py-3 text-white outline-none placeholder:text-zinc-400 focus:ring disabled:opacity-70'
            value={name}
            autoComplete={name}
            placeholder=' Enter your name'
            onChange={e => setName(e.target.value)}
            disabled={!editing}
          />
          {editing ? (
            <button
              className='bg-primary-500 hover:bg-primary-600 rounded-lg px-3 py-2 text-sm font-semibold text-white'
              onClick={handleNameSave}
              type='button'
            >
              Save
            </button>
          ) : (
            <button
              className='rounded-lg bg-[#393939] px-3 py-2 text-sm font-semibold text-white md:hover:bg-zinc-800'
              onClick={() => setEditing(true)}
              type='button'
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor='profile-email'
          className='mb-2 block text-sm font-medium text-zinc-200'
        >
          Email
        </label>
        <div className='relative'>
          <input
            id='profile-email'
            name='email'
            autoComplete={email}
            placeholder='Enter your email'
            className='w-full rounded-lg bg-[#393939] px-4 py-3 pr-10 text-white opacity-80 placeholder:text-zinc-400'
            value={email}
            disabled
          />
          <FiLock
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500'
            size={18}
          />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import {
  FaYoutube,
  FaLinkedin,
  FaTwitch,
  FaTiktok,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaVideo,
} from 'react-icons/fa6';
import Image from 'next/image';

const leftIcons = [
  { icon: <FaFacebook />, color: 'bg-blue-600' },
  { icon: <FaXTwitter />, color: 'bg-black' },
  { icon: <FaYoutube />, color: 'bg-red-600' },
  { icon: <FaLinkedin />, color: 'bg-blue-700' },
];

const rightIcons = [
  { icon: <FaTwitch />, color: 'bg-purple-600' },
  {
    icon: <FaInstagram />,
    color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
  },
  { icon: <FaTiktok />, color: 'bg-black' },
  { icon: <FaVideo />, color: 'bg-violet-300' },
];

const ICON_SIZE = 64;
const ICON_GAP = 32;
const ICON_COUNT = leftIcons.length;
const IMAGE_HEIGHT = ICON_COUNT * ICON_SIZE + (ICON_COUNT - 1) * ICON_GAP;
const IMAGE_WIDTH = 600;

const GoLiveSection = () => {
  return (
    <section className='flex min-h-screen items-center bg-[#f7f7fa] py-20'>
      <div className='flex w-full flex-col items-center px-4 text-center'>
        <h1 className='mb-4 text-5xl leading-tight font-extrabold text-black sm:text-6xl'>
          Go live.
        </h1>
        <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl'>
          Stream your events and webinars in full HD from your fully branded
          studio. Simulcasting, omnichat, and lots more included.
        </p>
        <div className='mb-12 flex flex-col justify-center gap-4 sm:flex-row'>
          <button className='rounded-lg bg-[#7357FF] px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#5a3fdc] sm:text-lg'>
            Start for Free
          </button>
          <a
            href='/video-editor'
            className='flex items-center justify-center font-medium text-[#7357FF] hover:underline'
          >
            Learn more <span className='ml-1'>→</span>
          </a>
        </div>
        <div className='relative mt-8 flex w-full items-center justify-center'>
          {/* Left icons and lines */}
          <div className='top-1/2 left-0 z-10 hidden h-[350px] -translate-x-10 flex-col justify-between gap-8 md:flex'>
            {leftIcons.map((item, idx) => (
              <div key={idx} className='flex flex-col items-center'>
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#a78bfa] text-3xl text-white shadow-lg ${item.color}`}
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Central image */}
          <div className='relative z-20'>
            <Image
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              src='/images/go-live-section.png'
              alt='Product Screenshot'
              className='w-[700px] max-w-full rounded-xl border-8 border-[#a78bfa] shadow-2xl'
            />
            <div className='absolute top-4 left-1/2 -translate-x-1/2 rounded-lg bg-zinc-800 px-4 py-1 text-xs font-semibold text-white shadow'>
              ON AIR
            </div>
          </div>

          {/* Right icons and lines */}
          <div className='top-1/2 right-0 z-10 hidden h-[350px] translate-x-10 flex-col justify-between gap-8 md:flex'>
            {rightIcons.map((item, idx) => (
              <div key={idx} className='flex flex-col items-center'>
                <div
                  className={`flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-3xl text-white shadow-lg md:h-16 md:w-16 ${item.color}`}
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoLiveSection;

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
  {
    icon: <FaFacebook />,
    color: 'bg-blue-600',
    label: 'Facebook',
    gradient: 'linear-gradient(90deg, #1877f2 60%, transparent 100%)',
  },
  {
    icon: <FaXTwitter />,
    color: 'bg-black',
    label: 'Twitter',
    gradient: 'linear-gradient(90deg, #000000 60%, transparent 100%)',
  },
  {
    icon: <FaYoutube />,
    color: 'bg-red-600',
    label: 'YouTube',
    gradient: 'linear-gradient(90deg, #ff0000 60%, transparent 100%)',
  },
  {
    icon: <FaLinkedin />,
    color: 'bg-blue-700',
    label: 'LinkedIn',
    gradient: 'linear-gradient(90deg, #0a66c2 60%, transparent 100%)',
  },
];

const rightIcons = [
  {
    icon: <FaTwitch />,
    color: 'bg-purple-600',
    label: 'Twitch',
    gradient: 'linear-gradient(270deg, #9147ff 60%, transparent 100%)',
  },
  {
    icon: <FaInstagram />,
    color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
    label: 'Instagram',
    gradient:
      'linear-gradient(270deg, #f9d423 0%, #e65c00 30%, #e1306c 60%, #8a3ab9 80%, transparent 100%)',
  },
  {
    icon: <FaTiktok />,
    color: 'bg-black',
    label: 'TikTok',
    gradient: 'linear-gradient(270deg, #000000 60%, transparent 100%)',
  },
  {
    icon: <FaVideo />,
    color: 'bg-violet-300',
    label: 'Video',
    gradient: 'linear-gradient(270deg, #c4b5fd 60%, transparent 100%)',
  },
];

const GoLiveSection = () => {
  return (
    <section className='relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-[#f7f7fa] to-white px-4 py-20 sm:px-10'>
      <div className='relative flex w-full flex-col items-center px-4 text-center'>
        <h1 className='mb-4 bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-5xl leading-tight font-extrabold text-transparent sm:text-6xl'>
          Go live.
        </h1>
        <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl'>
          Stream your events and webinars in full HD from your fully branded
          studio. Simulcasting, omnichat, and lots more included.
        </p>
        <div className='mb-12 flex flex-col justify-center gap-4 sm:flex-row'>
          <button className='group relative cursor-pointer rounded-lg bg-[#7357FF] px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#5a3fdc] hover:shadow-xl hover:shadow-[#7357FF]/25 sm:text-lg'>
            <span className='relative z-10'>Start for Free</span>
            <div className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#7357FF] to-[#5a3fdc] opacity-0 blur transition-opacity duration-300 group-hover:opacity-100'></div>
          </button>
          <a
            href='/video-editor'
            className='group flex items-center justify-center font-medium text-[#7357FF] transition-all duration-300 hover:text-[#5a3fdc] hover:underline'
          >
            Learn more{' '}
            <span className='ml-1 transition-transform duration-300 group-hover:translate-x-1'>
              →
            </span>
          </a>
        </div>
        <div className='relative mt-8 flex w-full items-center justify-center'>
          {/* Left icons and lines */}
          <div className='top-1/2 left-0 z-10 hidden h-[350px] -translate-x-10 flex-col justify-between gap-8 md:flex'>
            {leftIcons.map((item, idx) => (
              <div key={idx} className='relative flex items-center'>
                {/* Icon with double border */}
                <div
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 ${item.color}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${item.color}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${item.color} text-2xl text-white`}
                    >
                      {item.icon}
                    </div>
                  </div>
                </div>
                {/* Connecting line */}
                <div
                  className='absolute top-1/2 left-16 h-1 w-24 -translate-y-1/2'
                  style={{ background: item.gradient }}
                />
              </div>
            ))}
          </div>

          {/* Central image */}
          <div className='relative z-20'>
            <div className='relative'>
              <Image
                width={700}
                height={700}
                src='/images/go-live-section.png'
                alt='Product Screenshot'
                className='w-[700px] max-w-full rounded-xl border-4 border-[#a78bfa] shadow-2xl transition-all duration-300 hover:shadow-[#a78bfa]/30'
              />
              <div className='absolute top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-zinc-700/50 bg-zinc-800/90 px-4 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-800/95'>
                <span className='relative h-2 w-2'>
                  <span className='absolute inset-0 animate-ping rounded-full bg-red-500/75'></span>
                  <span className='relative block h-2 w-2 rounded-full bg-red-500 ring-3 ring-red-500/30'></span>
                </span>
                <span className='font-medium tracking-wider'>ON AIR</span>
              </div>
            </div>
          </div>

          {/* Right icons and lines */}
          <div className='top-1/2 right-0 z-10 hidden h-[350px] translate-x-10 flex-col justify-between gap-8 md:flex'>
            {rightIcons.map((item, idx) => (
              <div key={idx} className='relative flex items-center'>
                {/* Connecting line */}
                <div
                  className='absolute top-1/2 right-16 h-1 w-24 -translate-y-1/2'
                  style={{ background: item.gradient }}
                />
                {/* Icon with double border */}
                <div
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 ${item.color}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${item.color}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${item.color} text-2xl text-white`}
                    >
                      {item.icon}
                    </div>
                  </div>
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

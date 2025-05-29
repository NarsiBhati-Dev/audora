import React, { useState } from 'react';
import { ToggleSwitch } from '@/components/dashboard/account/toggle-switch';

import {
  LinkedInIcon,
  XIcon,
  YoutubeIcon,
  FacebookIcon,
  TwitchIcon,
  TikTokIcon,
  RTMPIcon,
} from '@/data/icons';
import Link from 'next/link';
const socialPlatforms = [
  {
    name: 'YouTube',
    color: 'bg-zinc-800',
    icon: <YoutubeIcon className='h-4 w-4' />,
  },
  {
    name: 'Facebook',
    color: 'bg-blue-600',
    icon: <FacebookIcon className='h-4 w-4' />,
  },
  {
    name: 'LinkedIn',
    color: 'bg-sky-700',
    icon: <LinkedInIcon className='h-4 w-4' />,
  },
  {
    name: 'X (Twitter)',
    color: 'bg-zinc-800',
    icon: <XIcon className='h-4 w-4' />,
  },
  {
    name: 'Twitch',
    color: 'bg-purple-700',
    icon: <TwitchIcon className='h-4 w-4' />,
  },
  {
    name: 'TikTok',
    color: 'bg-zinc-800',
    icon: <TikTokIcon className='h-4 w-4' />,
  },
  {
    name: 'Custom RTMP',
    color: 'bg-zinc-800',
    icon: <RTMPIcon className='h-4 w-4' />,
  },
];

const LiveStreamTab = () => {
  const [hideWatermark, setHideWatermark] = useState(false);
  const [liveStreamChat, setLiveStreamChat] = useState(true);
  const [audienceCount, setAudienceCount] = useState(true);

  return (
    <div className='flex max-w-2xl flex-col gap-6'>
      {/* Description */}
      <div className='text-xs text-zinc-400'>
        Manage your live stream and audience settings.{' '}
        <Link href='/blogs' className='text-primary-300 underline'>
          Learn more
        </Link>
      </div>
      {/* Destinations */}
      <section>
        <h3 className='mb-4 text-xl font-bold'>Livestream</h3>
        <div className='mb-3 font-bold'>Destinations</div>
        <div className='mb-4 flex flex-wrap gap-3'>
          {socialPlatforms.map(platform => (
            <button
              key={platform.name}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-medium text-white ${platform.color}`}
            >
              {platform.icon}
              {platform.name}
            </button>
          ))}
        </div>
      </section>

      {/* Stream settings */}
      <section className='flex flex-col gap-4 rounded-xl bg-zinc-900 p-6 shadow'>
        {/* Streaming resolution */}
        <div>
          <div className='mb-2 flex items-center gap-2 text-xl font-bold text-white'>
            {' '}
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                className='injected-svg'
                data-src='https://app.riverside.fm/6.72.10/static/media/settings-04.d6ca069f80fc67cd41fb.svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              >
                <path
                  d='M2.5 6.66669L12.5 6.66669M12.5 6.66669C12.5 8.0474 13.6193 9.16669 15 9.16669C16.3807 9.16669 17.5 8.0474 17.5 6.66669C17.5 5.28598 16.3807 4.16669 15 4.16669C13.6193 4.16669 12.5 5.28598 12.5 6.66669ZM7.5 13.3334L17.5 13.3334M7.5 13.3334C7.5 14.7141 6.38071 15.8334 5 15.8334C3.61929 15.8334 2.5 14.7141 2.5 13.3334C2.5 11.9526 3.61929 10.8334 5 10.8334C6.38071 10.8334 7.5 11.9526 7.5 13.3334Z'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </span>{' '}
            Stream settings
          </div>
          <div className='mb-2 font-bold text-white'>Streaming resolution</div>
          <div className='mb-4 text-sm text-zinc-400 md:max-w-sm'>
            Choose the live streaming quality. This applies to the stream only,
            your recording resolution can be configured separately.
          </div>
          <div className='flex gap-2'>
            <button className='rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-1 text-sm font-medium text-white'>
              720p
            </button>
            <button className='flex items-center gap-1 rounded-lg border border-green-700 bg-green-700 px-4 py-1 text-sm font-semibold text-white'>
              1080p <span className='text-xs'>⚡</span>
            </button>
          </div>
        </div>
        {/* Hide watermark */}
        <div className='flex flex-col justify-between gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-1 font-bold'>
              Hide watermark <span className='text-sm'>⚡</span>
            </div>
            <ToggleSwitch
              checked={hideWatermark}
              onChange={() => setHideWatermark(!hideWatermark)}
              id='hide-watermark'
            />
          </div>
          <div className='text-sm text-zinc-400 md:max-w-sm'>
            Remove the Riverside watermark when streaming to other destinations.
          </div>
        </div>
        {/* Live stream chat */}
        <div className='flex flex-col justify-between gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <div className='mb-2 font-bold'>Live stream chat</div>
            <ToggleSwitch
              checked={liveStreamChat}
              onChange={() => setLiveStreamChat(!liveStreamChat)}
              id='live-stream-chat'
            />
          </div>
          <div className='mb-2 flex-1 text-sm text-zinc-400 md:max-w-sm'>
            Enable live stream chat to integrate comments from all destinations
            in one place, and select comments to show on the stream.{' '}
            <a href='#' className='text-primary-300 underline'>
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* Audience info */}
      <section className='flex flex-col gap-2 rounded-xl bg-zinc-900 p-6 shadow'>
        <h4 className='mb-2 flex items-center gap-2 text-xl font-bold'>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              className='injected-svg'
              data-src='https://app.riverside.fm/6.72.10/static/media/users-03.02d5891b575cff2148d5.svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <path
                d='M15.0004 13.1974C16.2136 13.8069 17.2538 14.785 18.0131 16.008C18.1634 16.2502 18.2386 16.3713 18.2646 16.539C18.3174 16.8798 18.0844 17.2988 17.767 17.4336C17.6108 17.5 17.4351 17.5 17.0837 17.5M13.3337 9.6102C14.5685 8.99657 15.417 7.72238 15.417 6.25C15.417 4.77762 14.5685 3.50343 13.3337 2.8898M11.667 6.25C11.667 8.32107 9.98809 10 7.91702 10C5.84595 10 4.16702 8.32107 4.16702 6.25C4.16702 4.17893 5.84595 2.5 7.91702 2.5C9.98809 2.5 11.667 4.17893 11.667 6.25ZM2.13304 15.782C3.46163 13.7871 5.55816 12.5 7.91702 12.5C10.2759 12.5 12.3724 13.7871 13.701 15.782C13.9921 16.219 14.1376 16.4375 14.1208 16.7166C14.1078 16.9339 13.9653 17.2 13.7917 17.3313C13.5686 17.5 13.2619 17.5 12.6484 17.5H3.18565C2.57216 17.5 2.26542 17.5 2.04238 17.3313C1.86873 17.2 1.72626 16.9339 1.71321 16.7166C1.69646 16.4375 1.84199 16.219 2.13304 15.782Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
          </span>{' '}
          Audience info
        </h4>

        <div className='flex flex-col justify-between gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <div className='font-bold text-white'>Audience count</div>
            <ToggleSwitch
              checked={audienceCount}
              onChange={() => setAudienceCount(!audienceCount)}
              id='audience-count'
            />
          </div>
          <div className='text-sm text-zinc-400 md:max-w-sm'>
            {`Let guests and audience members see how many people are in the
            audience. You'll still be able to see the audience size even with
            this off.`}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveStreamTab;

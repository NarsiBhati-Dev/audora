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
  StreamingResolutionIcon,
  AudienceInfoIcon,
  ZapIcon,
} from '@/data/icons';
import Link from 'next/link';
import QualitySelector from './quality-selector';
import { Studio } from '@audora/types';

const qualityOptions = [
  { label: '720p', value: '720p' },
  { label: '1080p', value: '1080p', isBoosted: true },
];

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

const LiveStreamTab = ({ studio }: { studio: Studio }) => {
  const [hideWatermark, setHideWatermark] = useState(false);

  return (
    <div className='flex w-full flex-col gap-4 md:gap-6'>
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
              <StreamingResolutionIcon className='h-6 w-6' />
            </span>{' '}
            Stream settings
          </div>
          <div className='mb-2 font-bold text-white'>Streaming resolution</div>
          <div className='mb-4 text-xs text-zinc-400 md:max-w-sm'>
            Choose the live streaming quality. This applies to the stream only,
            your recording resolution can be configured separately.
          </div>

          <QualitySelector
            options={qualityOptions}
            selected={studio.videoQuality}
            onSelect={() => {}}
          />
        </div>
        {/* Hide watermark */}
        <div className='flex flex-col justify-between gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-1 font-bold'>
              Hide watermark{' '}
              <span className='rounded-md bg-zinc-800 p-1'>
                <ZapIcon className='h-4 w-4 text-yellow-500' />
              </span>
            </div>
            <ToggleSwitch
              checked={hideWatermark}
              onChange={() => setHideWatermark(!hideWatermark)}
              id='hide-watermark'
            />
          </div>
          <div className='text-xs text-zinc-400 md:max-w-sm'>
            Remove the Riverside watermark when streaming to other destinations.
          </div>
        </div>
        {/* Live stream chat */}
        <div className='flex flex-col justify-between gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <div className='mb-2 font-bold'>Live stream chat</div>
            <ToggleSwitch
              checked={studio.enableCaptions}
              onChange={() => {}}
              id='live-stream-chat'
            />
          </div>
          <div className='mb-2 flex-1 text-xs text-zinc-400 md:max-w-sm'>
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
        <h4 className='mb-4 flex items-center gap-2 text-xl font-bold'>
          <span>
            <AudienceInfoIcon className='h-6 w-6' />
          </span>{' '}
          Audience info
        </h4>

        <div className='flex flex-col justify-between gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <div className='font-bold text-white'>Audience count</div>
            <ToggleSwitch
              checked={studio.enableCaptions}
              onChange={() => {}}
              id='audience-count'
            />
          </div>
          <div className='text-xs text-zinc-400 md:max-w-sm'>
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

import React from 'react';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: 'Plan your webinar',
    description:
      'Schedule and start sharing invites with other speakers and your audience.',
  },
  {
    number: '02',
    title: 'Go live',
    description:
      'Recording is automatic, but you can choose if and where to stream at the same time.',
  },
  {
    number: '03',
    title: 'Edit & Repurpose',
    description:
      'Rework your recording into multiple assets, long or short-form, in any layout, with any design.',
  },
];

const HowItWorks = () => (
  <section className='py-10 md:py-20'>
    <div className='mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 md:flex-row'>
      {/* Left: Steps */}
      <div className='w-full flex-1'>
        <h2 className='mb-10 text-4xl font-extrabold text-white'>
          How it works.
        </h2>
        <ol className='space-y-2'>
          {steps.map((step, idx) => (
            <li key={step.number} className='flex flex-col'>
              <div className='flex items-start gap-4'>
                <span className='min-w-[2.5rem] text-3xl font-extrabold text-white'>
                  {step.number}
                </span>
                <div>
                  <span className='text-lg font-bold text-white'>
                    {step.title}
                  </span>
                  <span className='font-normal text-white/80'>
                    {' '}
                    – {step.description}
                  </span>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <hr className='my-8 border-[#33334d]' />
              )}
            </li>
          ))}
        </ol>
      </div>
      {/* Right: Image with play button and label */}
      <div className='flex w-full flex-1 justify-center'>
        <div className='relative w-full max-w-xl'>
          <Image
            src='/images/webinar-works.png'
            alt='How it works thumbnail'
            width={600}
            height={350}
            className='w-full rounded-2xl object-cover shadow-2xl'
          />
          {/* Play button overlay */}
          <button
            className='group absolute bottom-1/2 left-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg'
            aria-label='Play video'
          >
            <svg width='44' height='44' fill='none' viewBox='0 0 32 32'>
              <circle
                cx='16'
                cy='16'
                r='16'
                fill='#fff'
                className='opacity-80 transition group-hover:opacity-100'
              />
              <polygon points='13,11 23,16 13,21' fill='#7357FF' />
            </svg>
          </button>
          {/* <span className="absolute left-8 bottom-0 translate-y-full mt-4 text-white text-2xl font-bold drop-shadow-lg">
            Webinars
          </span> */}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;

import React from 'react';
import { Mic, Settings, Play, Share2 } from 'lucide-react';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step = ({ number, icon, title, description }: StepProps) => (
  <div className='relative'>
    <div className='flex items-start gap-6'>
      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white'>
        {icon}
      </div>
      <div>
        <div className='mb-2 flex items-center gap-2'>
          <span className='text-sm font-medium text-white/50'>
            Step {number}
          </span>
          <div className='h-px w-8 bg-white/20' />
        </div>
        <h3 className='mb-2 text-xl font-semibold text-white'>{title}</h3>
        <p className='text-white/70'>{description}</p>
      </div>
    </div>
    {number < 4 && (
      <div className='absolute top-12 left-6 h-full w-px bg-white/10' />
    )}
  </div>
);

const HowItWorksRecording = () => {
  const steps = [
    {
      number: 1,
      icon: <Mic className='h-6 w-6' />,
      title: 'Set Up Your Equipment',
      description:
        'Connect your microphone and configure your audio settings for optimal recording quality.',
    },
    {
      number: 2,
      icon: <Settings className='h-6 w-6' />,
      title: 'Configure Recording Settings',
      description:
        'Choose your preferred format, quality, and any additional effects you want to apply.',
    },
    {
      number: 3,
      icon: <Play className='h-6 w-6' />,
      title: 'Start Recording',
      description:
        'Begin recording with a single click. Monitor your audio levels in real-time.',
    },
    {
      number: 4,
      icon: <Share2 className='h-6 w-6' />,
      title: 'Share Your Recording',
      description:
        'Export your recording in your preferred format and share it with your audience.',
    },
  ];

  return (
    <section className='mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-white sm:text-4xl'>
          How It Works
        </h2>
        <p className='mt-4 text-lg text-white/70'>
          Get started with professional recording in just a few simple steps
        </p>
      </div>

      <div className='mt-16 space-y-12'>
        {steps.map(step => (
          <Step
            key={step.number}
            number={step.number}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksRecording;

import React from 'react';
import { Upload, Edit, Wand2, Share2 } from 'lucide-react';

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

const HowItWorksVideoEditor = () => {
  const steps = [
    {
      number: 1,
      icon: <Upload className='h-6 w-6' />,
      title: 'Upload Your Media',
      description:
        'Import your video files, images, and audio tracks into the editor. We support all major formats.',
    },
    {
      number: 2,
      icon: <Edit className='h-6 w-6' />,
      title: 'Edit Your Content',
      description:
        'Use our intuitive tools to trim, cut, and arrange your clips. Add text, transitions, and effects.',
    },
    {
      number: 3,
      icon: <Wand2 className='h-6 w-6' />,
      title: 'Enhance Your Video',
      description:
        'Apply professional effects, color grading, and audio mixing to perfect your video.',
    },
    {
      number: 4,
      icon: <Share2 className='h-6 w-6' />,
      title: 'Export & Share',
      description:
        'Export your finished video in your preferred format and share it with your audience.',
    },
  ];

  return (
    <section className='mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-white sm:text-4xl'>
          How It Works
        </h2>
        <p className='mt-4 text-lg text-white/70'>
          Create professional videos in just a few simple steps
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

export default HowItWorksVideoEditor;

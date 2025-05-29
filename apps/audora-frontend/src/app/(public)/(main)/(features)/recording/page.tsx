import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import FAQ from '@/components/marketing/use-cases/FAQ';
import { recordingFaqs } from '@/data/recording-faq';
import HowItWorksRecording from '@/components/marketing/use-cases/recording/HowItWorks';
import FeatureGrid from '@/components/marketing/use-cases/FeatureGrid';
import { FaClock, FaMicrophone, FaWaveSquare } from 'react-icons/fa';
import { FaCog, FaShareAlt } from 'react-icons/fa';
import HeroSection from '@/components/marketing/use-cases/HeroSection';
import siteMetadata from '@/lib/seo/siteMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Recording',
  description: 'Recording with Audora',
});

const recordingFeatures = [
  {
    icon: <FaMicrophone />,
    title: 'Studio Quality Audio',
    description:
      'Record crystal clear audio with professional-grade microphones and real-time noise reduction',
    color: 'bg-primary-500',
  },
  {
    icon: <FaWaveSquare />,
    title: 'Advanced Audio Processing',
    description:
      'Apply real-time effects, EQ, and compression to achieve the perfect sound',
    color: 'bg-primary-400',
  },
  {
    icon: <FaClock />,
    title: 'Flexible Recording Options',
    description:
      'Record in multiple formats and qualities, with automatic backup and cloud storage',
    color: 'bg-zinc-800',
  },
  {
    icon: <FaShareAlt />,
    title: 'Easy Sharing',
    description:
      'Share your recordings instantly with customizable privacy settings and access controls',
    color: 'bg-primary-500',
  },
  {
    icon: <FaCog />,
    title: 'Customizable Workflow',
    description:
      'Set up your ideal recording environment with customizable settings and presets',
    color: 'bg-primary-400',
  },
];

const RecordingPage = () => {
  return (
    <main className='mt-6 md:mt-0'>
      <HeroSection
        title='Professional Recording Made Simple'
        description='Record high-quality audio and video with studio-grade features. Perfect for podcasts, interviews, and content creation.'
        buttonLabel='Start Recording Now'
        buttonHref={siteMetadata.dashboard}
        imageSrc='/images/recording-hero.png'
        imageAlt='Professional recording setup with multiple microphones, audio interface, and video camera'
      />

      <FeatureGrid
        title='Why Choose Our Recording?'
        features={recordingFeatures}
      />

      <section className='bg-black'>
        <HowItWorksRecording />
        <FAQ faqs={recordingFaqs} />
      </section>
    </main>
  );
};

export default RecordingPage;

import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import FAQ from '@/components/marketing/use-cases/FAQ';
import { videoEditorFaqs } from '@/data/video-editor-faq';
import HowItWorksVideoEditor from '@/components/marketing/use-cases/video-editor/HowItWorks';

import FeatureGrid from '@/components/marketing/use-cases/FeatureGrid';
import { FaLayerGroup, FaMagic, FaShareAlt, FaUsers } from 'react-icons/fa';
import { FaCut, FaVideo } from 'react-icons/fa';
import HeroSection from '@/components/marketing/use-cases/HeroSection';
import siteMetadata from '@/lib/seo/siteMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Video Editor',
  description: 'Professional video editing made simple',
});

const videoEditorFeatures = [
  {
    icon: <FaVideo />,
    title: 'Multi-Format Support',
    description:
      'Import and export videos in various formats with support for high resolutions up to 4K',
    color: 'bg-primary-500',
  },
  {
    icon: <FaCut />,
    title: 'Advanced Editing Tools',
    description:
      'Trim, cut, and arrange clips with precision using our intuitive timeline interface',
    color: 'bg-primary-400',
  },
  {
    icon: <FaLayerGroup />,
    title: 'Multi-Track Editing',
    description:
      'Work with multiple video and audio tracks for complex projects and overlays',
    color: 'bg-zinc-800',
  },
  {
    icon: <FaMagic />,
    title: 'Professional Effects',
    description:
      'Apply transitions, filters, and effects to enhance your videos with just a few clicks',
    color: 'bg-primary-500',
  },
  {
    icon: <FaShareAlt />,
    title: 'Easy Export & Sharing',
    description:
      'Export your videos in various formats and share them directly to social media',
    color: 'bg-primary-400',
  },
  {
    icon: <FaUsers />,
    title: 'Team Collaboration',
    description:
      'Work together with your team in real-time, share feedback, and manage projects',
    color: 'bg-zinc-800',
  },
];

const VideoEditorPage = () => {
  return (
    <main className='mt-6 md:mt-0'>
      <HeroSection
        title='Professional Video Editing Made Simple'
        description='Edit your videos with professional-grade tools. Perfect for creating content for social media, YouTube, and more.'
        buttonLabel='Start Editing Now'
        buttonHref={siteMetadata.dashboard}
        imageSrc='/images/video-editor-hero.png'
        imageAlt='Professional video editing setup with multiple video clips and effects'
      />

      <FeatureGrid
        title='Why Choose Our Video Editor?'
        features={videoEditorFeatures}
      />

      <section className='bg-black'>
        <HowItWorksVideoEditor />
        <FAQ faqs={videoEditorFaqs} />
      </section>
    </main>
  );
};

export default VideoEditorPage;

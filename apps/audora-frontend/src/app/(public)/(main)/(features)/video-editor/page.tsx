import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import FAQ from '@/components/marketing/use-cases/FAQ';
import { videoEditorFaqs } from '@/data/video-editor-faq';
import HowItWorksVideoEditor from '@/components/marketing/use-cases/video-editor/HowItWorks';

import FeatureGrid from '@/components/marketing/use-cases/FeatureGrid';
import { FaLayerGroup, FaMagic, FaShareAlt, FaUsers } from 'react-icons/fa';
import { FaCut, FaVideo } from 'react-icons/fa';
import HeroSection from '@/components/marketing/use-cases/HeroSection';

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
    color: 'bg-[#7357FF]',
  },
  {
    icon: <FaCut />,
    title: 'Advanced Editing Tools',
    description:
      'Trim, cut, and arrange clips with precision using our intuitive timeline interface',
    color: 'bg-[#a78bfa]',
  },
  {
    icon: <FaLayerGroup />,
    title: 'Multi-Track Editing',
    description:
      'Work with multiple video and audio tracks for complex projects and overlays',
    color: 'bg-[#18181b]',
  },
  {
    icon: <FaMagic />,
    title: 'Professional Effects',
    description:
      'Apply transitions, filters, and effects to enhance your videos with just a few clicks',
    color: 'bg-[#7357FF]',
  },
  {
    icon: <FaShareAlt />,
    title: 'Easy Export & Sharing',
    description:
      'Export your videos in various formats and share them directly to social media',
    color: 'bg-[#a78bfa]',
  },
  {
    icon: <FaUsers />,
    title: 'Team Collaboration',
    description:
      'Work together with your team in real-time, share feedback, and manage projects',
    color: 'bg-[#18181b]',
  },
];

const VideoEditorPage = () => {
  return (
    <main className='mt-6 md:mt-0'>
      <HeroSection
        title='Professional Video Editing Made Simple'
        description='Edit your videos with professional-grade tools. Perfect for creating content for social media, YouTube, and more.'
        buttonLabel='Start Editing Now'
        buttonHref='/dashboard'
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

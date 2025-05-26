import React from 'react';
import Link from 'next/link';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import FeatureGrid from '@/components/marketing/use-cases/FeatureGrid';

import { Mic } from 'lucide-react';
import { Clock, Share2, Users, Video } from 'lucide-react';
import HeroSection from '@/components/marketing/use-cases/HeroSection';
export const metadata = getPageMetadata({
  title: 'Audora Live Streaming',
  description: 'Live Streaming with Audora',
});

const streamingFeatures = [
  {
    icon: <Video />,
    title: 'High Quality Streaming',
    description:
      'Stream in up to 4K resolution with adaptive bitrate for the best viewing experience',
    color: 'bg-[#7357FF]',
  },
  {
    icon: <Users />,
    title: 'Real-time Interaction',
    description:
      'Engage with your audience through live chat, polls, and Q&A sessions',
    color: 'bg-[#a78bfa]',
  },
  {
    icon: <Share2 />,
    title: 'Multi-platform Streaming',
    description:
      'Stream simultaneously to multiple platforms with a single setup',
    color: 'bg-[#18181b]',
  },
  {
    icon: <Mic />,
    title: 'Professional Audio',
    description:
      'Crystal clear audio with noise reduction and echo cancellation',
    color: 'bg-[#7357FF]',
  },
  {
    icon: <Clock />,
    title: 'Recording & Replay',
    description:
      'Automatically record your streams and make them available for replay',
    color: 'bg-[#a78bfa]',
  },
];

const LiveStreamPage = () => {
  return (
    <main className='mt-6'>
      {/* Hero Section */}
      <HeroSection
        title='Professional Live Streaming Made Simple'
        description='Stream your content with studio-quality video and audio. Engage with your audience in real-time and grow your community.'
        buttonLabel='Start Streaming'
        buttonHref='/dashboard'
        imageSrc='/images/live-streaming-hero.png'
        imageAlt='Professional live streaming setup with multiple screens showing stream analytics, chat interface, and video preview'
      />

      {/* Features Section */}
      <section className='bg-white p-12 text-center text-black'>
        <FeatureGrid
          title='Why Choose Our Streaming?'
          features={streamingFeatures}
        />
      </section>

      <section className='bg-white px-4 pb-8'>
        {/* CTA Section */}
        <section className='mx-auto w-full max-w-7xl rounded-3xl bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] p-12 text-center text-white'>
          <h2 className='mb-6 text-3xl font-bold sm:text-4xl'>
            Ready to Start Streaming?
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg text-white/90'>
            Join thousands of content creators who trust Audora for their live
            streaming needs.
          </p>
          <div className='flex justify-center'>
            <Link
              href='/dashboard'
              className='bg-primary hover:bg-primary-darker inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:shadow-xl'
            >
              Start Streaming Now
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
};

export default LiveStreamPage;

import React from 'react';
import FAQ from '@/components/marketing/use-cases/FAQ';
import HowItWorks from '@/components/marketing/use-cases/webinars/HowItWorks';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import { webinarFaqs } from '@/data/webinar-faq';
import FeatureGrid from '@/components/marketing/use-cases/FeatureGrid';
import { FaUsers, FaVideo } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import HeroSection from '@/components/marketing/use-cases/HeroSection';
import siteMetadata from '@/lib/seo/siteMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Webinars',
  description: 'Webinars with Audora',
});

const webinarFeatures = [
  {
    icon: <FaVideo />,
    title: 'HD Video & Audio',
    description:
      'Deliver crystal-clear presentations and discussions with studio-quality streaming.',
    color: 'bg-primary-500',
  },
  {
    icon: <FaUsers />,
    title: 'Unlimited Attendees',
    description:
      'Scale your webinars to thousands without worrying about capacity or lag.',
    color: 'bg-primary-400',
  },
  {
    icon: <FaCalendarCheck />,
    title: 'Easy Scheduling',
    description:
      'Set up, schedule, and manage your webinars with just a few clicks.',
    color: 'bg-zinc-800',
  },
];

const WebinarsPage = () => {
  return (
    <main>
      <HeroSection
        title='Professional Webinars Made Simple'
        description='Host stunning webinars with high-quality video and audio. Engage with your audience in real-time and grow your community.'
        buttonLabel='Start Webinar Now'
        buttonHref={siteMetadata.dashboard}
        imageSrc='/images/webinar-hero.png'
        imageAlt='Professional webinar setup with multiple screens showing webinar analytics, chat interface, and video preview'
      />
      <FeatureGrid
        title='Why Choose Our Webinars?'
        features={webinarFeatures}
      />

      {/* How It Works Section */}
      <section className='bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f]'>
        <HowItWorks />
        {/* FAQ Section */}
        <FAQ faqs={webinarFaqs} />
      </section>
    </main>
  );
};

export default WebinarsPage;

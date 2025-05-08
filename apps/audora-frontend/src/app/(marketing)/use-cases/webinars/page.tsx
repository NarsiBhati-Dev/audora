import React from 'react';

import FAQ from '@/components/marketing/FAQ';
import HowItWorks from '@/components/marketing/HowItWorks';
import HeroSectionWebinar from '@/components/marketing/hero-section-webinar';
import FeaturesSectionWebinar from '@/components/marketing/features-section-webinar';

const WebinarsPage = () => {
  return (
    <main>
      <HeroSectionWebinar />
      <FeaturesSectionWebinar />
      {/* How It Works Section */}
      <section className='bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f]'>
        <HowItWorks />
        {/* FAQ Section */}
        <FAQ />
      </section>
    </main>
  );
};

export default WebinarsPage;

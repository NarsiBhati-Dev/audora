import React from 'react';

import FAQ from '@/components/marketing/use-cases/webinars/FAQ';
import HowItWorks from '@/components/marketing/use-cases/webinars/HowItWorks';
import HeroSectionWebinar from '@/components/marketing/use-cases/webinars/hero-section-webinar';
import FeaturesSectionWebinar from '@/components/marketing/use-cases/webinars/features-section-webinar';

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

import React from 'react';
import HeroSection from './hero-section';
// import TrustedSection from './trusted-section';
import GoLiveSection from './go-live-section';
import RecordSection from './record-section';
import EditSection from './edit-section';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      {/* <TrustedSection /> */}
      <RecordSection />
      <EditSection />
      <GoLiveSection />
    </main>
  );
};

export default HomePage;

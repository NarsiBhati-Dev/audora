'use client';

import GeneralTab from '@/components/dashboard/account/studio-settings/general-tab';
import LiveStreamTab from '@/components/dashboard/account/studio-settings/live-stream';
import RecordingTab from '@/components/dashboard/account/studio-settings/recording-tab';
import React, { useState } from 'react';

const tabs = [
  { name: 'General' },
  { name: 'Recording' },
  { name: 'Live stream' },
];

const StudioSettingPage = () => {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <main className='flex h-full flex-col text-white'>
      {/* Tabs header */}
      <div className='flex-shrink-0 border-b-2 border-zinc-700 py-2'>
        <div className='flex justify-between gap-3 px-2 md:justify-start md:gap-8 md:px-4'>
          {tabs.map(tab => (
            <button
              key={tab.name}
              className={`border-b-2 px-4 pb-2 text-base font-medium transition-colors md:px-8 ${
                activeTab === tab.name
                  ? 'border-primary-300 text-primary-300'
                  : 'border-transparent'
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable tab content */}
      <div
        className='flex-1 overflow-y-auto py-6 md:px-4'
        style={{
          scrollbarWidth: 'none',
        }}
      >
        <div className='mx-auto max-w-6xl'>
          {activeTab === 'General' && <GeneralTab />}
          {activeTab === 'Recording' && <RecordingTab />}
          {activeTab === 'Live stream' && <LiveStreamTab />}
        </div>
      </div>
    </main>
  );
};

export default StudioSettingPage;

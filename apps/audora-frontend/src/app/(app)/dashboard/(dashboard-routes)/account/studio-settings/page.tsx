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

const StudioSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <main className='flex h-[calc(85vh-4rem)] flex-col text-white'>
      {/* Tabs header */}
      <div className='border-dashboard-bg-light mb-0 flex items-center justify-around gap-3 border-b px-3 py-2 md:justify-start md:gap-8 md:px-4'>
        {tabs.map(tab => (
          <button
            key={tab.name}
            className={`px-1 pb-2 text-sm font-medium transition-colors ${
              activeTab === tab.name &&
              'border-primary-300 text-primary-300 border-b-2'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Scrollable tab content ONLY */}
      <div
        className='scrollbar-hide flex-1 overflow-x-hidden overflow-y-auto py-6 md:max-w-2xl md:px-4'
        style={{ scrollbarWidth: 'none' }}
      >
        <div className='mx-auto max-w-4xl'>
          {activeTab === 'General' && <GeneralTab />}
          {activeTab === 'Recording' && <RecordingTab />}
          {activeTab === 'Live stream' && <LiveStreamTab />}
        </div>
      </div>
    </main>
  );
};

export default StudioSettingsPage;

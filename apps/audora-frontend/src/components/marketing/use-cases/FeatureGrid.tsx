// components/FeatureGrid.tsx
import React from 'react';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

interface FeatureGridProps {
  title: string;
  features: Feature[];
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ title, features }) => {
  return (
    <section className='bg-white py-20' id='features'>
      <div className='mx-auto max-w-5xl px-4'>
        <h2 className='mb-12 text-center text-4xl font-bold text-[#18181b]'>
          {title}
        </h2>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
          {features.map((feature, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <div
                className={`mb-4 rounded-full ${feature.color ?? 'bg-gray-800'} p-5 text-4xl text-white shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className='mb-2 text-xl font-semibold'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

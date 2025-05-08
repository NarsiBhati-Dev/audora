import React from 'react';
import { FaVideo, FaUsers, FaCalendarCheck } from 'react-icons/fa';

const FeaturesSectionWebinar = () => {
  return (
    <>
      {/* Features Section */}
      <section id='features' className='bg-white py-20'>
        <div className='mx-auto max-w-5xl px-4'>
          <h2 className='mb-12 text-center text-4xl font-bold text-[#18181b]'>
            Why Choose Our Webinars?
          </h2>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 rounded-full bg-[#7357FF] p-5 text-4xl text-white shadow-lg'>
                <FaVideo />
              </div>
              <h3 className='mb-2 text-xl font-semibold'>HD Video & Audio</h3>
              <p className='text-gray-600'>
                Deliver crystal-clear presentations and discussions with
                studio-quality streaming.
              </p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 rounded-full bg-[#a78bfa] p-5 text-4xl text-white shadow-lg'>
                <FaUsers />
              </div>
              <h3 className='mb-2 text-xl font-semibold'>
                Unlimited Attendees
              </h3>
              <p className='text-gray-600'>
                Scale your webinars to thousands without worrying about capacity
                or lag.
              </p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 rounded-full bg-[#18181b] p-5 text-4xl text-white shadow-lg'>
                <FaCalendarCheck />
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Easy Scheduling</h3>
              <p className='text-gray-600'>
                Set up, schedule, and manage your webinars with just a few
                clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSectionWebinar;

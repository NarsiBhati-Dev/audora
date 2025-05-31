import React from 'react';

const Spinner = () => {
  return (
    <>
      {/* Main Spinner Container */}
      <div className='relative'>
        {/* Glowing Background */}
        <div className='absolute -inset-8 animate-pulse rounded-full bg-gradient-to-r from-[#a78bfa]/20 via-[#8b5cf6]/20 to-[#a78bfa]/20 blur-xl'></div>

        {/* Orbital Rings */}
        <div className='relative'>
          {/* Outer Orbit */}
          <div className='absolute -inset-6 animate-[spin_8s_linear_infinite]'>
            <div className='bg-primary-500 h-3 w-3 rounded-full'></div>
          </div>
          {/* Middle Orbit */}
          <div className='absolute -inset-4 animate-[spin_6s_linear_infinite_reverse]'>
            <div className='bg-primary-500 h-2.5 w-2.5 rounded-full'></div>
          </div>
          {/* Inner Orbit */}
          <div className='absolute -inset-2 animate-[spin_4s_linear_infinite]'>
            <div className='bg-primary-500 h-2 w-2 rounded-full'></div>
          </div>
        </div>

        {/* Central Spinner */}
        <div className='relative h-20 w-20'>
          <div className='border-primary-500 absolute inset-0 animate-[spin_2s_linear_infinite] rounded-full border-4 border-t-transparent'></div>
          <div className='border-primary-500 absolute inset-0 animate-[spin_2s_linear_infinite_reverse] rounded-full border-4 border-b-transparent'></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;

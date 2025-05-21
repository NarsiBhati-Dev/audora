import React from 'react';

const spinner = () => {
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
            <div className='h-3 w-3 rounded-full bg-[#a78bfa]'></div>
          </div>
          {/* Middle Orbit */}
          <div className='absolute -inset-4 animate-[spin_6s_linear_infinite_reverse]'>
            <div className='h-2.5 w-2.5 rounded-full bg-[#8b5cf6]'></div>
          </div>
          {/* Inner Orbit */}
          <div className='absolute -inset-2 animate-[spin_4s_linear_infinite]'>
            <div className='h-2 w-2 rounded-full bg-[#a78bfa]'></div>
          </div>
        </div>

        {/* Central Spinner */}
        <div className='relative h-20 w-20'>
          <div className='absolute inset-0 animate-[spin_2s_linear_infinite] rounded-full border-4 border-[#a78bfa] border-t-transparent'></div>
          <div className='absolute inset-0 animate-[spin_2s_linear_infinite_reverse] rounded-full border-4 border-[#8b5cf6] border-b-transparent'></div>
        </div>
      </div>
    </>
  );
};

export default spinner;

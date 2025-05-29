import React from 'react';

const DotLoader = () => {
  return (
    <>
      {/* Animated Dots */}
      <div className='flex items-center gap-2'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='bg-primary-500 h-2 w-2 rounded-full'
            style={{
              animation: `bounce 1s infinite ${i * 0.2}s`,
              transform: `scale(${1 - i * 0.1})`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default DotLoader;

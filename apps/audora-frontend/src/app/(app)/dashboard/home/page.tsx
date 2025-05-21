import React from 'react';

const HomePage = async () => {
  // Add a 3 second delay to test loading state
  await new Promise(resolve => setTimeout(resolve, 3000));

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold text-white'>HomePage</h1>
    </div>
  );
};

export default HomePage;

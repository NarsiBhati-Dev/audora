import React from 'react';
import ProjectCardSkeleton from './project-card-skeleton';

const ProjectsSkeleton = () => {
  return (
    <div className='mt-24 flex h-full w-full flex-col items-center justify-center p-8'>
      <div className='mb-8 w-full max-w-4xl'>
        <div className='mb-2 h-8 w-40 animate-pulse rounded bg-zinc-700' />
        <div className='h-4 w-64 animate-pulse rounded bg-zinc-800' />
      </div>
      <div className='grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSkeleton;

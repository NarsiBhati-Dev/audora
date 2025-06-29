import React from 'react';

const ProjectCardSkeleton = () => {
  return (
    <div className='w-full max-w-sm animate-pulse space-y-3 rounded-2xl bg-[#18181b] p-3 shadow-sm transition-all duration-300'>
      {/* Thumbnail */}
      <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-700'>
        {/* Duration bottom-right */}
        <div className='absolute right-2 bottom-2 h-4 w-12 rounded bg-zinc-600' />
        {/* Pagination dots */}
        <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1'>
          <div className='h-2 w-2 rounded-full bg-zinc-600' />
          <div className='h-2 w-2 rounded-full bg-zinc-800' />
          <div className='h-2 w-2 rounded-full bg-zinc-800' />
        </div>
      </div>

      {/* Title & meta */}
      <div className='space-y-2 px-1'>
        <div className='h-5 w-3/4 rounded bg-zinc-700' />
        <div className='h-4 w-1/2 rounded bg-zinc-800' />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;

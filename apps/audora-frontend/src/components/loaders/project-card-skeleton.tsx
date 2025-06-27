import React from 'react';

const ProjectCardSkeleton = () => {
    return (
        <div className='w-full max-w-xs rounded-2xl bg-[#18181b] p-2'>
            {/* Image/Video area skeleton */}
            <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-700 animate-pulse'>
                {/* Top right: recordings count */}
                <div className='absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-zinc-800/80 px-2 py-1'>
                    <div className='h-4 w-4 rounded bg-zinc-600' />
                    <div className='h-3 w-4 rounded bg-zinc-600' />
                </div>
                {/* Bottom right: duration */}
                <div className='absolute bottom-2 right-2 h-5 w-12 rounded bg-zinc-600' />
                {/* Dots for carousel */}
                <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1'>
                    <div className='h-2 w-2 rounded-full bg-zinc-600' />
                    <div className='h-2 w-2 rounded-full bg-zinc-800' />
                </div>
            </div>
            {/* Title and subtitle skeletons */}
            <div className='mt-3 space-y-2 px-1'>
                <div className='h-5 w-2/3 rounded bg-zinc-700 animate-pulse' />
                <div className='h-4 w-1/2 rounded bg-zinc-800 animate-pulse' />
            </div>
        </div>
    );
};

export default ProjectCardSkeleton; 